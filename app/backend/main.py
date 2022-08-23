from sre_constants import SUCCESS
from flask import Flask, request, jsonify, json
from app.backend.utils import extractive_summarizer
#from flask_cors import CORS, cross_origin
import utils


app = Flask(__name__)
#CORS(app, supports_credentials=True)


@app.route("/", methods=["POST"])
def index():
    type = request.form['type']
    body = request.form['body']
    summary_type = request.form['summary_type']

    if type == "input_text":
        summary = extractive_summarizer(input_text = body, summary_type = summary_type)
        
    elif type == "input_link":
        summary = extractive_summarizer(input_link = body, summary_type = summary_type)
    elif type == "input_image":
        summary = extractive_summarizer(input_image=body, summary_type=summary_type)

    if summary is not None:
        status = True 
    else:
        status = False
    jsonResponse = {
        'summary_data': summary,
        'success': status,
        'model': "extractive"
    }

    return jsonResponse

if __name__ == '__main__':
    print("Starting Python Flask server")
    app.run(port=5000)