const express = require('express');
const router = express.Router();

const Transporte = require('../models/viajes.js');
//clsconst { route } = require('./direcciones.js');

router.get('/', async (req, res) => {
    
    try {
        const arrayViajesDB = await Transporte.find()
        console.log(arrayViajesDB)

        res.render("transporte", {
            arrayViajes : arrayViajesDB
        })
    } catch (error) {
        console.log(error);
    }

})

router.get('/crear', (req, res) => {
    //Vistas
    res.render('crear')
})

router.post('/', async(req, res) => {
    const body = req.body
    
    try {

        await Transporte.create(body)

        //Esta linea va a vistas
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

//BUscar
router.get('/:id', async(req, res) => {
    const id = req.params.id

    try {
        const viajesDB =  await Transporte.findOne({ _id : id })

        console.log(viajesDB)
        res.render('detalles', {
            //vistas
            viaje : viajesDB,
            error : false
        })
    } catch (error) {
        console.log(error)
        res.render('detalles', {
            error : true,
            mensaje : 'No se encuentra el id seleccionado'
        })
    }
})


//Eliminar
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    try {
        const viajesDB = await Transporte.findByIdAndDelete({ _id : id })

        if(viajesDB){
            res.json({
                estado : true,
                mensaje : 'Eliminado'
            })
        }else {
            res.json({
                estado : false,
                mensaje : 'Fallo Eliminar'
            })
        }

    } catch (error) {
        console.log(error)
    }

})

//Editar
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // console.log(id)
    // console.log('body', body)

    console.log('aqui estoy')

    try {
        const viajesDB = await Transporte.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(viajesDB)
        res.json({
            estado: true,
            mensaje: 'viaje editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'edicion fallo'
        })
    }
})

module.exports = router