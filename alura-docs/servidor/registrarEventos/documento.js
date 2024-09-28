import { atualizaDocumento, excluirDocumento, encontrarDocumento } from "../db/documentosDb.js";
import { adicionarConexao, encontrarConexao, obterUsuariosDocumento, removerConexao } from "../utils/conexoesDocumentos.js";

function registrarEventosDocumento(socket, io) {
    socket.on("selecionar_documento", async ({nomeDocumento, nomeUsuario}, devolverTexto) => {
        const documento = await encontrarDocumento(nomeDocumento);

        if (documento) {
            const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario)

            if(!conexaoEncontrada) {
                // esse método vai pegar o socket que esta conectado no momento, e irá colocar em uma room
                // essa room serve para agrupar clientes
                socket.join(nomeDocumento); // a pessoa se conectou e enviou um ID, uso esse ID para criar uma room e colocar ela, se a room já existir, só adicionar aquela pessoa, então tudo que ela fizer vai cair nessa room.
    
                adicionarConexao({ nomeDocumento, nomeUsuario })
                
                socket.data = {
                    usuarioEntrou: true
                }

                const usuariosNoDocumento = obterUsuariosDocumento(nomeDocumento)
    
                io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento)
    
                devolverTexto(documento.texto)
                // eu poderia emitir de volta um evento, mas também posso simples ter uma funcao de callback no cliente para retornar
                //socket.emit("texto_documento", documento.texto)
            } else {
                socket.emit("usuario_ja_no_documento")
            }

        };

        // aqui eu crio o receptor do evento vindo do cliente, passando o nome do evento e uma funcao de callback
        // no parametro da callback é aonde recebo os valores vindo do cliente.
        socket.on("texto_editor", async ({ texto, nomeDocumento }) => {

            const atualizacao = await atualizaDocumento(nomeDocumento, texto)
            if (atualizacao.modifiedCount) {
                socket.to(nomeDocumento).emit("texto_editor_clientes", texto)
            }
        });

        socket.on("excluir_documento", async (nome) => {
            const resultado = await excluirDocumento(nome)

            if (resultado.deletedCount) {
                io.emit("excluir_documento_sucesso", nome)
            }
        });

        socket.on("disconnect", () => {
            if(socket.data.usuarioEntrou) {
                console.log(`Cliente ${socket.id} desconectou`)
                // quando o cliente acessa uma página no front, ele cria uma conexão, quando ele sai da página, o socket é desconectado.
                // no front, quando acesso a página ele emite um evento no socket, antes do evento a conexão é feita
            
                removerConexao(nomeDocumento, nomeUsuario)
                io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento)
            }
        });
    })
}

export default registrarEventosDocumento