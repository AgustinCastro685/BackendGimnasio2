// aca van todos los endpoints de clases
const express = require('express');
const router = express.Router();
const dataClases = require('../data/clases');
//const middleware  = require('./login').middleware;



/* Listado de clases */
router.get('/' , async function(req, res) {
  const data = await dataClases.getClases();
  res.json(data);
});

/* Una clase especifica */
router.get('/id', async (req, res) => {
    res.json(await dataClases.getClase(req.params._id));
});

// Alta de Clase
router.post('/',async (req, res) =>{
  const clase = req.body;
  // const user = req.body.username

  try{
    const result = await dataClases.pushClase(clase);
    res.json(result);
  }
  catch (error) {
    res.status(500).send(error);
  }
});
// Modificacion de Clase
router.put('/:codClase', async (req, res) =>{
  const clase = req.body;
  
  try {
    clase.codClase = req.params.codClase;
    const result = await dataClases.updateClase(clase);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Eliminacion de Clase
router.delete('/:codClase', async (req, res)=>{
  try {
    const result = await dataClases.deleteClase(req.params.codClase);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;