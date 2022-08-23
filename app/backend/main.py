from flask import Flask, request, jsonify, json
from utils import extractive_summarizer
#from flask_cors import CORS, cross_origin


app = Flask(__name__)
#CORS(app, supports_credentials=True)


@app.route("/summary", methods=["POST"])
def summarizer():
    req_type = request.form['type']
    body = request.form['body']
    summary_type = request.form['summary_type']

    if req_type == "input_text":
        summary = extractive_summarizer(input_text = body, summary_type = summary_type)
        
    elif req_type == "input_link":
        summary = extractive_summarizer(input_link = body, summary_type = summary_type)
        # Input link hasn't be implemented yet, sometimes later

    elif req_type == "input_image":
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

# __Developer Note
#------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#NB: Kindly test it from your end locally also with the interface and any issues that arises let me know 
#------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------