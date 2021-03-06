// aca van todos los endpoints de usuarios
var express = require('express');
var router = express.Router();
const userData = require('./../data/admins.js')
const auth = require('../middleware/auth')

/* GET users listing. */


//router.post('/',async (req,res) => {
  //res.json(await userData.pushUsuario(req.body))
//})
//MODIFIQUE EL SACAR EL AUTH 

router.post('/login',async (req,res) =>{
  try {
    const user = await userData.findByCredentials(req.body.email,req.body.password)
    //TODO generar el token
    const token = await userData.generateAuthToken(user)
    res.send({user,token})
    

  }catch (error){
    res.status(401).send(error.message)

  }
})

router.post('/',async (req,res) => {
  res.json(await userData.pushUsuario(req.body))
})

/* Listado de usuarios */
router.get('/' , async function(req, res) {
  const data = await userData.getUsuarios();
  res.json(data);
});

/* Un usuario especifico */
router.get('/:id',auth, async (req, res) => {
    res.json(await userData.getUsuario(req.params.id));
});

module.exports = router;
