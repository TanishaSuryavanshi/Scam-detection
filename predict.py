"""
train_model.py
Train a scam-classifier using TF-IDF + Logistic Regression.
Saves model.pkl and vectorizer.pkl using joblib.
"""
import os
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# --- Sample dataset ----------------------------------------------------------
# In a real project, load a labelled dataset (e.g. SMS Spam Collection).
DATA = [
    ("Your SBI account will be blocked. Share OTP immediately.", 1),
    ("Congratulations! You won a free iPhone. Click http://bit.ly/win", 1),
    ("Earn $500/day from home. Pay registration fee to start.", 1),
    ("Income Tax warrant issued. Pay via gift card to avoid arrest.", 1),
    ("URGENT: verify your password at http://paypa1-secure.click", 1),
    ("Hey, are we still meeting at 7pm tomorrow?", 0),
    ("Your Amazon order #1234 has shipped.", 0),
    ("Reminder: dentist appointment Friday 10am.", 0),
    ("Project deadline moved to next Monday.", 0),
    ("Lunch?", 0),
]

def main():
    df = pd.DataFrame(DATA, columns=["text", "label"])
    X_train, X_test, y_train, y_test = train_test_split(
        df["text"], df["label"], test_size=0.2, random_state=42, stratify=df["label"]
    )

    vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=1, lowercase=True)
    Xtr = vectorizer.fit_transform(X_train)
    Xte = vectorizer.transform(X_test)

    model = LogisticRegression(max_iter=500)
    model.fit(Xtr, y_train)

    print(classification_report(y_test, model.predict(Xte)))

    os.makedirs(os.path.dirname(__file__) or ".", exist_ok=True)
    joblib.dump(model, "model.pkl")
    joblib.dump(vectorizer, "vectorizer.pkl")
    print("Saved model.pkl and vectorizer.pkl")

if __name__ == "__main__":
    main()
