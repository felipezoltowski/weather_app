const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

    // old way by manually assigning properties
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // destructure properties(modern)
    // works only for props with same name
    const { cityDetails, weather } = data;

    // update details template
    details.innerHTML = `
        <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
            </div>
        </div>
    `;

    // update night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    //ternary operator
    let timeSrc = weather.isDayTime ? 'img/day.svg': 'img/night.svg';

    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    //Object shorthand notation
    return { cityDetails, weather }

}

cityForm.addEventListener('submit', e => {
    //prevent defaul action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});