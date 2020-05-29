// fetch weather forecast
const url = '/weather?address=';

// get search form
const weatherForm = document.querySelector('.weather-search');
const search = document.querySelector('input');

// html to display data
const loc = document.getElementById('city');
const forecast = document.getElementById('forecast');
const para = document.getElementById('conditions');
const photo = document.getElementById('photo');
const caption = document.getElementById('photo-caption');

// access user input to get weather data from browser
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  // clear the browser display
  loc.textContent = '';
  forecast.textContent = '';
  photo.textContent = '';
  caption.textContent = '';
  para.textContent = 'Loading...';


  fetch(url+location).then(response => {
    response.json().then(data => {
      if (data.error) {
        document.getElementById('conditions').innerHTML = data.error;
      } else {
        // location
        const city = data.location;
        const citySubStr = city.substring(0, city.lastIndexOf(','));
        loc.innerHTML = citySubStr;

        // forecast
        forecast.innerHTML = data.forecast;
        para.innerHTML = data.conditions;

        // unsplash photo
        // create IMG element
        const imgEl = document.createElement('IMG');
        // set IMG src attribute
        imgEl.setAttribute('src', data.src);
        photo.appendChild(imgEl);
        caption.innerHTML = 'Enjoy a random photo from your location. (Courtesy of Unsplash)';
      } // end else
    }); // end 2nd .then() call
  }); // end 1st .then() call
}); // end addEventListener
