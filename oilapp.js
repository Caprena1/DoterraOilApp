const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')

const app = express()

//SET MY VIEWS ENGINE
app.set('views', './views')
app.set('view engine', pug)

//SETTING USE FOR BODY
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/images', express.static('public'))
app.use('styles', express.static('styles'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/oils', db.getOils)


app.post('/oils', db.createOil)

app.put('/oils', db.updateOil)
app.delete('/oils', db.deleteOil)



app.listen(3000)
