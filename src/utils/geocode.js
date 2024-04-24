import { json } from "express"
import request from "request"
const apiKey = '66278c881690a498072235qpn8be70d'

// using the geocode.map.co
export default function geocode(address, callback){

    const url = `https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`
    request({url, json:true}, (error, data)=>{
        const responseBody = data.body;
        if(error){
            callback('Unable to connect to location service.', undefined)
        }else if(responseBody.length === 0){
            callback('Unable to find the location. Try another search.', undefined)
        }else {
            callback(undefined, {
                latitude:responseBody[0].lat,
                longitude: responseBody[0].lon,
                placeName:responseBody[0].display_name
            })
        }
    })

} 