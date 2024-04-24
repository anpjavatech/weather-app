import { json } from "express"
import request from "request"
const apiKey = '15e19a1ab8c06fb149517ba3578cfe7d'

// openweathermap.org
export default function forecastWeather(address, callback){

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&APPID=${apiKey}`
    request({url, json:true}, (error, data)=>{
        const responseBody = data.body;
        if(error){
            callback('Unable to connect to location service.', undefined)
        }else if(responseBody.cod === '404'){
            callback('Unable to find the location. Try another search.', undefined)
        }else {
            callback(undefined, {
                forecat:responseBody.weather[0].main,
                temprature: responseBody.main.temp,
                feelsLike: responseBody.main.feels_like,
                humidity: responseBody.main.humidity,
                placeName:responseBody.name
            })
        }
    })

} 