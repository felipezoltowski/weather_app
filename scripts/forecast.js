class Forecast {
    constructor(){
        this.key = 'dqEJMg3cUL3BAdAjQKF6hPJkbF0OvnAG';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/'
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    }
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
    
        //Object shorthand notation
        return { cityDetails, weather }
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`
        const response = await fetch(this.cityURI+query)
        const data = await response.json();
        return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;    
        const response = await fetch(this.weatherURI+query)
        const data = await response.json();
        return data[0];
    }
}

//fake call to check values
/*
getCity('manchester').then(data => {
    return getWeather(data.Key);
})
.then(data => console.log(data))
.catch(err => console.log(err));
*/