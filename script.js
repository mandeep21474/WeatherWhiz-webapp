document.addEventListener('DOMContentLoaded', function() {

    let allinfo = document.getElementById('Allinfo');
    setTimeout(() => {
        allinfo.style.display='block';
        allinfo.classList.add('drag-right');
        let search=document.getElementById('search');
        search.classList.add('slide-up');
        this.body.style
    }, 2000);
   
});


let search=document.getElementById("butt");

function display(data){
    // Code to display current weather data
    // console.log("displaying current detail");
    // console.log(data);
    let aboutweather = document.getElementById('aboutweather');
    let weather_Icon = document.getElementById('weather-icon');
    let tempDiv = document.getElementById('temp');
    let humidity = document.getElementById('humidity');
    let windspeed = document.getElementById('windspeed');
    let visibility = document.getElementById('visibility');
    let otherinfo=document.getElementById('otherinfo');
    let daysforecast=document.getElementById('somedaysforecast');
    let Todaysun=document.querySelector(".Todaysun");
    let aboutsun=document.getElementById('aboutsun');
    let sunriseimg=document.getElementById("sunrise");
    let sunsetimg=document.getElementById("sunset");
    let clouds=document.getElementById("clouds");
    Todaysun.style.display='none';
    aboutsun.style.display='none';
    sunriseimg.style.display='none';
    sunsetimg.style.display='none';
    clouds.style.display='none';
    weather_Icon.style.display='none';
    aboutweather.innerHTML = '';
    otherinfo.style.display='none';
    humidity.innerHTML='';
    visibility.innerHTML='';
    windspeed.innerHTML='';
    // daysforecast.innerHTML='';
    tempDiv.innerHTML = '';
    // Remove existing animation classes
    aboutweather.classList.remove('fade-in');
    tempDiv.classList.remove('fade-in');
    weather_Icon.classList.remove('slide-up');

    // weather_Icon='';
    if(data.cod==='404'){
        aboutweather.innerHTML = `<p><img src="pics/error.webp" width="200" heigth="600"></p>`;
        let allinfo=document.getElementById('Allinfo');
        let divexist=document.getElementById('citynotfoud');
        if(!divexist){  //creating if no div exist
            let right=document.getElementById('right');
        right.style.display='none';
        let newdiv= document.createElement('div');
        newdiv.id="citynotfoud";
        newdiv.innerHTML = `<p>Location not found</p>`;
        newdiv.className='fade-in';
        aboutweather.classList.add('slide-up');
        allinfo.appendChild(newdiv);
        }
    }
    else{
        let right=document.getElementById('right');
        right.style.display='block';
        let divexist=document.getElementById('citynotfoud');
        if(divexist){
            let allinfo=document.getElementById('Allinfo');
            divexist.remove();

        }

        let nameofcity = data.name;
        // celsius data
        let weatherdetail = data.weather[0].description;
        let temperature = Math.round(data.main.temp - 273.15); 
        let timezoneOffset = data.timezone; // getting Timezone from data 
        let utctime=data.dt;
        let timee = new Date((utctime+timezoneOffset)* 1000); 
        let get_humidity=data.main.humidity;
        let get_visibility=data.visibility/1000; // in km
        let get_windspeed=data.wind.speed; 
        get_windspeed=((get_windspeed*3600)/1000).toFixed(3); // in km/hr upto 3 decimal place
    // date format
        let formattedDate = timee.toUTCString();
        formattedDate = formattedDate.split(' ').slice(0, 4).join(' ');

        let iconCode = data.weather[0].icon;
        let urloficon = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;


        //fetching sunrise and sunset time and display it////
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;
        
        // Convert from Unix timestamp to a readable format
        let sunriseDate = new Date((sunrise+data.timezone) * 1000);
        let sunsetDate = new Date((sunset+data.timezone) * 1000);

        sunriseimg.src=`pics/sun.png`;
        sunriseimg.alt='sun_rise';

        sunsetimg.src=`pics/sun.png`;
        sunsetimg.alt='sun_set';

        clouds.src=`pics/clouds.png`;
        clouds.alt='sun_set';
        let sunsettime=document.getElementById('sunsettime');
        let sunrisetime=document.getElementById('sunrisetime');

        // for sunrise time
        let hours = sunriseDate.getUTCHours();
        let minutes = sunriseDate.getUTCMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let sunriseDatetoput = hours + ':' + minutes + ' ' + ampm;
        // for sunset time
        let hoursforsunset = sunsetDate.getUTCHours();
        let minutesforsunset = sunsetDate.getUTCMinutes();
        let ampmforsunset = hoursforsunset >= 12 ? 'PM' : 'AM';
        hoursforsunset = hoursforsunset % 12;
        hoursforsunset = hoursforsunset ? hoursforsunset : 12; // the hour '0' should be '12'
        minutesforsunset = minutesforsunset < 10 ? '0' + minutesforsunset : minutesforsunset;
        let sunsetDatetoput=hoursforsunset+':'+minutesforsunset+' '+ampmforsunset;
       
        sunrisetime.innerHTML=sunriseDatetoput;
        sunsettime.innerHTML=sunsetDatetoput;

    
        
        // 
    
        aboutweather.innerHTML=`<p><img src="pics/pin.png" width="35" height="35">${nameofcity}</p> <p><img src="pics/calendar.png" width="35" height="35">${formattedDate}</p> <p><img src="pics/weather.png" width="40" height="40">${weatherdetail}</p>`;
        tempDiv.innerHTML=`<p>${temperature}°C</p>`;
        weather_Icon.src=urloficon;
        weather_Icon.alt=weatherdetail;
        humidity.innerHTML=`<img src="pics/humidity.png" height="25" width="25"><p> Humidity <br>${get_humidity}%</p>`;
        visibility.innerHTML=` <img src="pics/visibility.png" height="25" width="25"><p>Visibility  <br>${get_visibility} km</p>`;
        windspeed.innerHTML=`<img src="pics/windy.png" height="25" width="25"> <p> Wind Speed  <br>${get_windspeed} km/h</p>`;
        otherinfo.style.display='block';
        otherinfo.style.display='flex';
        sunriseimg.style.display='block';
        sunsetimg.style.display='block';
        clouds.style.display='block';
        Todaysun.style.display='block';
        aboutsun.style.display='block';
            // Add animation classes
        Todaysun.classList.add('drag-right');
        aboutsun.classList.add('slide-up');
        otherinfo.classList.add('slide-up');
        otherinfo.children[0].classList.add('drag-left');
        otherinfo.children[1].classList.add('drag-left');
        otherinfo.children[2].classList.add('drag-left');
        sunriseimg.classList.add('drag-up');
        sunrisetime.classList.add('fade-in');
        sunsettime.classList.add('fade-in');
        clouds.classList.add('drag-right');
        let humidityid=document.getElementById('humidity');
        let visibilityid=document.getElementById('visibility');
        let windid=document.getElementById('windspeed');
        humidityid.classList.add('fade-in');
        visibilityid.classList.add('fade-in');
        windid.classList.add('fade-in');
        aboutweather.classList.add('fade-in');
        tempDiv.classList.add('fade-in');
        weather_Icon.classList.add('slide-up');


    
        weather_Icon.style.display = 'block'; // makes the image visible 
        // console.log(data);
        return timezoneOffset;
    }
}
function displaynext4days(data,timezoneoflocation){
    let fourdaysclass=document.querySelector(".fourdays");
    let nextfourdays = document.getElementById('nextfourdays');
    let grid_item=document.querySelectorAll(".grid-item");

    fourdaysclass.style.display='none';
    nextfourdays.style.display='none';
    // console.log(data);

   if (!data) { // If data is empty
    return;
    }

    let dailyWeather = {}; // Object to store weather data for each day

    // Process the forecast data
    data.forEach(item => {
        
        // Adjust the time by manually applying the timezone offset
        let dateTime = new Date((item.dt + timezoneoflocation) * 1000); // Correctly adjusted to local time
        
      
        let year = dateTime.getUTCFullYear();
        let month = (dateTime.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth is zero-based
        let day = dateTime.getUTCDate().toString().padStart(2, '0');
        let dateStr = `${year}-${month}-${day}`; // YYYY-MM-DD format
        
       //used javascript internationalization api
        let weekdayOptions = { weekday: 'long', timeZone: 'UTC' }; 
        let weekday = new Intl.DateTimeFormat('en-US', weekdayOptions).format(dateTime);
        // Convert temperature from Kelvin to Celsius and round it
        let temperature = Math.round(item.main.temp - 273.15);
        let weatherDescription = item.weather[0].description;
        let iconCode = item.weather[0].icon;
    
        // Initialize the array and weather count for the date if not already present
        if (!dailyWeather[dateStr]) {
            dailyWeather[dateStr] = {
                day: weekday,
                temps: [],
                weatherCount: {},
                weatherIcons: {}
            };
        }
    
        // Push the temperature to the corresponding date's array
        dailyWeather[dateStr].temps.push(temperature);
    
        // Count occurrences of each weather description
        if (!dailyWeather[dateStr].weatherCount[weatherDescription]) {
            dailyWeather[dateStr].weatherCount[weatherDescription] = 0;
        }
        dailyWeather[dateStr].weatherCount[weatherDescription]++;
    
        // Store the icon for the weather description
        dailyWeather[dateStr].weatherIcons[weatherDescription] = iconCode;
    });
    
    let finalData = {};

    // Calculate min, max, and most frequent weather for each date
    for (let dateStr in dailyWeather) {
        let temps = dailyWeather[dateStr].temps;
        let weatherCount = dailyWeather[dateStr].weatherCount;
        let weatherIcons = dailyWeather[dateStr].weatherIcons;
        
        // Find the most frequent weather description and its corresponding icon
        let mostFrequentWeather = '';
        let mostFrequentIcon = '';
        let maxCount = 0;
        for (let weather in weatherCount) {
            if (weatherCount[weather] > maxCount) {
                maxCount = weatherCount[weather];
                mostFrequentWeather = weather;
                mostFrequentIcon = weatherIcons[weather]; // Get the icon corresponding to the most frequent weather
            }
        }
    
        finalData[dateStr] = {
            day: dailyWeather[dateStr].day,
            minTemp: Math.min(...temps),
            maxTemp: Math.max(...temps),
            mostFrequentWeather: mostFrequentWeather,
            icon: mostFrequentIcon // Add the icon code to the final data
        };
    }
    
    // Sort finalData by date (keys)
    let sortedFinalData = Object.keys(finalData)
        .sort()
        .reduce((obj, key) => {
            obj[key] = finalData[key];
            return obj;
        }, {});
    
    console.log(sortedFinalData);

    
    let child = 0;
    for (let y in sortedFinalData) {
        if (child >= 20) {
            break;
        }
    
        
        let dayData = sortedFinalData[y];
    
        let mintempget = dayData.minTemp;
        let maxtempget = dayData.maxTemp;
        let mostFrequentget = dayData.mostFrequentWeather;
        let iconcode = dayData.icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconcode}.png`;
        let day = dayData.day;
    
        // Populate the nextfourdays container
        nextfourdays.children[child++].innerHTML = `<span>${day}</span>`;
        nextfourdays.children[child++].innerHTML = `<img src="${iconUrl}" alt="Hourly Weather Icon">`;
        nextfourdays.children[child++].innerHTML = `<span>${mostFrequentget}</span>`;
        nextfourdays.children[child++].innerHTML = `<span class="temp">${mintempget}/${maxtempget}°C</span>`;
    }
      
    fourdaysclass.style.display='block';
    nextfourdays.style.display='block';

    nextfourdays.style.display='grid';
    fourdaysclass.classList.add('drag-right');
    nextfourdays.classList.add('fade-in');
    for(k of grid_item){
        k.classList.add('slide-up');
    }

  

}
function displayabout24hrs(data,timezoneOffset){// gets an array
     // Find the element with the ID 'hourly-forecast'
    //  console.log(data);
    // console.log("timezone");
    // console.log(timezoneOffset);

     let dayinfo = document.getElementById('dayinfo');
     let Upcoming24hr=document.querySelector(".Upcoming24hr");
     dayinfo.style.display='none';
     Upcoming24hr.style.display='none';
     let hourlyinfo=document.querySelectorAll(".hourly-item"); //gives the array of all child
     for(let k of hourlyinfo){
        k.innerHTML='';
        
    }
     if(!data){ // if empty
        return;
    }
    // console.log(data);
    // Select the first 8 item (covering the next 24 hours in 3-hour intervals)
    let next24Hours = data.slice(0, 8);
    let divcount=0;
  
     next24Hours.forEach(item => {
        if (dayinfo.children[divcount]) {
            
         // Convert timestamp to a Date object
        //  console.log("neeche");
        //  console.log(item);
         let dateTime = new Date((item.dt+timezoneOffset)* 1000);
         let hours = dateTime.getUTCHours();
         let minutes = dateTime.getUTCMinutes();
         let ampm = hours >= 12 ? 'PM' : 'AM';
         hours = hours % 12;
         hours = hours ? hours : 12; // the hour '0' should be '12'
         minutes = minutes < 10 ? '0' + minutes : minutes;
     
         
         let formattedTime = hours + ':' + minutes + ' ' + ampm;
         // Convert temperature from Kelvin to Celsius and round it
         let temperature = Math.round(item.main.temp - 273.15);
         // Get the weather icon code
         let iconCode = item.weather[0].icon;
         // Create the URL for the weather icon
         let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
 
         // Create HTML for this hourly item
         let hourlyItemHtml = `
             
                 <span>${formattedTime}</span>
                 <img src="${iconUrl}" alt="Hourly Weather Icon">
                 <span>${temperature}°C</span>
         `;
 
         // Add the HTML to the 'hourly-forecast' element
         dayinfo.children[divcount].innerHTML += hourlyItemHtml;
         divcount++;
        }
    });
         Upcoming24hr.style.display='block';
         
         let screenwidth=window.screen.width;
        //  console.log(screenwidth);
         if(screenwidth>768){
            dayinfo.style.display='block';
            dayinfo.style.display='flex';
         }
         else{
            dayinfo.style.display='grid';

         }
    

         Upcoming24hr.classList.add('drag-right');
         dayinfo.classList.add('slide-up');
         let hourlynfo=document.querySelectorAll(".hourly-item"); //gives the array of all child
         for(let k of hourlynfo){
            k.classList.add('drag-right');
            
        }
}
document.getElementById('geolocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        // geolocation api
        navigator.geolocation.getCurrentPosition(picked, error); //callback
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});
let latitude=-1;
let longitude=-1;
function picked(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    let input=document.getElementById('City');
    input.value='';
    getweather();
    latitude=-1;
    longitude=-1;

}
function error() {
    alert('Unable to retrieve your location.');
}
function getweather(){
    let apikey='0f63912f3fa28abba0b8670db38f0fc0';
    let city;
    let currentWeatherUrl;
    let forecastUrl;
    if(latitude===-1&&longitude===-1){
    city=document.getElementById('City').value;
    currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
    }
    else{
        currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
        
    }
    if (city||latitude!=-1&&longitude!=-1) {
        let timezoneoflocation;
        
      
    // now fetching the data
    fetch(currentWeatherUrl)
    .then(response => response.json()) //converting in json
    .then(data => {
        timezoneoflocation=display(data); // to diplay
    })
    .catch(error => {
        console.error('Error occured while fetching the data:', error);
        alert('Unable to load the data. Please try again.');
    });
    //   Fetching the forecast data
    fetch(forecastUrl)
      .then(response => response.json()) // Converting to JSON
      .then(data => {
          displayabout24hrs(data.list,timezoneoflocation); // To display forecast
          displaynext4days(data.list,timezoneoflocation);
      })
      .catch(error => {
          console.error('Error occurred while fetching the forecast data:', error);
          alert('Unable to load the forecast data. Please try again.');
      });
    }
    else{
        alert('Please enter a location');
        return;

    }
}

search.addEventListener("click",getweather);
