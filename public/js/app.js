console.log('Client side javascript file is loaded.')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const dataForUi = document.querySelector('#data')
const message = document.querySelector('#message')


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = search.value
    getWeatherinfo(location, (error, data)=>{
        if(error){
            message.textContent = error
            dataForUi.textContent = ''
        } else{
            message.textContent = 'Please find the weather details below : '
            dataForUi.textContent = JSON.stringify(data)
     }
    })
})

function getWeatherinfo(address, callback){

    fetch(`http://localhost:8000/weather?address=${address}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            return callback(data.error, undefined)
        }else{
            return callback(undefined, data)
        }
    
    })
})
}