from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # Allow Chrome Extension to access this server

# Load the trained model
with open("spam_model.pkl", "rb") as f:
    model = pickle.load(f)
with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    email_text = data['text']
    
    # Transform text and predict
    vectorized_text = vectorizer.transform([email_text])
    prediction = model.predict(vectorized_text)[0]
    
    result = "Spam" if prediction == 1 else "Ham"
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)