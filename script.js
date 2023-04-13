
const container = document.querySelector('.container');
const weatherCardContainer = document.querySelector('.weather-card-container');
const formContainer = document.querySelector('.form-container');

async function getWeather(location) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=403319d353a1451297b182340231104&q=${location}&aqi=no`, { mode: 'cors' })
    const json = await response.json();
    
    const jsonHasError = Object.keys(json)[0] === 'error' ? true : false
    if (jsonHasError) {
      throw new Error(json.error.message)
    }

    return json
  } catch(error) {
    const errorMessage = document.createElement('div')
    errorMessage.textContent = `${error} (You probably didn't enter a location in the box)`

    const errorImg = document.createElement('img');
    errorImg.src = './burning.gif'
    weatherCardContainer.appendChild(errorImg)

    weatherCardContainer.appendChild(errorMessage)
    console.log(error)
  }
}

function createWeatherObj(locationJSON) {
  const region = locationJSON.location.region
  const location = locationJSON.location.name
  const iconSrc = locationJSON.current.condition.icon
  const clouds = locationJSON.current.condition.text
  const tempF = locationJSON.current.temp_f
  const tempC = locationJSON.current.temp_c

  return { region, location, iconSrc, clouds, tempF, tempC }
}

function addWeatherCard(weatherObj) {
  const weatherIcon = document.createElement('img')
  weatherIcon.classList.add('weather-icon');
  weatherIcon.src = weatherObj.iconSrc

  const region = document.createElement('div')
  region.textContent = `Region: ${weatherObj.region}`

  const location = document.createElement('div')
  location.textContent = `City ${weatherObj.location}`

  const clouds = document.createElement('div')
  clouds.textContent = `Clouds: ${weatherObj.clouds}`

  const tempF = document.createElement('div')
  tempF.textContent = `Tempterature F ${weatherObj.tempF}`

  const tempC = document.createElement('div')
  tempC.textContent = `Tempterature C ${weatherObj.tempC}`

  container.prepend(weatherCardContainer);
  weatherCardContainer.appendChild(weatherIcon);
  weatherCardContainer.appendChild(region);
  weatherCardContainer.appendChild(location);
  weatherCardContainer.appendChild(clouds);
  weatherCardContainer.appendChild(tempF);
  weatherCardContainer.appendChild(tempC);
}

function addForm() {
  const instructionText = document.createElement('div');
  instructionText.textContent = 'Where would you like to know the weather? For best results, use a ZIP code!';

  const locationFieldLabel = document.createElement('label');
  locationFieldLabel.for = 'location-field-label';
  locationFieldLabel. textContent = 'Enter Your Desired Location Below';

  const locationField = document.createElement('input');
  locationField.type = 'text';
  locationField.id = 'location-field';

  const submit = document.createElement('button');
  submit.classList.add('submit-btn')
  submit.textContent = 'Get Weather!'

  container.appendChild(formContainer);
  formContainer.appendChild(instructionText);
  formContainer.appendChild(locationFieldLabel);
  formContainer.appendChild(locationField);
  formContainer.appendChild(submit);
}

formContainer.addEventListener('click', (event) => {
  if (event.target.className == 'submit-btn') {
    removeAllChildNodes(weatherCardContainer);
    const locationField = document.getElementById('location-field');
    createWeatherCard(locationField.value);
    locationField.value = ''
  }
})

function createWeatherCard(location) {
  getWeather(location).then((response) => {
    let newObj = createWeatherObj(response);
    console.log(newObj)
    addWeatherCard(newObj);
  })
}

function removeAllChildNodes(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  };
};


document.body.onload = function() {
  const homeImg = document.createElement('img');
  homeImg.src = './weather.gif'
  weatherCardContainer.appendChild(homeImg)

  addForm();
}