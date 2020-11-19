const jwt = require('jsonwebtoken')
const dataUser = require ('../data/usuarios')
require('dotenv').config();

async function auth(req,res,next){
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const user= jwt.verify(token, process.env.SECRET)
        console.log("Usuario: " + user)
        next();

    }catch(error) {
        res.status(401).send({error: error})
    }
}

module.exports = auth;