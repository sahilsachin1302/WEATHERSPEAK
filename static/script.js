async function getWeather(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    const weatherInfoDiv = document.getElementById('weatherInfo');
    
    try {
        const response = await $.ajax({
            url: '/',
            type: 'POST',
            data: { city: city },
        });

        weatherInfoDiv.innerHTML = ''; // Clear existing content
        if (response) {
            const weatherInfo = `
                <h2>${response.location.name}, ${response.location.country}</h2>
                <p>Temperature: ${response.current.temp_c} &#8451;</p>
                <p>Description: ${response.current.condition.text}</p>
                <p>Wind Speed: ${response.current.wind_kph} km/h</p>
            `;
            weatherInfoDiv.innerHTML = weatherInfo;
            speakWeatherInfo(response); // Call the function to speak the information
        } else {
            weatherInfoDiv.innerHTML = '<p>City not found.</p>';
        }
    } catch (error) {
        weatherInfoDiv.innerHTML = '<p>An error occurred while fetching weather data.</p>';
    }
}

function speakWeatherInfo(response) {
    const textToSpeak = `The temperature of ${response.location.name} is ${response.current.temp_c} degrees Celsius. ` +
        `It is located in ${response.location.region}. ` +
        `Current wind speed is ${response.current.wind_kph} kilometers per hour.`;
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = textToSpeak;
    window.speechSynthesis.speak(speech);
}
