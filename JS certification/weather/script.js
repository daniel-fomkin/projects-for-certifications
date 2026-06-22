const weatherContainer = document.querySelector("#weather-container");
const getWeatherButton = document.querySelector("#get-weather-btn");
const townSelect = document.querySelector("select");

class WeatherContainerTemplate{
    constructor(icon, temperature, feels, humidity, windSpeed, windGust, weatherMain, location){
        this.icon = icon;
        this.temperature = temperature;
        this.feels = feels;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.windGust = windGust;
        this.weatherMain = weatherMain;
        this.location = location;
    }



    createTemplate(){
        weatherContainer.innerHTML = 
        `
            <h3 id="location">${this.location}</h3>

            <div class="weather">
                <b>Weather: </b>
                <img src="${this.icon}" alt="${this.location + " weather"}" id="weather-icon">
                <p id="weather-main">${this.weatherMain || "N/A"}</p>
            </div>
            <b>Temperature:</b>
            <div class="temperature">
                <p id="main-temperature">Main: ${this.temperature || "N/A"}</p>
                <p id="feels-like">Feels like: ${this.feels || "N/A"}</p>
            </div>

            <div class="other">
                <p id="humidity">Humidity: ${this.humidity || "N/A"}</p>

                <b>Wind:</b>
                <p id="wind">Speed: ${this.windSpeed || "N/A"}</p>
                <p id="wind-gust">Gust: ${this.windGust || "N/A"}</p>
            </div>
            
        `
    }
}


async function getWeather(city){
    try{
        const res =  fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`)
        return (await res).json()
    }
    catch (err){
        console.error(err);
    }
}

async function showWeather(){
    const townNow = townSelect.value;
    if(townNow){
        const data = await getWeather(townNow); 
        
        try{
            const weatherTemplate = new WeatherContainerTemplate(
                data.weather[0].icon,
                data.main.temp,
                data.main.feels_like,
                data.main.humidity,
                data.wind.speed,
                data.wind.gust,
                data.weather[0].main,
                data.name
            );
            weatherTemplate.createTemplate();
        }
        catch{
            alert("Something went wrong, please try again later")
        }
    }
}



getWeatherButton.addEventListener('click', showWeather)


//71