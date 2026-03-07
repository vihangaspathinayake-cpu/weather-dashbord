async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const cityDisplay = document.getElementById('city');
    const tempDisplay = document.getElementById('temperature');
    const conditionDisplay = document.getElementById('condition');

    if (!cityInput) {
        alert("Please enter a city name");
        return;
    }

    try {
        // අපේ Backend සර්වර් එකට දත්ත ඉල්ලා යැවීම
        const response = await fetch(`http://localhost:3000/api/weather?city=${cityInput}`);
        const data = await response.json();

        if (response.ok) {
            // ප්‍රධාන තොරතුරු යාවත්කාලීන කිරීම
            cityDisplay.innerText = `${data.name}, ${data.country}`;
            tempDisplay.innerText = `${data.temp}°C`;
            conditionDisplay.innerText = data.condition;
            
            // අද දින දිනය පෙන්වීම
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.querySelector('.date').innerText = new Date().toLocaleDateString(undefined, options);

            // පහළ ඇති Stat Cards යාවත්කාලීන කිරීම
            const statValues = document.querySelectorAll('.stat-card .value');
            statValues[0].innerText = `${data.feels_like}°C`; // Feels Like
            statValues[1].innerText = `${data.humidity}%`;    // Humidity
            statValues[2].innerText = `${data.wind_speed} m/s`; // Wind Speed
            statValues[3].innerText = `${data.pressure} mb`;  // Pressure
            statValues[4].innerText = `${data.visibility} km`; // Visibility
            // UV Index එක සාමාන්‍ය API එකේ නැති නිසා ස්ථාවර අගයක් හෝ ඉවත් කළ හැක
            statValues[5].innerText = "N/A"; 

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Cannot connect to the server. Make sure your backend is running.");
    }
}