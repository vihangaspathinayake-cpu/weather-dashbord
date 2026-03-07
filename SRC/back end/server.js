const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const path = require("path"); 

app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});
const PORT = 3000;


app.use(cors()); 
app.use(express.json());


const API_KEY = "ac6d0ad270d8d12de1602df2fbcec21b"; 

app.get("/api/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ message: "City name is required" });
    }

    try {
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);

       
        const weatherData = {
            name: response.data.name,
            country: response.data.sys.country,
            temp: Math.round(response.data.main.temp),
            feels_like: Math.round(response.data.main.feels_like),
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed,
            pressure: response.data.main.pressure,
            visibility: (response.data.visibility / 1000).toFixed(1), // km වලින්
            condition: response.data.weather[0].description,
            icon: response.data.weather[0].icon
        };

        res.json(weatherData);

    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: "City not found" });
        } else {
            res.status(500).json({ message: "Error fetching weather data" });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});