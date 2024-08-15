import jwt from 'jsonwebtoken';

const chaveSecreta = "chavesupersecreta"

const token = jwt.sign(
    {
        nome: "Luis Felippe",
        curso: "Node Segurança"
    }, chaveSecreta
)

console.log(token)

const tokenDecodificado = jwt.verify(token, chaveSecreta)

console.log(tokenDecodificado)