FROM python:3.9
 
WORKDIR /code
 
COPY /requirements.txt /code/requirements.txt
 
RUN pip install --no-cache-dir --upgrade --default-timeout=600 -r /code/requirements.txt
 
COPY ./ /code/backend

#setting port to 5000 locally if port wasn't set before... (usually set by heroku)
ENV PORT 5000

CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port $PORT"]
