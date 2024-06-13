import os
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI
from langchain_openai import ChatOpenAI
# from langchain_community.chat_models import ChatOpenAI
from langchain_community.vectorstores import FAISS, faiss
from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import PyPDFLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain.chains import ConversationalRetrievalChain
from dotenv import load_dotenv

load_dotenv()

# llm  = ChatOpenAI(model_name = "gpt-3.5-turbo")

embeddings = OpenAIEmbeddings()

def create_vector_db_from_pdf():

    loader = PyPDFLoader("./bhagavad-gita-in-english-source-file.pdf")
    documents = loader.load()
    
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100, length_function=  len)
    texts = text_splitter.split_documents(documents)

    db = FAISS.from_documents(texts, embeddings)
    return db

def get_response_from_query(db, query,k=2):

    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k":2})

    # create a chain to answer questions 
    qa = ConversationalRetrievalChain.from_llm(ChatOpenAI(), retriever)
    chat_history = []
    result = qa({"question": query, "chat_history": chat_history})

    return result


#https://towardsdatascience.com/4-ways-of-question-answering-in-langchain-188c6707cc5a