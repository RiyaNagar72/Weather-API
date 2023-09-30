
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = "c460acd6a912fa79ad00ddb49f6e9d10";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

// error for wrong location 
//if error code is 404 then i want to display 404 image
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

//below weather_data.main.temp gives the weather in kelvin so to convert into celcius i have subtracted it from 273.15
//used inbuilt function Math.round to round off celsius value
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;

//console.log(weather_data);     go to inspect and check ye data waha kese kaha ara because thats how we will mention it here
//weather data ke weather ke 0th position ke description mai data milra tha
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

//image ke liye used switch we can use if else also
//weather-data ke weather ka jo 0th tha jaha se descrpition laya tha uske main mai alag alag values ati hai switch se mai wo check krri hu
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "cloud.png";
            break;
        case 'Clear':
            weather_img.src = "clear.png";
            break;
        case 'Rain':
            weather_img.src = "rain.png";
            break;
        case 'Mist':
            weather_img.src = "mist.png";
            break;
        case 'Snow':
            weather_img.src = "snow.png";
            break;

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});