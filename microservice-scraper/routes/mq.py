from flask import Blueprint

mq_bp = Blueprint("mq_bp", __name__)


@mq_bp.route("/scrape", methods=["POST"])
def scrape():
    pass


@mq_bp.route("/publish", methods=["POST"])
def publish():
    pass
