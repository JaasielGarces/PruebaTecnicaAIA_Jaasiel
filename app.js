const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000;

//Conexion a base de datos
const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.4nqpgow.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('conectado a mongodb')) 
.catch(e => console.log('error de conexión', e))

//motor de plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views' )

// Middelware
app.use(express.static(__dirname + "/public"))

//Rutas Web
app.use('/', require('./router/direcciones'))

app.listen(port, () => {
    console.log('Servidor conectado en el puerto', port)
  })