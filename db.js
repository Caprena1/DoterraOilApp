const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const dev = require('./dev.js')
const Pool = require('pg').Pool
const pool = new Pool(dev)
const tsquery = require('pg-tsquery')
 
//GET THE USERS
const getOils = (request, response) => {
    pool.query('SELECT * FROM oils ORDER BY id', (error, results) => {
        if(error){
            console.log(error)
        }
        response.status(200).json(results.rows)
    })
}

const getOilByID = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM oils WHERE id = $1', [id], (error, results) => {
        if(error) {
            console.log(error)
        }else {
            response.status(200).json(results.rows)
        }
    })
}

const getOilByName = (request, response) => {
    const name = request.params.name
    
    pool.query('SELECT * FROM oils WHERE name = $1', [name], (error, results) => {
        if(error) {
            console.log(error)
        }else {
            response.status(200).json(results.rows)
        }
    })
}

const getoilByCondition = (request, response) => {
    const uses = request.params.uses
    
    pool.query('SELECT * FROM oils WHERE uses LIKE %uses% = $1', [uses], (error, results) => {
        if(error) {
            console.log(error)
        }else {
            response.status(200).json(results.rows)
        }
    })
}

const createOil = (request, response) => {
    const oilName = request.body.name
    const oilImg = request.body.imagelink
    const oilDescrip = request.body.description
    const oilUses = request.body.uses
    const oilWhole = request.body.wholesale
    const oilRetail = request. body.retail

    pool.query('INSERT INTO oils (name, imagelink, description, uses, wholesale, retail) VALUES ($1, $2, $3, $4, $5, $6)', [oilName, oilImg, oilDescrip, oilUses, oilWhole, oilRetail], (error, results) => {
        if(error){
            console.log(error)
        }else {
            response.status(201).send(`Entry added with ID: ${results.insertID}`)
        }
    })
}

const deleteOil = (request, response) => {
    const id = parseInt(request.params.id)
    const name = (request.params.name)

    pool.query('DELETE FROM oils WHERE id, name = $1, $2', [id], [name], (error, results) => {
        if(error) {
            console.log(error)
        }else {
            response.status(200).send(`User deleted with ID: ${id} || User deleted with name: ${name}`)
        }
    })
}

const updateOil = (request, response) => {
    const id = parseInt(request.body.id)
    const name = request.body.name
    const imagelink = request.body.imagelink
    const description = request.body.description
    const uses = request.body.uses
    const wholesale = request.body.wholesale
    const retail = request. body.retail

    pool.query('UPDATE oils SET name = $1, imagelink = $2, description = $3, uses = $4, wholesale = $5, retail = $6 WHERE id = $7', [name, imagelink, description, uses, wholesale, retail, id], (error, results) => {
        if(error) {
            console.log(error)
        }else {
            response.status(200).send(`User modified with ID: ${id} || User modied with name: ${oilName}`)
        }
    })
}


module.exports = {
    getOils,
    getOilByID,
    getOilByName,
    createOil,
    deleteOil,
    updateOil,
    getoilByCondition

}