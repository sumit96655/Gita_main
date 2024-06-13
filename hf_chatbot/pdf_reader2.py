import os
from langchain_community.llms import HuggingFaceHub
# from langchain.prompts import PromptTemplate
from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
from langchain_community.embeddings import HuggingFaceEmbeddings
from transformers import pipeline
from langchain_community.vectorstores import FAISS, faiss
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import ConversationalRetrievalChain
from langchain_community.chat_models.huggingface import ChatHuggingFace
from langchain.embeddings import HuggingFaceEmbeddings
# from dotenv import load_dotenv
from getpass import getpass
from langchain_community.llms import HuggingFaceEndpoint
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.embeddings import HuggingFaceEmbeddings
HUGGINGFACEHUB_API_TOKEN = getpass()

os.environ["HUGGINGFACEHUB_API_TOKEN"] = "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"
# HUGGINGFACEHUB_API_TOKEN = "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"
# load_dotenv()

# llm=HuggingFaceHub(repo_id="google/flan-t5-xxl",task="text2text-generation", model_kwargs={"temperature":0.4,"max_length":256})
#You are a helpful AI chatbot who gives answers related to Bhagvad Gita. You give the most relevant, motivating and honest answers. In case if you dont know the answer, you admit it. 

template=""" return a 2 line answer from the following questiton using the provided context.

Question : 
{query}
"""
embeddings = HuggingFaceEmbeddings()
# question = "what did krishna explain arjuna in bhgvad gita?"
repo_id = "mistralai/Mistral-7B-Instruct-v0.2"
prompt = PromptTemplate.from_template(template)
# llm = HuggingFaceEndpoint(
#     repo_id=repo_id, max_length=128, temperature=0.5, token=HUGGINGFACEHUB_API_TOKEN
# )
# llm_chain = LLMChain(prompt=prompt, llm=llm)
# print(llm_chain.run(question))

chat_history = []

def create_vector_db_from_pdf():

    loader = PyPDFLoader("./bhagavad-gita-in-english-source-file.pdf")
    documents = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=20, length_function=len)
    texts = text_splitter.split_documents(documents)

    db = FAISS.from_documents(texts, embeddings)
    return db

def get_response_from_query(db, query,k=2):

    # expose this index in a retriever interface
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k":2})
    prompt = PromptTemplate(template=template, input_variables=['query'])

    query_result = embeddings.embed_query(query)

    # create a chain to answer questions 
    # qa = ConversationalRetrievalChain.from_llm(HuggingFaceHub(repo_id=repo_id,task="text2text-generation"), retriever)
    # qa = ConversationalRetrievalChain.from_llm(HuggingFaceEndpoint(repo_id=repo_id, max_length=128, temperature=0.5, token=HUGGINGFACEHUB_API_TOKEN ), retriever)
    qa = ConversationalRetrievalChain.from_llm(HuggingFaceEndpoint(repo_id=repo_id), retriever)
    result = qa({"question": query, "chat_history": chat_history})
    # chat_history.append()
    print(result)
    return result['answer']