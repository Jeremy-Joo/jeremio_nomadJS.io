const API_KEY = "48c1389ac00e4ef1d5d0058631e8f015"; 
const SEOUL_LATITUDE = 37.5665; 
const SEOUL_LONGITUDE = 126.978;

function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${SEOUL_LATITUDE}&lon=${SEOUL_LONGITUDE}&appid=${API_KEY}&units=metric`;
    
    fetch(url) 
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(`Error: ${errorData.message}`); 
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); 
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}°C`; 
      })
      .catch((error) => {
        console.error(error);
        alert("날씨 정보를 가져오는 데 오류가 발생했습니다: " + error.message);
      });
}


window.onload = () => {
  getWeather();
};
