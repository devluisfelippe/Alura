import { cadastrarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro (socket, io) {
    socket.on("cadastrar_usuario", async (dados) => {
        const usuarioExiste = await encontrarUsuario(dados.nome)

        if (usuarioExiste === null) {
            const resultado = await cadastrarUsuario(dados)
            if (resultado.acknowledged) {
                socket.emit("cadastro_sucesso");
            } else {
                socket.emit("cadastro_error")
            };
        } else {
            socket.emit("usuario_existe")
        }
    })
}

export default registrarEventosCadastro;