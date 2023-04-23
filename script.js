const wrapper = document.querySelector(".wrapper"),
    inputPart = document.querySelector(".input-part"),
      infoTxt = inputPart.querySelector(".info-txt"),
   inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
        wIcon = weatherPart.querySelector("img"),
    arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Tarayıcınızın coğrafi konumu api'yi desteklemiyor");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=your_api_key`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=your_api_key`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Hava durumu ayrıntıları alınıyor...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Bir şeyler yanlış gitti";
        infoTxt.classList.replace("pending", "error");
    });
}
