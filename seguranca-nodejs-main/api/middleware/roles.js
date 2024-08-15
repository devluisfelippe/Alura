const database = require('../models')

const roles = (listaRoles) => {
    return async (req, res, next) => {
        const { usuarioId } = req

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(401).send({ message: 'Usuário não cadastrado' })
        }

        const rolesCadastradas = usuario.usuario_roles
            .map(role => role.nome)
            .some(role => listaRoles.includes(role)) //ele pega a partir do nome da role para verificar se está inclusa a roles permitidas

        if (!rolesCadastradas) {
            return res.status(401).send({ message: 'Usuário não possui as permissões necessárias.' })
        }

        return next()
    }
}

module.exports = roles