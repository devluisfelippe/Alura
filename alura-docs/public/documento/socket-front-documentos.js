import { obterCookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizarInterfaceUsuarios, atualizarTextoEditor, tratarAutorizacaoSucesso } from "./documento.js";

// faz o cliente se conectar ao socket io do backend
// eu poderia passar uma URL especifica dentro dos parenteses

const tokenJwt = obterCookie("tokenJwt")

const socket = io("/usuarios", {
    auth: {
        token: tokenJwt
    }
});

socket.on("autorizacao_sucesso", tratarAutorizacaoSucesso)

socket.on("connect_error", (erro) => { //o connect_error é uma conexão padrão do socket.io
    alert(erro);
    window.location.href = "/login/index.html"
})

function selecionarDocumento(dadosEntrada) {
    socket.emit("selecionar_documento", dadosEntrada, (texto) => {
        atualizarTextoEditor(texto)
    });
}

socket.on("usuario_ja_no_documento", () => {
    alert("Documento já aberto em outra página!")
    window.location.href = "/"
})

socket.on("usuarios_no_documento", atualizarInterfaceUsuarios)

function emitirTextoEditor(dados) {
    // aqui eu defino que o socket irá emitir um evento
    socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
    atualizarTextoEditor(texto);
});

socket.on("excluir_documento_sucesso", (nome) => {
    alertarERedirecionar(nome);
})

function emitirExcluirDocumento(nome) {
    socket.emit('excluir_documento', nome)
}

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento }