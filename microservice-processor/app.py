import logging
import threading
import time

import pika
from flask import Flask
from flask_cors import CORS

logging.basicConfig(level=logging.INFO)

CONSUME_QUEUE = "scrape_process"
PRODUCE_QUEUE = "scrape_done"

app = Flask(__name__)
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
    print(f"Processor received message from {CONSUME_QUEUE}: {body.decode()}")
    time.sleep(2)  # simulate processing
    produce(str(1))
    print("Processor signalling backend")


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
    app.run(debug=True)  # always start processor before scraper
