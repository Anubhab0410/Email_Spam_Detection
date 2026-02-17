import pandas as pd
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# 1. Load Data
df = pd.read_csv('spam.csv')

# 2. Preprocessing
# Convert spam/ham to 1/0
df['Spam'] = df['Category'].apply(lambda x: 1 if x == 'spam' else 0)

# 3. Vectorization (The "Translator")
# We use the full dataset to train the final model so it knows as many words as possible
v = CountVectorizer()
X_count = v.fit_transform(df.Message)

# 4. Model Training (The "Brain")
# We are using Naive Bayes as it had the best F1 Score (95.6%) in our tests
model = MultinomialNB()
model.fit(X_count, df.Spam)

# 5. Save the files
with open('spam_model.pkl', 'wb') as f:
    pickle.dump(model, f)
    
with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(v, f)

print("Success! Created 'spam_model.pkl' and 'vectorizer.pkl'")