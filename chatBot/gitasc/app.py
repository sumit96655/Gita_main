# import flask
from flask import Flask, request, jsonify
import gsc
from gsc import create_vector_db_from_pdf, get_response_from_query, get_response_for_search_verse,verse_list, random_verse, get_explanation
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

pdf_text = create_vector_db_from_pdf()
all_the_verses = verse_list()

@app.route("/")
def hello_world():
    return "Welcome to Gita Soul Connect!!"

@app.route("/answer_to/", methods=['GET','POST'])
def answer_to():
    answer = None
    if request.method == 'POST':
        user_question = request.form['question'] #query

        answer = get_response_from_query(pdf_text, user_question)
    
    return jsonify({'answer': answer})

@app.route("/search_chapter/", methods=['GET','POST'])
def answer_search():
    answer = None
    if request.method == 'POST':
        user_question = request.form['question'] 

    answer = get_response_for_search_verse(pdf_text, user_question)
    
    return jsonify({'answer': answer})

@app.route("/daily_verse/", methods=['GET', 'POST'])
def daily_verse():
    
    verse = random_verse(all_the_verses)
    explanation = get_explanation(verse['verse_number'], pdf_text)

    response_json = {
        "Today's Verse": {
            "verse_number": verse['verse_number'],
            "verse_text": verse['verse_text'],
            "explanation" : explanation
        }
    }
    # Convert the nested dictionary to a JSON string
    explanation_str = jsonify(explanation).data.decode('utf-8')
    response_json["Today's Verse"]["explanation"] = explanation_str

    return jsonify(response_json)
if __name__ == "__main__":
    app.run(debug=True)