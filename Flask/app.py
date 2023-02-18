from io import BytesIO
import time
import datetime
import cv2 
from flask import Flask, Response, jsonify , request
import os
from flask_cors import CORS, cross_origin

from pyzbar.pyzbar import decode
from pyaadhaar.utils import isSecureQr
from pyaadhaar.decode import AadhaarSecureQr

from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
from wtforms.validators import InputRequired

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
                        (x,y,w,h) = faces[0]
                        cv2.imwrite(f"./shots/{name}-{type}.jpg", img1[y:y+h,x:x+w]) 
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
    return jsonify("Error")


@app.route('/upload/<string:emailId>/<string:typeId>',methods=['POST'])
def upload(emailId,typeId):
    file = request.files['File']
    print(file)
    # Save the file in the uploads folder
    file.save(os.path.join('shots', secure_filename(f"{emailId}-{typeId}.jpg")))
    return jsonify("Uploaded Successfully")
   
     

#server start port
app.run(port=5000)
     