import { documentosColecao } from "./dbConfig.js";

function obterDocumentos() {
    // naturalmente o MongoDB devolve um cursor, preciso converter em Array ou usar o método forEach para operar cada item.
    const documentos = documentosColecao.find().toArray() 
    // sem toArray: await documentos.forEach((documento) => { código ... })
    return documentos;
};

function adicionarDocumento(nome) {
    const resultado = documentosColecao.insertOne({
        nome,
        texto: ""
    });

    return resultado;
}

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
    });
    return documento;
};

function atualizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne({
        nome
    }, {
        $set: {
            texto
        }
    })

    return atualizacao;
};

function excluirDocumento(nome) {
    const resultado = documentosColecao.deleteOne({
        nome
    })

    return resultado;
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento }