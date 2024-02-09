import os
import random
import PyPDF2
import re
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import FAISS, faiss
from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import PyPDFLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain.chains import ConversationalRetrievalChain
from dotenv import load_dotenv

load_dotenv()

llm  = ChatOpenAI(model_name= "gpt-3.5-turbo")

# select which embeddings we want to use
embeddings = OpenAIEmbeddings()
# chat_history =[]

def create_vector_db_from_pdf():
    #Load document
    loader = PyPDFLoader("./bhagavad-gita-in-english-source-file.pdf")
    documents = loader.load()

    # split the documents into chunks
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100, length_function=  len)
    texts = text_splitter.split_documents(documents)

    # create the vectorestore to use as the index
    db = FAISS.from_documents(texts, embeddings)
    return db

def get_response_from_query(db, query,k=2):
    # expose this index in a retriever interface
    prompt = 'with reference to the pdf provided answer the question to '+query
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k":2})

    # create a chain to answer questions 
    qa = ConversationalRetrievalChain.from_llm(ChatOpenAI(), retriever)
    # query = "What is the total number of AI publications?"
    chat_history=[]
    result = qa({"question": prompt, "chat_history": chat_history})
    # chat_history.append()

    return result

def get_response_for_search_verse(db, query,k=2):

    prompt = 'Write the chapter number and verse number for ' + query
    # expose this index in a retriever interface
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k":2})

    # create a chain to answer questions 
    qa = ConversationalRetrievalChain.from_llm(ChatOpenAI(), retriever)
    chat_history = []
    # query = "What is the total number of AI publications?"
    result = qa({"question": prompt, "chat_history": chat_history})

    return result

def extract_text_from_pdf(pdf_path):

    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        num_pages = len(pdf_reader.pages)

        text = ""
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

    return text

def split_text_between_languages(text):
    # Use regular expressions to find the transition from English to Sanskrit
    transition_pattern = re.compile(r'\|\|(\d+-\d+)\|\|')
    matches = transition_pattern.finditer(text)

    # Split the text based on the found transitions
    verses = []
    start_index = 0

    for match in matches:
        end_index = match.start()
        section_number = match.group(1)
        section_text = text[start_index:end_index].strip()
        verses.append({'verse_number': section_number, 'verse_text': section_text})
        start_index = match.end()

    # Add the last section
    last_section_number = str(len(verses) + 1)
    last_section_text = text[start_index:].strip()
    verses.append({'verse_number': last_section_number, 'verse_text': last_section_text})

    return verses

def verse_list():
    # Provide the path to your PDF file
    pdf_path = './Gita_text_sanskrit.pdf'

    try:
        pdf_text = extract_text_from_pdf(pdf_path)
        
        # Extract the first two lines of the PDF
        initial_section = {'verse_number': 0, 'verse_text': pdf_text.split('\n', 2)[:2]}
        
        # Split the remaining text into sections
        remaining_text = pdf_text.split('\n', 2)[2:]
        remaining_text = '\n'.join(remaining_text)
        
        all_the_verses = split_text_between_languages(remaining_text)

        # Insert the initial section at the beginning
        all_the_verses.insert(0, initial_section)

        # Return the list of language sections
        return all_the_verses

    except Exception as e:
        return "Error: {e}"

def random_verse(all_the_verses):
    random_number = random.randint(0, len(all_the_verses) - 1)

    # Ensure the random number is not 0 or the last index
    while random_number == 0 or random_number == len(all_the_verses) - 1:
        random_number = random.randint(0, len(all_the_verses) - 1)
    
    # random_number = random.randint(1, len(all_the_verses) - 2)

    # Print the element at the random number's position
    random_section = all_the_verses[random_number]

    # return random_number
    return random_section

def get_explanation(verse_number, pdf_text):
    converted_verse_number = convert_verse_number_format(verse_number)
    explain_question = f"explain the verse for verse number: ({converted_verse_number})"
    db_dv = create_vector_db_from_pdf()
    explanation = get_response_from_query(db_dv, explain_question)
    return explanation

def convert_verse_number_format(verse_number):
    # Convert the verse number format from number-number to number.number
    return verse_number.replace('-', '.')

