from flask import Flask, render_template, request, jsonify
import util
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/set_turns', methods = ['POST'])
def set_turn():
    dice = request.form['turns']
    no= util.set_turns(dice)
    return no

@app.route('/diceRoll', methods = ['GET'])
def diceRoll():
    try:
        result = util.game()
        response = jsonify(result) 
        response.headers.add('Access-Control-Allow-Origin', '*')  # Fixed CORS header
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/result', methods = ['GET'])
def result():
    result = util.score()
    response = jsonify(result)
    return response

if __name__ == "__main__":
    print("Flask server is running...")
    app.run(debug=True)