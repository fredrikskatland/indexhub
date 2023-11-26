import zipfile
import os
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

def verify_chroma_db(file_path):
    # Extract the file
    with zipfile.ZipFile(file_path, 'r') as zip_ref:
        temp_extract_dir = "verification"  # Replace with your desired directory
        # remove .zip from file_path
        file_path = file_path[:-4]
        zip_ref.extractall(temp_extract_dir)
        try:
            db_dir = os.path.join(temp_extract_dir, file_path)
            db3 = Chroma(persist_directory=db_dir)
            ids = db3.get()
            ids['ids'][0]
            metadata = db3.get(ids['ids'][0])['metadatas']
            metadatakeys = list(metadata[0].keys()) 
            # TODO: Add sample document and add sample text to the returned metadata
            return str(metadatakeys)
        # Return error:
        except:
            return "Error: File is not a valid Chroma database"

    # Clean up (remove the extracted files)
    # Make sure to handle exceptions and possible errors in a production environment
    os.remove(temp_extract_dir)


def retriever(query):
    embeddings = OpenAIEmbeddings()
    try:
        db_dir = r"C:\Users\fredr\AI\indexhub\indexhub\media\vectorstore_databases\ammehjelpen_chroma_db"
        vectorstore = Chroma(persist_directory=db_dir, embedding_function = embeddings)
        retriever = vectorstore.as_retriever()
        result = retriever.get_relevant_documents(query)
        return result
    except Exception as e:
        return e