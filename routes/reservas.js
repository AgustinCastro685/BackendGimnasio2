// aca van todos los endpoints de clases
const express = require('express');
const router = express.Router();
const dataReservas = require('../data/reservas.js');
//const middleware  = require('./login').middleware;



/* Listado de clases */
router.get('/' , async function(req, res) {
  const data = await dataReservas.getReservas();
  res.json(data);
});

/* Una clase especifica */
router.get('/:codClase', async (req, res) => {
    res.json(await dataReservas.getReserva(req.params.codClase));
});

// Alta de Clase
router.post('/',async (req, res) =>{
  const reserva = req.body;
  const user = req.body.codClase
  try{
    //user = await data.validarClase(user)

    const result = await dataReservas.pushReserva(reserva);
    res.json(result);
  }
  catch (error) {
    res.status(500).send(error);
  }
});


// Eliminacion de Clase
router.delete('/:id', async (req, res)=>{
  try {
    const result = await dataReservas.deleteReserva(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;