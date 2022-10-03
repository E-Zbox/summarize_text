import numpy as np
import cv2

# import transformers
# from transformers import pipeline
# from transformers import PegasusForConditionalGeneration, PegasusTokenizer
# import torch
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest
import base64
import pytesseract
from bs4 import BeautifulSoup
import requests
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\\Program Files (x86)\\Tesseract-OCR\\tesseract.exe"
)

punctuation = punctuation + "\n"
print(punctuation)

MODEL_NAME = "pegasus-xsum"
TOKENIZER_PATH = "./tokenizer/tokenizer_util"
MODEL_PATH = "./model/pegasus-xsum_model"

# tokenizer = PegasusTokenizer.from_pretrained(TOKENIZER_PATH)
# model = PegasusForConditionalGeneration.from_pretrained(MODEL_PATH)


# #def abstractive_summarizer(model, input_text=None, input_image=None, input_link = None, summary_type = "moderate"):
#     summarizer = pipeline("summarization", model=model, tokenizer=tokenizer, framework="pt")
#     if input_text:
#         if summary_type == "moderate":
#             summary = summarizer(input_text, min_length=50, max_length = 150)
#         elif summary_type == "short":
#             pass
#         elif summary_type == "long":
#             pass

#     elif input_image:
#         image = convert_b64_to_image(input_image)
#         text_from_image = extract_text_with_ocr(image)
#         if summary_type == "moderate":
#             summary = summarizer(text_from_image, min_length = 50, max_length = 150)
#         elif summary_type == "short":
#             pass
#         elif summary_type == "long":
#             pass
#     elif input_link:
#         pass

def extractive_summarizer(
    input_text=None, input_image=None, input_link=None, summary_type="moderate"
):
    stop_words = list(STOP_WORDS)
    nlp = spacy.load("en_core_web_sm")
    if input_text:
        doc = nlp(input_text.replace("\n", " "))
        tokens = [token.text for token in doc]

        word_frequency = {}
        for word in doc:
            if word.text.lower() not in stop_words:
                if word.text.lower() not in punctuation:
                    if word.text.lower() not in word_frequency.keys():
                        word_frequency[word.text] = 1
                    else:
                        if (
                            word.text not in word_frequency.keys()
                            and word.text.lower() in word_frequency.keys()
                        ):
                            word_frequency[word.text] = 1
                        word_frequency[word.text] += 1
        print(word_frequency)
        max_frequency = max(word_frequency.values())
        for word in word_frequency.keys():
            word_frequency[word] = word_frequency[word] / max_frequency
        sentence_tokens = [sent for sent in doc.sents]

        sentences_scores = {}

        for sent in sentence_tokens:
            for word in sent:
                if word.text.lower() in word_frequency.keys():
                    if sent not in sentences_scores.keys():
                        sentences_scores[sent] = word_frequency[word.text.lower()]
                    else:
                        sentences_scores[sent] += word_frequency[word.text.lower()]
        print(sentences_scores)
        if summary_type == "short":
            select_length = int(len(sentence_tokens) * 0.25)
            summary = nlargest(
                select_length, sentences_scores, key=sentences_scores.get
            )
            final_summary = [word.text for word in summary]
            summary = " ".join(final_summary)
            summary.replace("\n", "")
            print({"summary": summary})
            return summary if (summary is not None) else None
        if summary_type == "moderate":
            select_length = int(len(sentence_tokens) * 0.55)
            summary = nlargest(
                select_length, sentences_scores, key=sentences_scores.get
            )
            final_summary = [word.text for word in summary]
            summary = " ".join(final_summary)
            summary.replace("\n", "")
            return summary if (summary is not None) else None
        if summary_type == "long":
            select_length = int(len(sentence_tokens) * 0.75)
            summary = nlargest(
                select_length, sentences_scores, key=sentences_scores.get
            )
            final_summary = [word.text for word in summary]
            summary = " ".join(final_summary)
            summary.replace("\n", "")
            return summary if (summary is not None) else None

    elif input_image:
        image_nparray = convert_b64_to_image(input_image)
        text_from_image = extract_text_with_ocr(image_nparray)
        doc = nlp(text_from_image.replace("\n", " "))
        tokens = [token.text for token in doc]

        word_frequency = {}
        for word in doc:
            if word.text.lower() not in stop_words:
                if word.text.lower() not in punctuation:
                    if word.text.lower() not in word_frequency.keys():
                        word_frequency[word.text] = 1
                    else:
                        print(word_frequency[word.text])
                        word_frequency[word.text] += 1
        max_frequency = max(word_frequency.values())
        for word in word_frequency.keys():
            word_frequency[word] = word_frequency[word] / max_frequency
        sentence_tokens = [sent for sent in doc.sents]

        sentences_scores = {}

        for sent in sentence_tokens:
            for word in sent:
                if word.text.lower() in word_frequency.keys():
                    if sent not in sentences_scores.keys():
                        sentences_scores[sent] = word_frequency[word.text.lower()]
                    else:
                        sentences_scores[sent] += word_frequency[word.text.lower()]
        if summary_type == "moderate":
            select_length = int(len(sentence_tokens) * 0.55)
            summary = nlargest(
                select_length, sentences_scores, key=sentences_scores.get
            )
            final_summary = [word.text for word in summary]
            summary = " ".join(final_summary)
            summary.replace("\n", "")
            return summary if (summary is not None) else None

        elif summary_type == "short":
            select_length = int(len(sentence_tokens) * 0.25)
            summary = nlargest(
                select_length, sentences_scores, key=sentences_scores.get
            )
            final_summary = [word.text for word in summary]
            summary = " ".join(final_summary)
            summary.replace("\n", "")
            return summary if (summary is not None) else None

        elif summary_type == "long":
            select_length = int(len(sentence_tokens) * 0.75)
            summary = nlargest(
                select_length, sentences_scores, key=sentences_scores.get
            )
            final_summary = [word.text for word in summary]
            summary = " ".join(final_summary)
            summary.replace("\n", "")
            return summary if (summary is not None) else None



def convert_b64_to_image(b64str):
    encoded_data = b64str.split(",")[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    actual_image = Image.fromarray(img, 'RGB')

    return img


def extract_text_with_ocr(image):
    """
    returns the text extracted from an image. 
    """
    img = image
    text = pytesseract.image_to_string(img)
    return (text.replace("\n", ' '))


def get_only_text(url):
    """
    return the title and the textof the article
    at the specified url
    """
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html")
    text = " ".join(map(lambda p: p.text, soup.find_all("p")))
    title = " ".join(soup.title.stripped_strings)
    print({"text": text})
    print({"title": title})
    return title, text


