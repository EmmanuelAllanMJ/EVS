import time
import datetime
import cv2 
from flask import Flask, Response, jsonify , request
import os
from flask_cors import CORS, cross_origin

from pyzbar.pyzbar import decode
from pyaadhaar.utils import isSecureQr
from pyaadhaar.decode import AadhaarSecureQr

from werkzeug.utils import secure_filename

import face_recognition

import os.path
import sys
import re

from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#make shots directory to save pics
try:
    os.mkdir('./shots')
except OSError as error:
    pass

global capture,name,type,response
name='sample'
capture = 0
response = False

@app.route('/')
def hello():
    print(request.method)
    return jsonify({'message':'hello hi'})

def gen():
    """Video streaming generator function."""
    global capture,name,type,response
  
    cap = cv2.VideoCapture(0)

    while(cap.isOpened()):
        
        ret,img = cap.read()
        if ret==True:
            img = cv2.resize(img, (0,0), fx=1, fy=1) 
            gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
            img1=img.copy()
        
            path = "haarcascade_frontalface_default.xml" 

            face_cascade = cv2.CascadeClassifier(path)
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.10, minNeighbors=20, minSize=(40,40))
            
            for(x,y,w,h) in faces:
                cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
             
            path = "haarcascade_eye.xml"

            eye_cascade = cv2.CascadeClassifier(path)

            eyes = eye_cascade.detectMultiScale(gray,scaleFactor=1.02,minNeighbors=20, minSize=(10,10))

            for(x,y,w,h) in eyes:
                xc = (x + x+w)/2
                yc = (y + y+h)/2
                radius = w/2
                cv2.circle(img,(int(xc),int(yc)),5,(255,255,0),2)

            if(capture>0):
                # print("Captured and stored")
                if type=='dp':
                    try:
                        os.mkdir(f'./shots/{name}')
                    except:
                        pass
                    try:
                        (x,y,w,h) = faces[0]
                        cv2.imwrite(f"./shots/{name}/{name}-{type}.jpg", img1[y:y+h,x:x+w]) 
                        capture = 0
                        response='face'

                    except:
                        continue
                elif type=='aadhar' :
                    # cv2.imwrite(f"./shots/{name}-{type}.jpg", img1) 
                
                    # img = cv2.imread('./shots/{name}-aadhar.jpg')
                    gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
                    # blur = cv2.GaussianBlur(gray,(3,3),0) #gaussian blur, blurs image 
                    thresh_adapt = cv2.adaptiveThreshold(gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,115,1)
                    cv2.imwrite(f"./shots/{name}-{type}.jpg", thresh_adapt) 

                    try:
                        code = decode(thresh_adapt)
                        qrData = code[0].data
                        print(code, qrData)

                        isSecureQR = (isSecureQr(qrData)) 
                        # capture=0
                        response = 'aadhar'

                        if isSecureQR:
                            secure_qr = AadhaarSecureQr(int(qrData)) 
                            decoded_secure_qr_data = secure_qr.decodeddata()
                            print(decoded_secure_qr_data)
                            secure_qr.saveimage('aadhar-image.jpg')
                            capture = 0 
                    except:
                        pass

                    
            frame = cv2.imencode('.jpg', img)[1].tobytes()
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        else: 
            break

        
        

@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')



@app.route('/click_photo',methods=['POST'])
@cross_origin()
def onClick():
    global capture,name,type, response

    now = datetime.datetime.now()
    request_body =request.get_json()
    if request.method=='POST': 
        capture=1
        email = request_body['email']
        name= email[:email.index('@')]
        type = request_body['click']
        
        if(response):
            return jsonify("Captured ",type)
        return jsonify("Captured your face")
    return jsonify("Error")

# Microsoft computer vision APIs
SUBSCRIPTION_KEY_ENV_NAME = os.getenv('SUBSCRIPTION_KEY_ENV_NAME')
COMPUTERVISION_LOCATION =os.getenv('COMPUTERVISION_LOCATION')



def recognize_printed_text_in_stream(subscription_key,computervision_location):
    """RecognizedPrintedTextUsingOCR_API.
    This will do an OCR analysis of the given image.
    """
    client = ComputerVisionClient(
        endpoint="https://" + computervision_location + ".api.cognitive.microsoft.com/",
        credentials=CognitiveServicesCredentials(subscription_key)
    )

    with open(os.path.join(IMAGES_FOLDER, "pan.jpg"), "rb") as image_stream:
        image_analysis = client.recognize_printed_text_in_stream(
            image=image_stream,
            language="en"
        )

    lines = image_analysis.regions[0].lines
    pattern = r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$'
    full_text=  []
    print("Recognized:\n")
    for line in lines:
        line_text = " ".join([word.text for word in line.words])
        string = line_text
        match = re.search(pattern, string)
        if match:
            print("PAN", line_text)
        full_text.append(line_text)
    print(full_text)
            


@app.route('/upload/<string:emailId>/aadhar',methods=['POST'])
def upload(emailId):
    import os
    file = request.files['File']
    file1 = request.files['File1']
    print(file)
    print(file1)
    # Save the file in the uploads folder
    try:
        os.mkdir(f'./shots/{emailId}')
    except:
        pass
    file.save(os.path.join('shots',f"{emailId}", secure_filename(f"{emailId}-aadhar.jpg")))
    file1.save(os.path.join('shots',f"{emailId}", secure_filename(f"{emailId}-pan.jpg")))
    print("Saved successfully")
    time.sleep(2)
    try:
        img = cv2.imread(f"./shots/{emailId}/{emailId}-aadhar.jpg")
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        code = decode(img)
        qrData = code[0].data

        isSecureQR = (isSecureQr(qrData)) 

        if isSecureQR:
            secure_qr = AadhaarSecureQr(int(qrData)) 
            decoded_secure_qr_data = secure_qr.decodeddata()
            print(decoded_secure_qr_data)
            secure_qr.saveimage(f"./shots/{emailId}/{emailId}-aadhar-image.jpg")
            print("Aadhar extraction successful")
        # Pan extracting face
        pan_image= f"./shots/{emailId}/{emailId}-pan.jpg"
        img = cv2.imread(pan_image)
        image = face_recognition.load_image_file(pan_image)
        face_location = face_recognition.face_locations(image)
        top,right,bottom,left = face_location[0]
        cv2.imwrite(f"./shots/{emailId}/{emailId}-pan-image.jpg", img[top:bottom,left:right]) 
        # cv2.imwrite(f"./shots/{name}/{name}-pan-image.jpg", img) 
        print("Pan face extraction successful")
        time.sleep(2)
        
        # aadhar and dp comparison
        image_of_aadhar = face_recognition.load_image_file(f"./shots/{emailId}/{emailId}-aadhar-image.jpg")
        image_of_pan = face_recognition.load_image_file(f"./shots/{emailId}/{emailId}-pan-image.jpg")
        

        aadhar_face_encoding = face_recognition.face_encodings(image_of_aadhar)[0]
        pan_face_encoding = face_recognition.face_encodings(image_of_pan)[0]
        
        known_face_encodings = [
            aadhar_face_encoding,
            pan_face_encoding,
        ]
        
        face_image = face_recognition.load_image_file(f"./shots/{emailId}/{emailId}-dp.jpg")
        face_encodings = face_recognition.face_encodings(face_image )
        
        results = face_recognition.compare_faces(known_face_encodings, face_encodings[0], tolerance=0.7)
        print(results)
        
        # OCR of pan
        print("OCR started")
        client = ComputerVisionClient(
            endpoint="https://" + COMPUTERVISION_LOCATION + ".cognitiveservices.azure.com",
            credentials=CognitiveServicesCredentials(SUBSCRIPTION_KEY_ENV_NAME)
        )
        print("OCR started1")

        with open(os.path.join(f"./shots/{emailId}/{emailId}-pan.jpg"), "rb") as image_stream:
            image_analysis = client.recognize_printed_text_in_stream(
                image=image_stream,
                language="en"
            )

        lines = image_analysis.regions[0].lines
        pattern = r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$'
        full_text=  []
        print("Recognized:\n")
        for line in lines:
            line_text = " ".join([word.text for word in line.words])
            string = line_text
            match = re.search(pattern, string)
            if match:
                print("PAN", line_text)
            full_text.append(line_text)
        print(full_text)
        print("OCR ended")
        
        
    except:
        return jsonify("Cannot decode aadhar")

    return jsonify("Uploaded Successfully")


if __name__ == '__main__':
    #server start port
    app.run(port=5000)
   
     

     