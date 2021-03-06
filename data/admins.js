const fs = require('fs').promises
const mongodb = require ('mongodb')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const connection = require('./connectionMongo');	

async function getUsuarios(){
    const connectionMongo = await connection.getConnection();

    const usuarios = await connectionMongo.db('Gimnasio')
                        .collection('admins')
                        .find()
                        .toArray();
    return usuarios;
}



async function getUsuario(id){
    const connectionMongo = await connection.getConnection();
    const usuario = await connectionMongo.db('Gimnasio')
                        .collection('admins')
                        .findOne({_id: parseInt(id) });
    return usuario;
}

async function findByCredentials(email,password){
    //todo : validar usuario
    
    const connectionMongo = await connection.getConnection();
    const user = await connectionMongo.db('Gimnasio')
            .collection('admins')
            .findOne({email:email})
    if (!user){
        throw new Error('No se puede loguear');
    }

   // todo: validar password

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('No se puede loguear')
    }

    return user;
}

async function pushUsuario(user){
    const connectionMongo = await connection.getConnection()
    user.password = await bcrypt.hash(user.password,8) //el numero es el salt
    const result = await connectionMongo.db('Gimnasio')
        .collection('admins')
        .insertOne(user);

    return result;

}

async function generateAuthToken(user){
    const token = jwt.sign({_id: user._id.toString()},process.env.SECRET,{expiresIn: '1h'}); //sign genera el token
    console.log(token)
    return token
}

module.exports = {getUsuario,pushUsuario,getUsuarios,findByCredentials,generateAuthToken}