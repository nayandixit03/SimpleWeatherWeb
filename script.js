const inputBox=document.querySelector('.input-box');
const searchBtn=document.getElementById('searchBtn');
const sunBtn=document.getElementById('sunBtn');
const moonBtn=document.getElementById('moonBtn');
const weather_img=document.querySelector('.weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');
const humidity=document.getElementById('humidity');
const wind_speed=document.getElementById('wind-speed');
const location_not_found=document.querySelector('.location-not-found');
const weather_body=document.querySelector('.weather-body')

async function checkWeather(city)
{
    const api_key="b3b4ea5c54312eac20a5f54fc0590a82";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`; 
    
    //fetch fuc =jo url se request lake dega jo data parse kerega jo ki json hoga usko string me convert ker ke dega 
    //await is liye taki ek bar me sar data store kerwa lungi
   const weather_data=await fetch(`${url}`).then(response=>response.json());
    //console.log(weather_data);
   
    if(weather_data.cod===`404`){
        location_not_found.style.display="flex";
        weather_body.style.display="none";
        //console.log(error);
        return;
    }
    location_not_found.style.display="none";
    weather_body.style.display="flex";
    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind_speed.innerHTML=`${weather_data.wind.speed} Km/H`;

    //different image
    switch(weather_data.weather[0].main){
        case 'Clouds':
             weather_img.src="/assets/cloud.png";
             break;
        case 'Clear':
         weather_img.src="/assets/clear.png";
          break;
        case 'Rain':
        weather_img.src="/assets/rain.png";
        break;
        case 'Mist':
         weather_img.src="/assets/mist.png";
         break;
        case 'Snow':
        weather_img.src="/assets/snow.png";
        break;
      
    }
}

searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
});



// Execute a function when the user presses a key on the keyboard
inputBox.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    checkWeather(inputBox.value);
  }
});

function darkMode() {
    let element = document.body;
    let contu=document.container;
    
    
    element.className = "dark-mode";
    contu.className="dark-mode";
   
}
function lightMode() {
    let element = document.body;
     //let =document.querySelector('container');
    element.className = "light-mode";
    

}
sunBtn.addEventListener('click',()=>{
     darkMode();
});


moonBtn.addEventListener('click',()=>{
    lightMode();
});




