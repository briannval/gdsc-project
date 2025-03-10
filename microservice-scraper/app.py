import logging
import threading
import time

import pika
from flask import Flask
from flask_cors import CORS
from routes.base import base_bp
from routes.mock import mock_bp
from routes.mq import mq_bp
from utils.scraper import scrape_util

logging.basicConfig(level=logging.INFO)

CONSUME_QUEUE = "scrape_request"
PRODUCE_QUEUE = "scrape_process"

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
rabbitmq_channel.queue_declare(CONSUME_QUEUE)
rabbitmq_channel.queue_declare(PRODUCE_QUEUE)


@app.route("/")
def home():
    return "Hello, World!"


def produce(res_id):
    rabbitmq_channel.basic_publish(exchange="", routing_key=PRODUCE_QUEUE, body=res_id)


def callback(ch, method, properties, body):
    print(f"Scraper received message from {CONSUME_QUEUE}: {body.decode()}")
    time.sleep(2)  # simulate scraping
    produce(str(1))
    print("Scraper signalling processor")


def consume():
    rabbitmq_channel.basic_consume(
        queue=CONSUME_QUEUE,
        on_message_callback=callback,
        auto_ack=True,
    )
    print("Listening...")
    rabbitmq_channel.start_consuming()


if __name__ == "__main__":
    (threading.Thread(target=consume, daemon=True)).start()
    try:
        app.run(debug=True)
    except:
        app.run(debug=True, port=5001)
