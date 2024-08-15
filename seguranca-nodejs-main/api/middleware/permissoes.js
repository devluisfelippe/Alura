const database = require('../models')

const permissoes = (listaPermissoes) => {
    return async (req, res, next) => {
        const { usuarioId } = req

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(401).send({ message: 'Usuário não encontrado' })
        }

        const permissoesCadastradas = usuario.usuario_permissoes
            .map(permissao => permissao.nome)
            .some(permissao => listaPermissoes.includes(permissao))

        if (!permissoesCadastradas) {
            return res.status(401).send({ message: 'Usuário não possui permissão' })
        }

        return next()
    }
}

module.exports = permissoes