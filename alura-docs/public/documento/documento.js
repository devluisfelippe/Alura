import { emitirExcluirDocumento, emitirTextoEditor, selecionarDocumento } from "./socket-front-documentos.js";

const parametros = new URLSearchParams(window.location.search);
// ele esta pegando exatamente a parametro da URL
const nomeDocumento = parametros.get("nome");
const tituloDocumento = document.getElementById("titulo-documento")
const textoEditor = document.getElementById("editor-texto");
const botaoExcluir = document.getElementById("excluir-documento")
const listaUsuariosConectados = document.getElementById("usuarios-conectados")

tituloDocumento.textContent = nomeDocumento || "Documento sem título"

function tratarAutorizacaoSucesso(payloadToken) {
    selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario });
}

function atualizarInterfaceUsuarios(usuariosNoDocumento) {
    listaUsuariosConectados.innerHTML = "";

    usuariosNoDocumento.forEach((usario) => {
        listaUsuariosConectados.innerHTML += `
            <li class="list-group-item">${usario}</li>
        `;
    })
}

textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor({
        texto: textoEditor.value,
        nomeDocumento
    });
});

function atualizarTextoEditor(texto) {
    textoEditor.value = texto;
};

botaoExcluir.addEventListener("click", () => {
    emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
    if (nome === nomeDocumento) {
        alert(`Documento ${nome} excluido`);
        window.location.href = "/"
    }
};

export { atualizarTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarInterfaceUsuarios }