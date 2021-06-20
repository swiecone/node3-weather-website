const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//app.com 

// Define paths for Express config 
const staticURL = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// console.log(viewsPath)

// Setup handlebars engine and view location  
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(staticURL))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Alex',
        author: 'Alex',
        year: 2020
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alex',
        author: 'Alex',
        year: 2020
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Alex',
        year: 2020
    })
})



app.get('/me', (req, res) => {
    res.send({
        name: 'Alex', 
        Age: 40 
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "An address must be provided"
        })
    }

    // const address = req.query.address

    const {address} = req.query 

    geocode( address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
             res.send({ error })
        }
        else {
            forecast(latitude, longitude, (error, {forecast} ) => {
                if (error) {
                    return res.send({ error })
                }
                else {
                    res.send({
                   address,
                   forecast,
                   latitude,
                   longitude, 
                   location
                })  
            }
            })


               
        }

    })

    // geocode( req.query.address, (error, data) => {
    //     console.log(data)
    //     if (error) {
    //         return send.res({
    //             error: "An error occured"
    //         })
    //     }
    //     else {
    //         send.res({
    //             data: data 
    //         })
    //     }
    // })

 

})

app.get('/products', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }


    console.log(req.query.search) 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Page not Found',
        text: 'Sorry dude, we did not find that help article.  Here you can find more articles.',
        author: 'Alex',
        year: 2020
    })})

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Page not Found',
        text: 'Sorry dude, you got yourself into a 404.',
        author: 'Alex Swiec',
        year: 2021
    })})


app.listen(port, () => {
    console.log("Server is up on port "+ port)
})