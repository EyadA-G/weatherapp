import React, {useState} from "react";

const api = {
  key: "8e6609697ff29376cac963b98e905c70",
  base: "https://api.openweathermap.org/data/2.5/",
}

/*fetch (`${api.baseF}forecast?q=${queryF}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeatherF(result);
          setQueryF('');
          console.log(result)
        });  */     
function App() {

  const [query, setQuery] = useState('');
  const [queryF, setQueryF] = useState('');
  const [weather, setWeather] = useState('');
  const [weatherF, setWeatherF] = useState('');

  const search = evt => {
    if (evt.key === "Enter"){
      var inputVal = document.getElementById("myInput").value;
      fetch (`${api.base}weather?q=${inputVal}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        });
    }  
  }
  const getinputVal = getinputval =>{
    var inputVal = document.getElementById("myInput").value;
    console.log(inputVal)
    fetch (`${api.base}forecast?q=${inputVal}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeatherF(result);
          setQueryF('');
          console.log(result)
        });
  }
  
  

  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] 
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="searchBox">
          <input 
            type="text"
            className="searchBar"
            placeholder="Search..."
            onKeyPress={search}
            id="myInput"
          />
        <div className="button">
          <button
            className="button1"
            onClick = {getinputVal}
          ></button>
        </div>  
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="locationBox">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weatherBox">
            <div className="feels_like">Feels like {Math.round(weather.main.feels_like)}°c</div>
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
          <div> forcast: {weatherF.list[0].weather[0].description}</div>
        </div>

        ) : ('')}
        
        
      </main>
    </div> 
  );
}


export default App;
