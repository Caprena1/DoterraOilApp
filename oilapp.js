const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()

//SET MY VIEWS ENGINE
app.set('views', './views')
app.set('view engine', 'pug')

//SETTING USE FOR BODY
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/images', express.static('public'))
app.use('/styles', express.static('styles'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/oils', db.getOils)
app.get('/oils/:id', db.getOilByID)
app.get('/oilByName/:name', db.getOilByName)

app.post('/oils', db.createOil)
app.post('/oilByName/:name', db.getOilByName)

app.put('/oils', db.updateOil)

app.delete('/oils', db.deleteOil)



app.listen(3000)
