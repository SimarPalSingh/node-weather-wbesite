const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// DEfine paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')

//created 2 folders on templates
// this one is for views
const viewPath = path.join(__dirname, '../templates/views')
// this one is for partials --  can be reused in mulitple pages
const partialsPath = path.join(__dirname, '../templates/partials')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

// setup handle bar engines and views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath) // takes a path to the diretory where the partials live

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Simar'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Simar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Simar Pal Singh',
        helpText: 'This is the Help Page',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Enter an Address to search for the weather'
        })
    }

    // update : passing default object in case error occurs deu to no location
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Simar Singh',
        errorMessage: 'Help article not found'
    })
})

// using wildcard character to setup route handler for a 404 page 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Simar Singh',
        errorMessage: '404 not found'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('app listening on port 3000')
})