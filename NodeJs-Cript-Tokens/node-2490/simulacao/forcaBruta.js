import { createHash } from 'crypto'


class User {
    constructor(nome, senha) {
        this.nome = nome
        this.hash = this.criaHash(senha)
    }

    criaHash(senha) {
        return createHash('sha256').update(senha).digest('hex')
    }

    autentica(nome, senha) {
        if (nome === this.nome && this.hash === this.criaHash(senha)) {
            console.log("Usuário autenticado!");
            return true;
        }

        //console.log("Usuário com dados incorretos!");
        return false;
    }
}

const user = new User('Luisinho', '5564')

for (let senhaTeste = 0; senhaTeste < 10000; senhaTeste++) {
    if(user.autentica('Luisinho', senhaTeste.toString())) {
        console.log(`a senha do usuário é ${senhaTeste}`)
    }
}