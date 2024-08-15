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

const user = new User('Luisinho', '123456')

const senhasComuns = ["senha", "123456", "senha123", "admin", "blink182","meuAniversario", "senha123456", "brasil", "102030"]

senhasComuns.map(senha => {
    if (user.autentica('Luisinho', senha)) {
        console.log(`a senha do usuário é ${senha}`)
    }
})

