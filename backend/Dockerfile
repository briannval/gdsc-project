FROM python:3.12-slim

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app
COPY ./start.sh /code/start.sh
COPY .env /code/.env

CMD ["sh", "/code/start.sh"]
