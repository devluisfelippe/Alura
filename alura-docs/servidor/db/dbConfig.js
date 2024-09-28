import { MongoClient } from "mongodb";

const cliente = new MongoClient('mongodb+srv://admin:admin123@cluster0.astro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

let documentosColecao;
let usuariosColecao;

try {
    await cliente.connect()

    const db = cliente.db('alura-websockets')
    documentosColecao = db.collection('documentos')
    usuariosColecao = db.collection('usuarios')

    console.log('conectado ao banco')
} catch (error) {
    console.log(error.message)
}

export { documentosColecao, usuariosColecao }