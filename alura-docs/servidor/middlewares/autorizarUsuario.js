import jwt from "jsonwebtoken"

function autorizarUsuario(socket, next) {
    const tokenJwt = socket.handshake.auth.token // me permite pegar a propriedade que eu passo do frontend na conexão do IO

    try {
        const payloadToken = jwt.verify(tokenJwt, process.env.SEGREDO_JWT)
        
        socket.emit("autorizacao_sucesso", payloadToken)

        next()
    } catch (error) {
        next(error)
    }
}

export { autorizarUsuario }