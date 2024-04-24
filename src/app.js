import express, { query } from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import hbs from 'hbs'
import forecastWeather from './utils/forecast.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') // to render the dynamic pages.
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Anoop.KS'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        helpText:'This is some help text',
        title: 'Help',
        name: 'Anoop.KS'
    })
})

app.get("/about", (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Anoop.KS'
    })
})

app.get('/weather', (req, res) =>{
    
    const address = req.query.address
    if(!address){
        return res.render('weather',{
            error:'You must send an address property as a query string.'
        })
    }

    forecastWeather(address, (error, data)=>{
        if(error){
            return res.send({error})
        }

        res.send(data)
    })
    
})

app.get('/help/*', (req, res) =>{
    res.render('error', {
        title:'Error Page',
        message:'Help article not found.',
        name: 'Anoop.KS'
    })
})

app.get('*', (req, res) =>{
    res.render('error', {
        title:'Error Page',
        message:'Page Not Found',
        name: 'Anoop.KS'
    })
})

app.listen(8000, ()=>{
    console.log("Sever is up and running !.")
})