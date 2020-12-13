const fs = require('fs').promises
const mongodb = require ('mongodb')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const connection = require('./connectionMongo');	

async function getUsuarios(){
    const connectionMongo = await connection.getConnection();

    const usuarios = await connectionMongo.db('Gimnasio')
                        .collection('usuarios')
                        .find()
                        .toArray();
    return usuarios;
}

async function getUsuario(dni){
    const connectionMongo = await connection.getConnection();
    const usuario = await connectionMongo.db('Gimnasio')
                        .collection('usuarios')
                        .findOne({dni: parseInt(dni) });
    return usuario;
}

async function updateUsuario(usuario){
    console.log(usuario)
    const query = {dni: parseInt(usuario.dni)}
    usuario.password = await bcrypt.hash(usuario.password,8) //el numero es el salt
    const newvalues = {
        $set: {
            dni: usuario.dni, 
            email: usuario.email, 
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            password: usuario.password
        }
    }
    const connectionMongo =  await connection.getConnection();
    const result = await connectionMongo.db('Gimnasio')
                        .collection('usuarios')
                        .updateOne(query, newvalues);
    return result;
}

async function deleteUsuario(dni){
	const connectionMongo = await connection.getConnection();
	const result = await connectionMongo.db('Gimnasio')
						.collection('usuarios')
						.deleteOne({dni: parseInt(dni)});
	return result;
}


async function findByCredentials(email,password){
    //todo : validar usuario
    
    const connectionMongo = await connection.getConnection();
    const user = await connectionMongo.db('Gimnasio')
            .collection('usuarios')
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
        .collection('usuarios')
        .insertOne(user);

    return result;

}

async function generateAuthToken(user){
    const token = jwt.sign({_id: user._id.toString()},process.env.SECRET,{expiresIn: '1h'}); //sign genera el token
    console.log(token)
    return token
}

module.exports = {getUsuario,deleteUsuario,updateUsuario,pushUsuario,getUsuarios,findByCredentials,generateAuthToken}