import langchain_helper as lch
import streamlit as st
import textwrap
# import dill as pickle_dill
import pickle #for writing files to storage
from streamlit_extras.add_vertical_space import add_vertical_space
 

st.title("Document Chatbot")

with st.sidebar:
    with st.form(key='my_form'):
        docx = st.sidebar.file_uploader("Upload your PDF", type='pdf')
        # docx = st.sidebar.text_area(
        #     label = "Enter the document",
        #     max_chars=80
        # )
        query = st.sidebar.text_area(
            label = "Ask question about your document",
            max_chars=80,
            key = "query"
        )
        submit_button = st.form_submit_button(label='Submit')

if query and docx:
    db = lch.create_vector_db_from_pdf(docx)
    response, docs = lch.get_response_from_query(db, query)
    st.subheader("Answer:")
    st.text(textwrap.fill(response, width=85))

# def main():
#     st.header("Chat with pdf")

#     #upload a PDF file
#     pdf = st.file_uploader("Upload your PDF", type='pdf')
#     # st.write(pdf.name)

#     # st.write(pdf)
#     if pdf is not None:
#         pdf_reader = PdfReader(pdf)

#         text = ""
#         for page in pdf_reader.pages:
#             text += page.extract_text()

#         text_splitter = RecursiveCharacterTextSplitter(
#             chunk_size = 1000,
#             chunk_overlap = 200,
#             length_function = len
#         )
#         chunks = text_splitter.split_text(text=text)

#         #embedding        
#         store_name = pdf.name[:-4]

#         if os.path.exists(f"{store_name}.pkl"):
#             with open(f"{store_name}.pkl","rb") as f:
#                 VectorStore = pickle.load(f)
#             st.write('Embeddings loaded from the disk')
#         else:
#             embeddings = OpenAIEmbeddings()
#             VectorStore = FAISS.from_texts(chunks, embedding= embeddings)
#             with open(f"{store_name}.pkl","wb") as f:
#                 pickle.dump(VectorStore, f)
#             st.write('Embeddings computation completed')

#         # Accept user question/query
#         query = st.text_input("Ask questions about your pdf file:")
#         if query:
#             docs = VectorStore.similarity_search(query = query, k=3)

#             llm = ChatOpenAI(temperature=0)
#             chain = load_qa_chain(llm=llm, chain_type="stuff")
#             with get_openai_callback() as cb:
#                 response = chain.run(input_documents=docs, question=query)
#                 print(cb)
#             st.write(response)

#             #st.write(docs)
        
#         # # st.write(text)



# if __name__ == "__main__":
#     main()

