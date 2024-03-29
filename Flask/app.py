import time
import datetime
import cv2 
from flask import Flask, Response, jsonify , request
import os
from flask_cors import CORS, cross_origin
import numpy as np
import requests
import random

from pyzbar.pyzbar import decode
from pyaadhaar.utils import isSecureQr
from pyaadhaar.decode import AadhaarSecureQr

from werkzeug.utils import secure_filename
import base64
from deepface import DeepFace

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
# dp_face=0

@app.route('/')
def hello():
    return jsonify({'message':'hello hi'})

# def to_np(fpath):
#     img=cv2.imread(fpath)
#     img=cv2.resize(img,(224,224))
#     img=np.asarray(img,dtype='float32')
#     return np.expand_dims(img,axis=0).tolist()

    
def save_face(name, type):
    try:
        os.mkdir(f'./shots/{name}/images/')
        os.mkdir(f'./shots/{name}/')
    except:
        pass
    filename = f"./shots/{name}/{name}-feed.jpg"
    print(filename)
    img = cv2.imread(filename)
    cv2.imwrite(f"./shots/{name}/images/{name}-{type}.jpg", img) 


@app.route('/click_photo/<string:emailId>',methods=['POST'])
@cross_origin()
def onClick(emailId):
    # global capture,name,type, response

    request_body =request.get_json()
    print(request_body)
    if request.method=='POST': 
        # capture=1
        email = request_body['email']
        name= email[:email.index('@')]
        type = request_body['click']
        save_face(name,'dp')
        
        # if(response):
        #     return jsonify("Captured ",type)
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
         


def is_valid_aadhaar(aadhaar_number):
    print(len(aadhaar_number))
    if len(aadhaar_number)==21:
        return True
    else:
        return False
   

@app.route('/upload/<string:emailId>/aadhar',methods=['POST'])
def upload(emailId):
    verifyCount =[0,0,0,0,0]
    name= emailId
    print("Reached to server")
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
    file1.save(os.path.join('shots',f"{emailId}","images", secure_filename(f"{emailId}-pan.jpg")))
    print("Saved successfully")
    verifyCount[0]=1
    time.sleep(2)
    try:
        img = cv2.imread(f"./shots/{emailId}/{emailId}-aadhar.jpg")
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        code = decode(gray)
        # print(code)
        qrData = code[0].data
        # print(code)

        isSecureQR = (isSecureQr(qrData))

        if isSecureQR:
            secure_qr = AadhaarSecureQr(int(qrData))
            decoded_secure_qr_data = secure_qr.decodeddata()
            print(decoded_secure_qr_data)
            secure_qr.saveimage(f"./shots/{emailId}/images/{emailId}-aadhar-image.jpg")

            
       
        # # Pan extracting face
        # pan_image= f"./shots/{emailId}/{emailId}-pan.jpg"
        # img = cv2.imread(pan_image)
        # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # img1=img.copy()
    
        # path = "haarcascade_frontalface_default.xml" 

        # face_cascade = cv2.CascadeClassifier(path)
        # faces = face_cascade.detectMultiScale(gray, scaleFactor=1.10, minNeighbors=5, minSize=(40,40))
        
        # try:
        #     (x,y,w,h) = faces[0]
        #     cv2.imwrite(f"./shots/{emailId}/{emailId}-pan-image.jpg", img1[y:y+h,x:x+w]) 
        # #     # capture = 0
        #     pan_image_face=to_np(f"./shots/{emailId}/{emailId}-pan-image.jpg")
        # #     # print(response)
        #     print("Pan face extraction successful")

        # except:
        #     print("Failed to extract pan face")
        #     # pass
        print("Number ",decoded_secure_qr_data['referenceid'])
        print("Verified ",is_valid_aadhaar(decoded_secure_qr_data['referenceid']))
        if(is_valid_aadhaar(decoded_secure_qr_data['referenceid'])):
            verifyCount[1]=1
        
            
        # Calling faceverify
        # FACE_VERIFY = os.getenv('FACE_VERIFY')
        # print(FACE_VERIFY)
        # # print(dp_face)
        # dp_face=to_np(f"./shots/{emailId}/{emailId}-dp.jpg")

        # send={
        #     "truth":dp_face,
        #     "check":aadhar_image
        # }
        # r=requests.post(FACE_VERIFY,json=send)
        
        directory = f'./shots/{name}/images'
        captured_file = f"./shots/{name}/images/{name}-dp.jpg"
        file_count = 0
        verified_count = 0
        for filename in os.listdir(directory):
            file_count+=1
            print(filename)
            print(f"entered loop {file_count}")
            if  filename.endswith('.jpg') or filename.endswith('.png'):
            #     # do something with the image file
                print(f"entered if check {file_count}, verify {verified_count}")
                file_path = os.path.join(directory, filename)
        
                result = DeepFace.verify(img1_path = captured_file, 
                    img2_path = file_path, 
                    model_name = 'VGG-Face'
                )
        
                # print(f"result {result}, verified {result['verified']}")
                if(result['verified']==True):
                    verified_count+=1
                
        if file_count == verified_count:
            verifyCount[2]=1

        # print(f"File count {file_count}, verified count {verified_count}")

        # print("Result from face api, dp vs aadhar", r.json())
        # send={
        #     "truth":dp_face,
        #     "check":pan_image_face
        # }
        # r=requests.post(FACE_VERIFY,json=send)
        # if(r.json()['Match']=='Yes'):
        #     verifyCount[3]=1

        
        # print("Result from face api, dp vs pan", r.json())
        
         # OCR of pan
        # print("OCR started")
        # client = ComputerVisionClient(
        #     endpoint="https://" + COMPUTERVISION_LOCATION + ".cognitiveservices.azure.com",
        #     credentials=CognitiveServicesCredentials(SUBSCRIPTION_KEY_ENV_NAME)
        # )

        # with open(os.path.join(f"./shots/{emailId}/{emailId}-pan.jpg"), "rb") as image_stream:
        #     image_analysis = client.recognize_printed_text_in_stream(
        #         image=image_stream,
        #         language="en"
        #     )

        # lines = image_analysis.regions[0].lines
        # pattern = r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$'
        # full_text=  []
        # print("Recognized:\n")
        # for line in lines:
        #     line_text = " ".join([word.text for word in line.words])
        #     string = line_text
        #     match = re.search(pattern, string)
        #     if match:
        #         print("PAN", line_text)
        #     full_text.append(line_text)
        # print(full_text)
        # print("OCR ended")
        verifyCount[3]=1

         
    except Exception as e:
        print(e)
        return jsonify("Some problem occurred, try again")
    
    if(verifyCount[0]==0):
        return jsonify({'msg':"Upload proper aadhar file","success":False})
    elif(verifyCount[1]==0):
        return jsonify({'msg':"Upload proper aadhar pan image","success":False})
    elif(verifyCount[2]==0):
        return jsonify({'msg':"Aadhar image is not matching","success":False})
    elif(verifyCount[3]==0):
        return jsonify({'msg':"Pan image is not matching","success":False})
    elif(verified_count==file_count):
        
        return jsonify({'msg':"Not verified, Please try again","success":True})
    else:
        return jsonify({'msg':"Not verified, Please try again","success":False})
    # return jsonify("Not verified, upload good")


@app.route("/receive/<string:name>", methods=['POST'])
def form(name):
    if name =="undefined":
        return "Name not found, try again"

    
    # url = requests.get(request.data)
    try:
        url = request.data[22::]
        decodedData = base64.b64decode(url + b'==')

        # Write Image from Base64 File
        
        # print("Entered")
        imgFile = open(f'./shots/{name}/{name}-feed.jpg', 'wb')
        imgFile.write(decodedData)
        imgFile.close()
    except:
        pass
    # print("Saved")
    
    response = jsonify("File received and saved!")


    return response

# @app.route("/response",methods=['GET','POST'])
# def response():
#     global response
#     response = []
#     print("Response started")
#     if request.method == 'POST':
#         response.append(request.get_json())
        
#         print("Response I got inside post",response)
#         return "Exited"
    
#     print("Response I got",response)
#     return jsonify({'message':response})

BACKEND_API=os.getenv('BACKEND_API')

@app.route("/check_liveliness/<string:name>",methods=['POST'])
def check_liveliness(name):
    print("reached successfully", name)
    count =0
    # print("Print Reached here")
    # emotions = ['happy', 'sad', 'surprise', 'angry', 'neutral', 'fear', 'disgust']
    emotions = ['happy', 'neutral', 'surprise' ]
    performed_emotions = set()
    success_msg = "Success! You performed all emotions correctly."
    failure_msg = "Sorry, wrong emotion. Please try again."
    
    random_emotion = random.choice(list(set(emotions) - performed_emotions))
    while len(performed_emotions) < len(emotions):

        while(True):
            if(count<10):
                random_number = random_number = random.randint(1, 10)
            else:
                random_number = random_number = random.randint(1, 100)
                
            img = cv2.imread(f'./shots/{name}/{name}-feed.jpg')
            # if not img:
            #     continue
            # print(type(f"Perform {random_emotion}")) 
            emotion = f"Perform {random_emotion}"
            print(emotion)
            # emotion_json = {"data":emotion}
            # requests.post(f"{BACKEND_API}/response", data = emotion_json)
            try:
                result = DeepFace.analyze(img, actions=['emotion'])
                if(random_number==7):
                    filename = f'./shots/{name}/images/image-{count}.jpg'
                    count+=1 
                    cv2.imwrite(filename,img)
            except:
                print("Face not detected")
                continue
            emotion = result[0]['dominant_emotion']
            if emotion.lower() == random_emotion.lower():
                # Add the emotion to the set of performed emotions
                performed_emotions.add(random_emotion)
                try:
                    random_emotion = random.choice(list(set(emotions) - performed_emotions))
                except:
                    print(success_msg)
                    return "Verified Liveliness"
                break
            else:
                # Display failure message if the emotions don't match
                text = failure_msg
                print(text)
        
    return "Completed successfully"



if __name__ == '__main__':
    #server start port
    app.run(host='0.0.0.0', port=5000)
   
     

     