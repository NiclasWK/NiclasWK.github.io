let weather = {
    apiKey: "be962b9f7eabe316a988c9e5b392b387",

    fetchWeather: function(city){
        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&appid=" 
        + this.apiKey 
        + "&lang=da&units=metric")

        .then(handleErrors)
        .then((respone) => respone.json())
        .then((data) => {
            this.displayWeather(data)
            document.getElementById("error").innerHTML = "";
        })   
        .catch(error => {
            document.getElementById("error").innerHTML = "<span style = 'color: red;'>" + "Sted ikke fundet" + "</span>";
        });        
    },

    displayWeather: function(data) {
        const {name} = data;
        const {main, icon, description} = data.weather[0];
        const {temp, humidity } = data.main;
        const {speed} = data.wind;
        console.log(name, icon, temp, humidity, speed)
        document.querySelector(".by").innerText = "Vejret i " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".beskrivelse").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".luftfugtighed").innerText = "Luftfugtighed: " + humidity + "%";
        document.querySelector(".vind").innerText = "Vind: " + speed + " km/t";
        document.querySelector(".weather").classList.remove("loading")
        document.querySelector(".title").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + main + "')"
    },
        search: function() {
                this.fetchWeather(document.querySelector(".search-bar").value);
        }
};

document.querySelector(".search button").addEventListener("click",
 function() {
    weather.search();
 });

 document.querySelector(".search-bar").addEventListener("keyup", function(event){
        if(event.key == "Enter") {
            weather.search();
        }
 });

 