import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import './db/dbConfig.js';

const app = express();
const porta = process.env.porta || 3000;

// apenas esta renderizando a página.
const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public")
app.use(express.static(diretorioPublico))
//

const servidorHttp = http.createServer(app)

servidorHttp.listen(porta, () => {
    console.log(`Servidor ouvindo porta ${porta}`)
});

// utilizo o new Server do socket.io para iniciar uma nova instância do servidor de socket
const io = new Server(servidorHttp); 

export default io;