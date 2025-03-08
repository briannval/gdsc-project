from flask import Flask
from flask_cors import CORS
from routes.base import base_bp

app = Flask(__name__)
app.register_blueprint(base_bp)
cors = CORS(app)


@app.route("/")
def home():
    return "hello world"
