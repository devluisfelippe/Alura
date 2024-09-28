const { pbkdf2Sync } = require('crypto')
const { sign, verify } = require('jsonwebtoken')
const { buildResponse } = require('./utils')

function createToken(username, id) {
    const token = sign({ username, id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
        audience: 'alura-serverless'
    })

    return token
}

function authorize(event) {
    const { authorization } = event.headers
    if (!authorization) {
        return buildResponse(401, { error: 'Missing authorization header' })
    }

    // Bearer <JWT>
    const [type, token] = authorization.split(' ')
    if (type !== 'Bearer' || !token) {
        return buildResponsese(401, { error: 'Unsuported authorization type' })
    }

    const decodedToken = verify(token, process.env.JWT_SECRET, { audience: 'alura-serverless' })

    if (!decodedToken) {
        return buildResponse(401, { error: 'Invalid Token' })
    }

    return decodedToken
}

function makeHash(password) {
    const hash = pbkdf2Sync(password, process.env.SALT, 100000, 64, 'sha512').toString('hex')
    return hash
}

module.exports = { createToken, authorize, makeHash }