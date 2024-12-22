from flask import Flask, render_template, request, jsonify
import util
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/set_turns', methods=['POST'])
def set_turn():
    dice = request.form['turns']
    no = util.set_turns(dice)
    return no

@app.route('/diceRoll', methods=['GET'])
def diceRoll():
    try:
        result = util.game()
        response = jsonify(result)
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/result', methods=['GET'])
def result():
    result = util.score()
    response = jsonify(result)
    return response

if __name__ == "__main__":
    # Get the port from the environment variable or default to 5000 for local
    port = int(os.environ.get('PORT', 5000))
    # Run the app on all interfaces (0.0.0.0) for cloud deployment
    app.run(debug=True, host='0.0.0.0', port=port)
