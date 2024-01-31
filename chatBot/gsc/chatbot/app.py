# # import flask
# from flask import Flask, request, jsonify
# # import pdf
# from pdf import create_vector_db_from_pdf, get_response_from_query

# from flask_cors import CORS

# app = Flask(__name__)

# CORS(app)  # Enable CORS for all routes

# pdf_text = create_vector_db_from_pdf()

# @app.route("/")
# def hello_world():
#     return "Welcome to Gita Soul Connect"

# @app.route("/answer_to/", methods=['GET','POST'])
# def answer():
#     answer = None
#     # data = request.get_json()
#     if request.method == 'POST':
#         user_question = request.form['question'] #query
#         # user_question  = data.get('question','')

#     answer = get_response_from_query(pdf_text, user_question)
    
#     return jsonify({'answer': answer})

# if __name__ == "_main_":
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from pdf import create_vector_db_from_pdf, get_response_from_query

app = Flask(__name__)
CORS(app)

pdf_text = create_vector_db_from_pdf()

@app.route("/")
def hello_world():
    return "Welcome to Gita Soul Connect"

@app.route("/answer_to/", methods=['GET', 'POST'])
def answer():
    answer = None
    user_question = None  # Initialize user_question to None

    if request.method == 'POST':
        user_question = request.form.get('question', '')

    try:
        if user_question is not None:  # Check if user_question has a value
            answer = get_response_from_query(pdf_text, user_question)
        else:
            raise ValueError("No question provided.")
    except Exception as e:
        print(f"Error processing request: {e}")
        answer = "An error occurred."

    return jsonify({'answer': answer})

if __name__ == "__main__":
    app.run(debug=True)
