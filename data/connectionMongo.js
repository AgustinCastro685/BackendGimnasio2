const chalk = require('chalk');
const { MongoClient } = require('mongodb');

// TODO: Crear variables de entorno, sacar el harcodeo
const uriMongo = 'mongodb+srv://admin:123Momia@cluster0.yim72.azure.mongodb.net/Gimnasio?retryWrites=true&w=majority';

const client = new MongoClient(uriMongo, {useUnifiedTopology: true, useNewUrlParser:true})

async function getConnection(){
    return await client.connect()
    .catch(err => console.log(chalk.red(err)));
}
module.exports = {getConnection};