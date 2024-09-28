import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";
import { obterCookie } from "./utils/cookies.js";

const tokenJwt = obterCookie("tokenJwt") // aqui eu posso definir a propriedade que eu quiser passar para o backend antes da conexão

const socket = io("/usuarios",{
    auth: { // auth é uma propriedade padrão do io
        token: tokenJwt
    },
});

socket.on("connect_error", (erro) => { //o connect_error é uma conexão padrão do socket.io
    alert(erro);
    window.location.href = "/login/index.html"
})

socket.emit('obter_documentos', (documentos) => {
    documentos.forEach((documento) => {
        inserirLinkDocumento(documento.nome)
    });
});

function emitirAdicionarDocumento(nomeDocumento) {
    socket.emit("adicionar_documento", nomeDocumento)
}

socket.on('adicionar_documentos_interface', (nome) => {
    inserirLinkDocumento(nome)
})

socket.on('documento_existe', (nome) => {
    alert(`O documento ${nome} já existe`)
});

socket.on('excluir_documento_sucesso', (nome) => {
    removerLinkDocumento(nome)
})

export { emitirAdicionarDocumento }