FROM python:3.7

RUN apt-get update && \
    apt-get install -y \
    libgl1-mesa-glx && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

#install darkflow
RUN git clone https://github.com/thtrieu/darkflow.git
WORKDIR /usr/src/app/darkflow
RUN pip install .

WORKDIR /usr/src/app

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]