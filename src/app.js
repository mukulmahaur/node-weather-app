const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

var app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Mukul Mahaur'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Mukul Mahaur'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is the message i am sending to show in a paragraph',
        title:'Help Page',
        name:'Mukul Mahaur'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'No address sent'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({error:'Some error occured while getting address'})
        } else {
            forecast(latitude, longitude, (error, foreData) => {
                if (error) {
                    return res.send({error:'Some error occured while getting weather details'})
                }
                return res.send({
                        location,
                        forecast: foreData,
                        address: req.query.address                    
                })
            })
        }
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error:'Some error occured'
        })
    }
    res.send({
        location:'Philedelphia',
        forecast:'Snowing here'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'Help Article not Found',
        title:'Help Error Page',
        name:'Mukul Mahaur'
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        message:'Page Not Found',
        title:'Error Page',
        name:'Mukul Mahaur'
    })
})

app.listen(port,()=>{
    console.log(`Server is up at port ${port}`)
})