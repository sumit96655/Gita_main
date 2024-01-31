# import flask
from flask import Flask, request, jsonify
import verse
from verse import create_vector_db_from_pdf, get_response_from_query

app = Flask(__name__)
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

if __name__ == "_main_":
    app.run(debug=True)