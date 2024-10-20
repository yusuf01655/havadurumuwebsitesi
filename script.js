function getWeather(){
    const apiKey = '770f7bee148a255dafa89d637f16e7d3';
    const city = document.getElementById('city').value;
    if(!city) {
        alert('lütfen şehir giriniz..');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error=>{
            console.error('Error fetching current weather daata:', error);
            alert('Error fetching current weather data please try again.');

        });

        fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error=>{
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching current hourly forecast data please try again.');

        });


}
function displayWeather(data){
    
    const tempDivInfo = document.getElementById('temp-div');
    const weatherDivInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherDivInfo.innerHTML='';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML='';
    
    if(data.cod ==='404'){
        weatherDivInfo.innerHTML = `<p>${data.message}</p>`;
    }
    else
    {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const temperatureHTML = `
        <p>${temperature} °C</p>
        `;
        const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>
        `;
        tempDivInfo.innerHTML = temperatureHTML;
        weatherDivInfo.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        showImage(); 
    }
}
function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0,8);
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const hourlyItemHtml = `
            <div class="hourly-item">
                <span> ${hour}:00 </span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span> ${temperature} °C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });

}
function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display='block';
}

