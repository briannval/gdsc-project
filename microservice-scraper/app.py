import logging
import os
import threading

import pika
from flask import Flask
from flask_cors import CORS
from routes.base import base_bp
from routes.mock import mock_bp
from routes.mq import mq_bp
from utils.scraper import scrape

logging.basicConfig(level=logging.INFO)


app = Flask(__name__)
app.register_blueprint(base_bp)
app.register_blueprint(mq_bp, url_prefix="/mq")
app.register_blueprint(mock_bp, url_prefix="/mock")
cors = CORS(app)

rabbitmq_connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        host="localhost",
        port=5672,
        heartbeat=600,
        blocked_connection_timeout=300,
    )
)
rabbitmq_channel = rabbitmq_connection.channel()
rabbitmq_channel.queue_declare("scrape_request")
rabbitmq_channel.queue_declare("scrape_process")


@app.route("/")
def home():
    return "Hello, World!"


def callback(ch, method, properties, body):
    scrape(body.decode())


def consume():
    rabbitmq_channel.basic_consume(
        queue="scrape_request",
        on_message_callback=callback,
        auto_ack=True,
    )
    print("Listening...")
    rabbitmq_channel.start_consuming()


if __name__ == "__main__":
    (threading.Thread(target=consume, daemon=True)).start()
    app.run(debug=True)
