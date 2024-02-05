# import flask
from flask import Flask, request, jsonify
from flask_cors import CORS
import verse
from verse import create_vector_db_from_pdf, get_response_from_query

app = Flask(__name__)
CORS(app) 
pdf_text = create_vector_db_from_pdf()

@app.route("/")
def hello_world():
    return "Welcome to Gita Soul Connect"

@app.route("/answer_to/", methods=['GET','POST'])
def answer():
    answer = None
    # data = request.get_json()
    if request.method == 'POST':
        user_question = request.form['question'] #query
        # user_question  = data.get('question','')

    answer = get_response_from_query(pdf_text, user_question)
    
    return jsonify({'answer': answer})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0',port='8000')