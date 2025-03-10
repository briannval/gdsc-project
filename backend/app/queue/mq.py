import logging
import threading

import pika


class MQClient:
    def __init__(self):
        self.conn = pika.BlockingConnection(
            pika.ConnectionParameters(
                host="localhost",
                port=5672,
                heartbeat=600,
                blocked_connection_timeout=300,
            )
        )
        self.channel = self.conn.channel()
        self.channel.queue_declare(queue="scrape_done")
        self.channel.queue_declare(queue="scrape_request")

    def callback(self, ch, method, properties, body):
        print(f"Backend received message from {method.routing_key}: {body.decode()}")

    def consume(self, queue):
        self.channel.basic_consume(
            queue=queue,
            on_message_callback=self.callback,
            auto_ack=True,
        )
        print(f"Listening for messages on {queue} queue...")
        self.channel.start_consuming()

    def publish(self, queue_name, message):
        self.channel.basic_publish(exchange="", routing_key=queue_name, body=message)

    def start_consumer_thread(self, queue):
        thread = threading.Thread(target=self.consume, args=(queue,), daemon=True)
        thread.start()
        print("Started consumer thread.")
