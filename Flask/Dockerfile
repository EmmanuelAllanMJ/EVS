FROM python:3.11.2-alpine3.17

WORKDIR /project

ADD . /project

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python","app.py"]