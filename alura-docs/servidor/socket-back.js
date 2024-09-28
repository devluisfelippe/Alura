import "dotenv/config";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registarEventosLogin from "./registrarEventos/login.js";
import io from "./servidor.js";
import { autorizarUsuario } from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios") //nsp é uma abreviação para namespace, apenas uma convenção

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
    registrarEventosInicio(socket, nspUsuarios);
    registrarEventosDocumento(socket, nspUsuarios);
})

// aqui eu crio a conexão do socket.io
io.of("/").on("connection", (socket) => {
    registrarEventosCadastro(socket, io);
    registarEventosLogin(socket, io);
});
