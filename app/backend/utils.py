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

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\\Users\\ssffff\\AppData\\Local\\Tesseract-OCR\\tesseract.exe"
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
    if input_text:
        stop_words = list(STOP_WORDS)
        nlp = spacy.load("en_core_web_sm")
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
        text_from_image = extract_text_with_ocr(input_image)
        nlp = spacy.load("en_core_web_sm")
        doc = nlp(text_from_image.replace("\n", " "))
        tokens = [token.text for token in doc]

        word_frequency = {}
        for word in doc:
            if word.text.lower() not in stop_words:
                if word.text.lower() not in punctuation:
                    if word.text.lower() not in word_frequency.keys():
                        word_frequency[word.text] = 1
                    else:
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
    return img


def extract_text_with_ocr(image):
    img = cv2.imread(image)
    # cv2.imshow('sample image', img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    text = pytesseract.image_to_string(img)
    return text


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


# extractive_summarizer(, summary_type="short")


# input_text = extract_text_with_ocr('C:\\Users\\ssffff\\Desktop\\Machine Learning Work\\Machine Learning projects\\Text_Summarizer\\summarize_text\\app\\server\\backend\\2.png')
# print(input_text)
# print(extractive_summarizer(iSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalSnakes are elongated, limbless, carnivorous reptiles of the suborder Serpentes. Like all other squamates, snakes are ectothermic, amniote vertebrates covered in overlapping scales. Many species of snakes have skulls with several more joints than their lizard ancestors, enabling them to swallow prey much larger than their heads. To accommodate their narrow bodies, snakes' paired organs appear one in front of the other instead of side by side, and most have only one functional lung. Some species retain a pelvic girdle with a pair of vestigial claws on either side of the cloaca. Lizards have evolved elongate bodies without limbs or with greatly reduced limbs about twenty-five times independently via convergent evolution, leading to many lineages of legless lizards. These resemble snakes, but several common groups of legless lizards have eyelids and external ears, which snakes lack, although this rule is not universalnput_text=input_text, summary_type="short"))


# print(extractive_summarizer(input_text="""
"""In computer science, separation of concerns (SoC) is a design principle for separating a computer program into distinct 
sections. Each section addresses a separate concern, a set of information that affects the code of a computer program. A concern can be as general as "the details of the hardware for an application", 
or as specific as "the name of which class to instantiate". A program that embodies SoC well is called a modular program. Modularity, and hence separation of
concerns, is achieved by encapsulating information inside a section of code that has a well-defined interface. Encapsulation is a means of information hiding. Layered designs
in information systems are another embodiment of separation of concerns (e.g., presentation layer, business logic layer, data access layer, persistence layer)., summary_type="long"))"""
