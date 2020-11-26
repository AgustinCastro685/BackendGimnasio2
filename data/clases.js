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
                       // .findOne({codClase:codClase});
                        .findOne({codClase: parseInt(codClase) });

    return result;                    
}

async function updateClase(codigoClase,alumno){

    const connectionMongo = await connection.getConnection();
    console.log(codigoClase)
    console.log(alumno)
    
    // TODO: Traer el objeto clase con id
    // clase.usuarios.push(nuevousuario)
    //let compare = codigoClase
    //console.log(compare)
    // buscar con el claseupdate y dsp lo incorporas al array.
    //aca va el find
    //let usuarioNew = claseUpdate.Alumnos.push(alumno)
    //const query = {codClase: parseInt(clase.codClase)}
    let claseActual = await findClase(codigoClase)
    console.log(claseActual)
    
    //console.log('y aca hola despues de buscar clase')
    let alumnosAux = claseActual.Alumno //revisar esto!
    console.log(alumnosAux)
    alumnosAux.push(alumno)
    //console.log(alumno)
    //const query = {codClase: parseInt(clase.codClase)}
    
	const newvalues = {
		$set:{
            codClase: clase.codClase, 
            nombre_Clase:clase.nombre_Clase, 
            dia:clase.dia, 
            hora : clase.hora,
            Alumnos : alumnosAux
            
		}
    }
    console.log(newvalues)
	const result = await connectionMongo.db('Gimnasio')
                        .collection('clases')
						.updateOne(claseActual, newvalues);
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