//This will have all javascript responsible for interacting with weather API and getting data (AccuWeather API)


//The idea behind the creating of an app is so that we can get an API key from the API Service
// When we make requests to an API that API is going to give some kind of API key so that when we made the request we send this with
// the request and when it reaches their servers they know who made the request and which application is making it 

// Now  when we are requesting data from the endpoints to this API we have to do this to two different things:
// First we need to make a request to certain endpoint to get city information and in that city information is going to be a city code
// So once we have that we are going to use that city code to make a second request to a weather conditions API endpoints to get weather conditon in that area. So we need to make 2 requests to two different endpoints

const key='K9HBdjgT6hzizKwQRSYGlsADOtTWHyJq';

//get weather information
const getweather=async (id)=>{

    const base='http://dataservice.accuweather.com/currentconditions/v1/';
    const query=`${id}?apikey=${key}`;
    const response=await fetch(base+query);
    const data =await response.json();
    return data[0]; //returning object 

};


// get city information
const getCity= async (city)=>{
    const base='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query=`?apikey=${key}&q=${city}`;    //Giving query parameter
    const response =await fetch(base+query);
    const data=await response.json();
    return data[0]; //Taking the closest match
};
