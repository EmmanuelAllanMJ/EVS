import time
import datetime
import cv2 
from flask import Flask, Response, jsonify , request
import os
from flask_cors import CORS, cross_origin

from pyzbar.pyzbar import decode
from pyaadhaar.utils import isSecureQr
from pyaadhaar.decode import AadhaarSecureQr

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#make shots directory to save pics
try:
    os.mkdir('./shots')
except OSError as error:
    pass

global capture,name,type
name='sample'
capture = 0

@app.route('/')
def hello():
    print(request.method)
    return jsonify({'message':'hello hi'})

def gen():
    """Video streaming generator function."""
    global capture,name,type
  
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
                        (x,y,w,h) = faces[0]
                        cv2.imwrite(f"./shots/{name}-{type}.jpg", img1[y:y+h,x:x+w]) 
                        capture = 0
                    except:
                        continue
                elif type=='aadhar' or type=='pan':
                    cv2.imwrite(f"./shots/{name}-{type}.jpg", img1) 
                    capture = 0 
                
            # if type == 'aadhar':
            #     img = cv2.imread('./shots/{name}-aadhar.jpg')
            #     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            #     code = decode(gray)
            #     qrData = code[0].data
            #     print(code)

            #     isSecureQR = (isSecureQr(qrData)) 

            #     if isSecureQR:
            #         secure_qr = AadhaarSecureQr(int(qrData))
            #         decoded_secure_qr_data = secure_qr.decodeddata()
            #         print(decoded_secure_qr_data)
            #         secure_qr.saveimage('aadhar-image.jpg')
            
            
                    
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
    global capture,name,type
    now = datetime.datetime.now()
    request_body =request.get_json()
    if request.method=='POST': 
        capture=1
        email = request_body['email']
        name= email[:email.index('@')]
        type = request_body['click']
        
        return jsonify("Captured",now)
    return jsonify("Error")


     

#server start port
app.run(port=5000)
     