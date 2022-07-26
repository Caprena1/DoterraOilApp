const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
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
app.use(cookieParser())

// app.use('*', (req, res, next) => {
//     if(req.cookies.username) {   //SAYING REQ A COOKIE - TAKE THE USERNAME FROM THE COOKIES(PLURAL)-BUILD IN AS PLURAL, BUT NOT ALWAYS
//         next()
//     } else {
//       res.send('Sorry, please sign in first')
//     }
// })

// let Users = {} //LEAVE EMPTY JUST TO CREATE VARIABLE

app.get('/', (req, res) => {  
    res.render("index")   
})

// app.get('/signup', (req, res) => {
//     res.render("index")
// })

// app.get('/login', (req, res) => {
//     res.render("index")
// })
// app.get('/logout', (req, res) => {
//     res.clearCookie('username')
//     res.render("index")  
    
// })

app.get('/oils', db.getOils)
app.get('/oils/:id', db.getOilByID)
app.get('/getoilByName/:name', db.getOilByName)
app.get('/getoilByCondition/:uses', db.getoilByCondition)

// app.post('/signup', (req, res) => {
//     Users[req.body.username] = req.body.password
//     res.cookie('username',req.body.username ) //GO INTO CONSOLE-CLICK ON APPLICATION AND SEE IF I GOT A COOKIE
//     res.send('Thanks for signing up!')
// })
// app.post('/login', (req, res) => {
//     //MAKE SURE WE HAVE THAT USERNAME
//     let savedPassword = Users[req.body.username]
//     let enteredPassword = req.body.password
//     // console.log(savedPassword, enteredPassword)
//     if(savedPassword === enteredPassword){
//         res.cookie('username', req.body.username)
//         res.send("You are now signed in")
//     } else {
//         res.send('Sorry, invalid username or password')
//     }
// })
app.post('/oils', db.createOil)
app.post('/oilByName/:name', db.getOilByName)

app.put('/oils', db.updateOil)

app.delete('/oils', db.deleteOil)

//ADD FUZZY SEACH ONTO GET OILS ENPOINT FOR 'SEARCH BY CONDITION'
app.get('/oilByName', (req, res) => {
    const name = req.query.name
    console.log(req.query)
    fetch(`http://localhost:3000/getoilByName/${name}`)
    .then((response) => response.json())
    .then((resJson) => {
        console.log(resJson)
        
        res.render('oildisplay', {oils: resJson})
    })
    .catch((err) => console.log(err)) 
})

   

app.get('/oilByCondition', (req, res) => {
    const uses = req.query.uses
    console.log(req.query)
    fetch(`http://localhost:3000/getoilByCondition/${uses}`)
    .then((response) => response.json())
    .then((resJson) => {
        console.log(resJson)

        res.render('oildisplay', {oils: resJson})
    })
   
    .catch((err) => console.log(err)) 

})

app.listen(3000)
//similiar to oilbyname
//show more than one oil
//query will be the key and the challenge



 // if(req.query) {
    //     const regex = new RegExp(escapeRegex(search), 'gi')
    //     //Get all oils from DB
    //     oils.find({"uses": regex}, function(err, searchOils){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             if(allOils.length <1) {
    //                 const noMatch = "No oils match that query, please try again."
    //             }
    //             res.render("oils/index", {oils: searchOils})
    //         }
    //     })
    // }



// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
// };
