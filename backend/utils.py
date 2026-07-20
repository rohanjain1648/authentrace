import io
import pdfplumber
import docx

def extract_text_from_file(file_content: bytes, filename: str) -> str:
    text = ""
    if filename.lower().endswith(".pdf"):
        with pdfplumber.open(io.BytesIO(file_content)) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    elif filename.lower().endswith(".docx"):
        doc = docx.Document(io.BytesIO(file_content))
        for para in doc.paragraphs:
            text += para.text + "\n"
    else:
        # Assume text file
        text = file_content.decode("utf-8")
        
    return text.strip()
