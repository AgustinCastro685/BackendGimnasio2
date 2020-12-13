const fs = require('fs').promises
const connection = require('./connectionMongo');	

async function getReservas(){
    const connectionMongo = await connection.getConnection();

    const reservas = await connectionMongo.db('Gimnasio')
                        .collection('reservas')
                        .find()
                        .toArray();
    return reservas;
}


async function getReserva(codClase){
    const connectionMongo = await connection.getConnection();
    const reserva = await connectionMongo.db('Gimnasio')
                        .collection('reservas')
                        .findOne({codClase: parseInt(codClase) });
    return reserva;
}

async function pushReserva(reserva){
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('Gimnasio')
                        .collection('reservas')
                        .insertOne(reserva);
    return result;
}

async function validarClase(codClase){
    //todo : validar usuario
    
    const connectionMongo = await connection.getConnection();
    const clase = await connectionMongo.db('Gimnasio')
            .collection('clases')
            .findOne({codClase: parseInt(codClase) })
    if (clase){
        throw new Error('No existe la clase');
    }
   
    return clase;
}

async function deleteReserva(codClase){
	const connectionMongo = await connection.getConnection();
	const result = await connectionMongo.db('Gimnasio')
						.collection('reservas')
						.deleteOne({codClase: parseInt(codClase)});
	return result;
}
module.exports = {getReservas, getReserva, deleteReserva, pushReserva, getReserva,validarClase}