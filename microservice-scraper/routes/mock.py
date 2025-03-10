from flask import Blueprint, render_template

mock_bp = Blueprint("mock_bp", __name__, template_folder="../templates")


@mock_bp.route("/table", methods=["GET"])
def table():
    return render_template("table.html")


@mock_bp.route("/basic", methods=["GET"])
def basic():
    return render_template("basic.html")
