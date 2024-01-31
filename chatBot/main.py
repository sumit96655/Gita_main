import os
import sys

import constants
from langchain.document_loaders import  TextLoader, DirectoryLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.llms import openai
from langchain.chat_models import ChatOpenAI

os.environ["OPENAI_API_KEY"] = constants.APIKEY

if len(sys.argv) < 2:
    print("Please provide a query as a command-line argument.")
    sys.exit(1)

query = sys.argv[1]
# print(query)

# loader = TextLoader('data.txt')
loader = DirectoryLoader(".", glob="*.txt")
index = VectorstoreIndexCreator().from_loaders([loader])

print(index.query(query, llm=ChatOpenAI()))
