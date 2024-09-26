const express = require('express')
const app = express()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
const cors = require('cors')


app.use(express.json())
app.use(cors())

const games = [
    {id: 1, name: "Witcher 3", price: 29.99},
    {id: 2, name: "STALCRAFT:X", price: 4.99},
    {id: 3, name: "Minecraft", price: 22.99},
    {id: 4, name: "CS 2", price: 9.99},
    {id: 5, name: "Roblox", price: 1.11},
    {id: 6, name: "Genshin Impact", price: 1.22},
    {id: 7, name: "Valorant", price: 11.99},
    {id: 8, name: "GTA V", price: 49.99}
]

app.get('/games', (req,res) =>{
    res.send(games)
})

app.get('/games/:id', (req,res) => {
    if (typeof games[req.params.id -1] === 'undefined'){
        return res.status(404).send({error: "Game not found"})
    }
    res.send(games[req.params.id -1])
})

app.post('/games', (req,res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({error: 'One or all params are missing'})
    }
    let game ={
        id: games.length +1,
        price: req.body.price,
        name: req.body.name
    }

    games.push(game)

    res.status(201)
        .location(`${getBaseUrl(req)}/games/${games.length}`)
        .send(game)
})

app.delete('/games/:id', (req,res) => {
    if (typeof games[req.params.id -1] === 'undefined'){
        return res.status(404).send({error: "Game not found"})
    }

    games.splice(req.params.id -1, 1)

    res.status(204).send({error: "No content"})
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}/games`)
})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted
        ? 'https' : 'http' + `://${req.headers.host}`
}