//This will contain all of DOM Manipulation
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');
const updateUI = (data) => {


    // const cityDet = data.cityDet;
    // const weather = data.weatherDet;
    
    //Destructuring
    const {cityDet , weatherDet}=data;

    //Update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDet.EnglishName}</h5>
        <div class="my-3">${weatherDet.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weatherDet.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    //Update night/day and icon images
    const iconSrc=`img/icons/${weatherDet.WeatherIcon}.svg`
    icon.setAttribute('src',iconSrc);

    let timeSrc= weatherDet.IsDayTime ?'img/day.svg':'img/night.svg'; 
    time.setAttribute('src',timeSrc);

    //removing d-none class if present
    if(card.classList.contains('d-none'))
    {
        card.classList.remove('d-none');
    }


};
const updateCity = async (city) => {

    const cityDet = await getCity(city);
    const weatherDet = await getweather(cityDet.Key);

    // return {
    //     citydetails:cityDet,
    //     weatherdetails:weatherDet   //Returning an object
    // }
    return { cityDet, weatherDet }; //Object shorthand notation can be used when property and value name looks exactly same
};
cityForm.addEventListener('submit', e => {
    //preventing default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city).then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    });
});