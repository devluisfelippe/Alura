const database = require('../models')
const { compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

class AuthService {
    async login(dto) {
        const usuario = await database.usuarios.findOne({
            where: { email: dto.email },
            attributes: ['id', 'email', 'senha']
        });

        if (!usuario) throw new Error('Usuário não encontrado!');

        const senhasIguais = await compare(dto.senha, usuario.senha)

        if (!senhasIguais) throw new Error('Usuário ou senha inválido!');

        const accessToken = sign(
            { id: usuario.id, email: dto.email }, jsonSecret.secret, { expiresIn: 86400 }
        );

        return { accessToken }
    }
}

module.exports = AuthService