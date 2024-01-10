
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weathercode')

const app = express()

//Define paths for Express Config
const pulicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(pulicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Nyree Larkins'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'Nyree Larkins'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'Please email us for more helpful tips and feedback',
        name: 'Nyree Larkins'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please enter an address'
        })
    } 
    
    geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            } 
            res.send({
                forcast: forecastData,
                location,
                address: req.query.address
            })
            
        })
            
    })
    
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Nyree Larkins'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Page not found.',
        name: 'Nyree Larkins'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
