import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConfig.js";

function cadastrarUsuario ({ nome, senha }) {
    const { hashSenha, salSenha } = criaHashESalSenha(senha)

    return usuariosColecao.insertOne({ nome, hashSenha, salSenha })
};

function encontrarUsuario (nome) {
    return usuariosColecao.findOne({ nome });
};

export { cadastrarUsuario, encontrarUsuario }