const fs = require('fs').promises
const connection = require('./connectionMongo');	

async function getClases(){
    const connectionMongo = await connection.getConnection();

    const clases = await connectionMongo.db('Gimnasio')
                        .collection('clases')
                        .find()
                        .toArray();
    return clases;
}


async function getClase(codClase){
    const connectionMongo = await connection.getConnection();
    const clase = await connectionMongo.db('Gimnasio')
                        .collection('clases')
                        .findOne({codClase: parseInt(codClase) });
    return clase;
}

async function pushClase(clase){
	const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('Gimnasio')
                        .collection('clases')
                        .insertOne(clase);
    return result;
}

async function updateClase(claseUpdate){
	const connectionMongo = await connection.getConnection();
    // TODO: Traer el objeto clase con id
    // clase.usuarios.push(nuevousuario)
    let compare = claseUpdate.codClase
    const query = {compare: parseInt(clase.codClase)}
	const newvalues = {
		$set:{
            codClase: clase.codClase, 
            nombre_Clase:clase.nombre_Clase, 
            dia:clase.dia, 
            hora : clase.hora
		}
	}
	const result = await connectionMongo.db('Gimnasio')
                        .collection('clases')
						.updateOne(query, newvalues);
	return result;
}

async function deleteClase(codClase){
	const connectionMongo = await connection.getConnection();
	const result = await connectionMongo.db('Gimnasio')
						.collection('clases')
						.deleteOne({codClase: parseInt(codClase)});
	return result;
}
module.exports = {getClases,deleteClase,updateClase,pushClase,getClase}