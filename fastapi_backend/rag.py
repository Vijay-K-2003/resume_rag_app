from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import TextLoader

from langchain_community.vectorstores import Qdrant
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms import Ollama

from langchain_text_splitters import CharacterTextSplitter


from gtts import gTTS

llm = Ollama(model="phi3")
embeddings = OllamaEmbeddings(model="phi3")

def summarize(filename):
    loader = PyPDFLoader(filename)
    pages = loader.load_and_split()
    
    text = llm.invoke(f"SUMMARIZE :::: {pages[0].page_content}")
    return {"summary": text}