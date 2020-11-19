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



async function getUsuario(id){
    const connectionMongo = await connection.getConnection();
    const usuario = await connectionMongo.db('Gimnasio')
                        .collection('usuarios')
                        .findOne({_id: parseInt(id) });
    return usuario;
}

async function updateUsuario(usuario){
	const connectionMongo = await connection.getConnection();
	const query = {_id: parseInt(usuario._id)}
	const newvalues = {
		$set:{
			dni: usuario.dni,nombre:usuario.nombre,apellido:usuario.apellido
		}
	}
	const result = await connectionMongo.db('Gimnasio')
                        .collection('usuarios')
						.updateOne(query, newvalues);
	return result;
}

async function deleteUsuario(id){
	const connectionMongo = await connection.getConnection();
	const result = await connectionMongo.db('Gimnasio')
						.collection('usuarios')
						.deleteOne({_id: parseInt(id)});
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