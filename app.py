from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = '2ddbcf535d23486e8c1133428230404'
WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json'

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        city = request.form['city']
        weather_data = get_weather_data(city)
        return jsonify(weather_data) if weather_data else jsonify({})
    return render_template('index.html')

def get_weather_data(city):
    params = {
        'key': API_KEY,
        'q': city,
    }
    response = requests.get(WEATHER_API_URL, params=params)
    if response.status_code == 200:
        return response.json()
    return None

if __name__ == '__main__':
    app.run(debug=True)
