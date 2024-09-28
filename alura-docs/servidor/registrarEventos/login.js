import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registarEventosLogin(socket, io) {
    socket.on("autenticar_usuario", async ({ nome, senha }) => {
        const usuario = await encontrarUsuario(nome);

        if (usuario) {
            const autenticado = autenticarUsuario(senha, usuario);

            if (autenticado) {
                const tokenJwt = gerarJwt({ nomeUsuario: nome })

                socket.emit("autenticacao_sucesso", tokenJwt)
            } else {
                socket.emit("autenticacao_error")
            };
        } else {
            socket.emit("usuario_nao_encontrado")
        }
    });
}

export default registarEventosLogin;