import os
import streamlit as st
# import dill as pickle_dill
import pickle #for writing files to storage
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from streamlit_extras.add_vertical_space import add_vertical_space
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import ChatOpenAI
from langchain.callbacks import get_openai_callback


load_dotenv()
embeddings = OpenAIEmbeddings()

def create_vector_db_from_pdf(pdf):
    if pdf is not None:
        pdf_reader = PdfReader(pdf)
        text = ""
        for page in pdf_reader.pages:
                text += page.extract_text()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size = 1000,
            chunk_overlap = 200,
            length_function = len
        )
        docs = text_splitter.split_text(text=text)

        #embedding        
        store_name = pdf.name[:-4]

        if os.path.exists(f"{store_name}.pkl"):
            with open(f"{store_name}.pkl","rb") as f:
                VectorStore = pickle.load(f)
            st.write('Embeddings loaded from the disk')
        else:
            # embeddings = OpenAIEmbeddings()
            VectorStore = FAISS.from_texts(docs, embedding= embeddings)
            with open(f"{store_name}.pkl","wb") as f:
                pickle.dump(VectorStore, f)
            st.write('Embeddings computation completed')

        # db = FAISS.from_documents(docs, embeddings)
        return VectorStore

def get_response_from_query(VectorStore, query, k=4):

    docs = VectorStore.similarity_search(query, k=k)
    chunk_page_content = " ".join(docs)

    llm = OpenAI(model_name = "text-davinci-003")

    prompt = PromptTemplate(
        input_variables=["question","docs"],
        template="""
        You are a helpful assistant that can answer questions about document 
        based on the documents's transcript.
        
        Answer the following question: {question}
        By searching the following document transcript: {docs}
        
        Only use the factual information from the transcript to answer the question.
        
        If you feel like you don't have enough information to answer the question, say "I don't know".
        
        Your answers should be verbose and detailed.
        """,
    )

    chain = LLMChain(llm=llm, prompt=prompt)

    response = chain.run(question = query, docs = chunk_page_content)
    response = response.replace("\n","")
    return response, docs




# def generate_docx_output(document, question):
#     llm = ChatOpenAI(temperature=0.7)
#     # st.info(llm(question))

#     prompt_template_name = PromptTemplate(
#         # input_variables=['document'],
#         template= "Type something"
#     )

#     # name_chain = LLMChain(llm= llm, prompt= prompt_template_name, output_key='Answer')

#     # response = name_chain()
#     return llm

# if __name__ == "__main__":
#     print(generate_docx_output())