import { createHash } from 'crypto'

function criaHash(senha) {
    return createHash('sha256').update(senha).digest('hex')
}

class User {
    constructor(nome, senha) {
        this.nome = nome
        this.hash = criaHash(senha)
    }

    autentica(nome, senha) {
        if (nome === this.nome && this.hash === criaHash(senha)){
            console.log("Usuário autenticado!");
            return true;
        }

        console.log("Usuário com dados incorretos!");
        return false;
    }
}

const user = new User('Luisinho', 'batatinha')

user.autentica('Luisinho', 'batatinha')
user.autentica('Luisinho', 'potato')