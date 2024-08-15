import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

function criaHashComSal(senha) {
    const sal = randomBytes(16).toString('hex')

    const senhaHasheada = scryptSync(senha, sal, 64).toString('hex')

    return `${sal}:${senhaHasheada}`
}

class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        [this.sal, this.hash] = criaHashComSal(senha).split(':')
    }

    autentica(nome, senha) {
        if (nome === this.nome) {
            const testeHash = scryptSync(senha, this.sal, 64); //CRIA NOVA HASH
            const hashReal = Buffer.from(this.hash, 'hex') // CHECA A HASH REAL

            const hashsCorrespondem = timingSafeEqual(testeHash, hashReal)

            if(hashsCorrespondem) {
                console.log('Usuário autenticado!')
                return true
            }
        }

        console.log('Dado inválidos!')
    }
}

const usuario = new Usuario('Luis', 'minhasenha')
// TESTE DE SUCESSO
usuario.autentica('Luis', 'minhasenha')
// TESTE DE FALHA
usuario.autentica('Luis', 'nossasenha')
console.log(usuario)