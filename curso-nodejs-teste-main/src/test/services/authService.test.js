//O usuário deve possuir um nome, email e senha

import { describe, expect, it } from "@jest/globals";
import AuthService from "../../services/authService";
import bcryptjs from "bcryptjs";
import Usuario from "../../models/usuario";

const authService = new AuthService()

describe('Testando a authService.cadastrarUsuario', () => {

    // esse teste, por me permitir acesso direto ao código, leva a nomeclatura de Teste de Caixa Branca. 
    it('O usuário deve possuir um nome, email e senha', async () => {

        // #1 arrange -> digo quais informações eu quero validar.
        const usuarioMock = {
            nome: 'Luis',
            email: 'luis@test.com.br'
        }

        // #2 act (acête) -> aciona os metódos que retornam um dado ou registro.
        const usuarioSalvo = authService.cadastrarUsuario(usuarioMock)

        // #3 assert -> é aonde vou comparar se o que foi retornado através do act esta de acordo com o esperado.
        await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário é obrigatória!')

        // O padrão utilizado acima é conhecido como triple A.
    });

    it('A senha do usuário deve ser criptografada ao ser salva no banco de dados', async () => {
        const usuarioMock = {
            nome: 'Luis',
            email: 'senhateste@email.com.br',
            senha: 'senhateste'
        };
        const retorno = await authService.cadastrarUsuario(usuarioMock)

        const senhasIguais = await bcryptjs.compare('senhateste', retorno.content.senha)
        
        await Usuario.excluir(retorno.content.id)

        expect(senhasIguais).toStrictEqual(true)
    });

    it('Usuário não pode ser cadastrado um usuário com e-mail duplicado', async () => {
        const usuarioMock = {
            nome: 'Luis',
            email: 'luis@test.com.br',
            senha: 'senhateste'
        };

        const usuarioSalvo = authService.cadastrarUsuario(usuarioMock)

        await expect(usuarioSalvo).rejects.toThrowError('Email já cadastrado no banco de dados!')
    });

    it('Deve retornar uma mensagem que o cadastro do usuário foi realizo', async () => {
        const usuarioMock = {
            nome: 'Luis',
            email: 'mensagemretorno@test.com.br',
            senha: 'senhateste'
        };

        const usuarioSalvo = await authService.cadastrarUsuario(usuarioMock)
        await Usuario.excluir(usuarioSalvo.content.id)

        expect(usuarioSalvo.message).toEqual('usuario criado')
    });

    it('Valida retorno de informações do usuário', async () => {
        const usuarioMock = {
            nome: 'Luis',
            email: 'info@test.com.br',
            senha: 'senhateste'
        };

        const usuarioSalvo = await authService.cadastrarUsuario(usuarioMock)
        await Usuario.excluir(usuarioSalvo.content.id)

        expect(usuarioSalvo.content).toMatchObject(usuarioMock)
    });
})