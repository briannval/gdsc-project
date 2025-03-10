from flask import Blueprint
from utils.scraper import scrape_util

mq_bp = Blueprint("mq_bp", __name__)


@mq_bp.route("/scrape", methods=["POST"])
def scrape():
    scrape_util("google.com")


@mq_bp.route("/publish", methods=["POST"])
def publish():
    pass
