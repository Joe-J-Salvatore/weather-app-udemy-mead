// fetch weather forecast
const url = 'http://localhost:3000/weather?address=';
// unsplash photo API
const access_key = 'cPlfRcFWfrcEgMSxtxDGX-AcTtwvp5HFhfSMjG_n6Dw';
const secret_key = 'ij3ulntj_w9hZm65bZooFMs1Thigd-KVUh5Gi8UrDjA';
// get search form
const weatherForm = document.querySelector('.weather-search');
const search = document.querySelector('input');
const loc = document.getElementById('city');
const forecast = document.getElementById('forecast');
const para = document.getElementById('conditions');
//const iconDiv = document.getElementById('icon');
const photo = document.getElementById('photo');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  loc.textContent = '';
  forecast.textContent = '';
  para.textContent = 'Loading...';
  photo.textContent = '';

  fetch(url+location).then(response => {
    response.json().then(data => {
      if (data.error) {
        document.getElementById('conditions').innerHTML = data.error;
      } else {
        // location
        const city = data.location;
        const citySubStr = city.substring(0, city.lastIndexOf(','));
        loc.innerHTML = citySubStr;
        // icon start
        // const icon = document.createElement("IMG");
        // icon.setAttribute('src', data.icon);
        // iconDiv.appendChild(icon);
        // forecast
        forecast.innerHTML = data.forecast;
        para.innerHTML = data.conditions;

      }
    });
  });
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${location} skyline&orientation=landscape&page=1&client_id=${access_key}`;
  fetch(unsplashUrl).then(response => {
    response.json().then(data => {
      const pic = document.createElement('IMG');
      pic.setAttribute('src', data.results[0].urls.regular);
      photo.appendChild(pic);
    });
  });

});
