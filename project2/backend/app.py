
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from lcs import lcs_table, get_autocomplete_suggestions

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

# Load dictionary from a file
with open('wordlist.txt') as f:
    dictionary = [line.strip() for line in f]

@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    prefix = request.args.get('prefix')
    suggestions = get_autocomplete_suggestions(prefix, dictionary)
    return jsonify(suggestions)

@app.route('/lcs', methods=['POST'])
def lcs():
    data = request.get_json()
    word1 = data.get('word1')
    word2 = data.get('word2')

    table, similarity = lcs_table(word1, word2)
    return jsonify({'table': table, 'similarity': similarity})

if __name__ == "__main__":
    app.run(debug=True)
