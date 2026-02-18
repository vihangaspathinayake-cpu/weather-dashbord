function getWeather() {
    var city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    var url = "http://localhost:3000/api/weather?city=" + city;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.cod === "404" || data.message === "City not found") {
                alert("City not found");
                return;
            }

            document.getElementById("city").innerText =
                "City: " + data.name;

            document.getElementById("temperature").innerText =
                "Temperature: " + data.main.temp + " °C";

            document.getElementById("condition").innerText =
                "Weather: " + data.weather[0].main;
        })
        .catch(function () {
            alert("Error fetching weather data");
        });
}
