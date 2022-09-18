const express = require('express') //recupere la dépendance express dans le dossier node_module
const {success, getUniqueId} = require('./helper.js')
let pokemons = require('./mock-pokemon.js')
const morgan =require('morgan')
const favicon =require('serve-favicon')
const bodyParser = require ('body-parser')

const app = express()
const port =3000

app
    .use(favicon(__dirname + '/logo.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())


app.get('/', (req,res) => res.send("Hello Express 4 !")) //on recupere le chemin de la requete (/) et on envoi une reponse au client

app.get('/api/pokemon/:id', (req,res) => {
    const id =parseInt(req.params.id) //recupere id contenu dans l'irl
    const pokemon= pokemons.find(pokemon => pokemon.id === id)
    const message= ' Un pokemon a bien été trouvé'
    res.json(success(message,pokemon)) //utilisation methode sans le module grace l2
})
app.get('/api/pokemon',(req, res) => {
    const message= ' Vous avez trouvé tout les pokémon'
    res.json(success(message,pokemons))
})

app.post('/api/pokemon',(req, res) => {
    const id= getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`
    res.json(success(message,pokemonCreated))

})

app.put('/api/pokemon/:id', (req,res) =>{
    const id =parseInt(req.params.id) 
    const pokemonUpdated=  {...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })

const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié ! `
res.json(success(message, pokemonUpdated))

})

app.delete('/api/pokemon/:id', (req,res) =>{
    const id =parseInt(req.params.id)    
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé ! `
res.json(success(message, pokemonDeleted))

})
app.listen(port, ()=> console.log(`Notre app node est démarée sur http://localhost:${port}`))