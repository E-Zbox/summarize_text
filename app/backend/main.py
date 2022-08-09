from flask import Flask, request, jsonify, json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route("/", methods=["POST"])
def index():
    print(json.loads(request.data))
    print(dir(request.data))

    return jsonify({"error": False, "data": ["apple", "iPhone", "Samsung"]})
