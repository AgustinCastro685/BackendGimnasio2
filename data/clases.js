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

async function findClase(codClase){
    const connectionMongo =  await connection.getConnection();
    const result =  await connectionMongo.db('Gimnasio')
                        .collection('clases')
                        .findOne({codClase: parseInt(codClase) });

    return result;                    
}

async function updateClase(clase){
    const query = { codClase: parseInt(clase.codClase) };
    const newValues = {
      $set: {
         nombre_Clase: clase.nombre_Clase,
         dia: clase.dia,
         hora: clase.hora,
      },
     };
    const connectionMongo =  await connection.getConnection();
    const result =  await connectionMongo.db('Gimnasio')
                        .collection('clases')
                        .updateOne(query, newValues);
    
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