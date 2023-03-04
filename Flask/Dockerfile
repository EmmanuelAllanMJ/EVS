FROM python:3.8-slim

WORKDIR /usr/app

COPY ./requirements.txt ./

RUN pip install --upgrade pip

RUN apt-get update && apt-get install -y libglib2.0-0 libgl1-mesa-glx && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install libzbar0 -y 

#Update ubuntu
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y wget
RUN apt-get install -y unzip
RUN apt-get install -y vim
RUN apt-get install -y git
RUN apt-get install -y build-essential cmake
RUN apt-get autoremove -y
RUN apt-get autoclean -y
RUN apt-get clean -y

# Install ZBar
RUN apt-get install zbar-tools -y
RUN apt-get install libzbar-dev -y
RUN pip install pypng
RUN pip install pillow
RUN pip install qrtools

# Other dependencies
RUN pip install cmake
RUN pip install pillow
RUN pip install wheel
RUN pip install numpy
RUN pip install --upgrade azure-cognitiveservices-vision-computervision
RUN pip install requests
RUN pip install Flask-Cors
RUN pip install opencv-python
RUN pip install zbarlight
RUN pip install pyaadhaar
RUN pip install deepface

COPY ./ ./

EXPOSE 5000

CMD ["python","-u","app.py"]

