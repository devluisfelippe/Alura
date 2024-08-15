// O login deve possuir um e-mail e senha para se autenticar;

import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import app from '../../app' // não crio um novo servidor, apenas importo o que já existe

let servidor
beforeEach(() => {
    const porta = 3000
    servidor = app.listen(porta)
});


afterEach(() => {
    servidor.close()
});

// ESSE TESTE É CONHECIDO COMO TESTE DE CAIXA PRETA, POIS NÃO TEMOS ACESSO DIRETO AO CÓDIGO, APENAS AO ENDPOINT.

describe('testando a rota de login (POST)', () => {
    it('O login deve possuir um e-mail e senha para se autenticar', async () => {
        const loginMock = {
            email: 'luis@teste.com.br'
        }

        await request(servidor)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(500)
            .expect('"A senha de usuario é obrigatório."')
    });

    it('O login deve possuir um email para se autenticar', async () => {
        const loginMock = {
            senha: '1234'
        }

        await request(servidor)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(500)
            .expect('"O email do usuario é obrigatório."')
    });

    it('O login deve validar se o usuário está cadastrado', async () => {
        const loginMock = {
            email: 'usuario@teste.com.br',
            senha: '12345'
        }

        await request(servidor)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(500)
            .expect('"Usuario não cadastrado."')
    });

    it('O login deve validar e-mail e senha incorreto', async () => {
        const loginMock = {
            email: 'luis@test.com.br',
            senha: '12345'
        }

        await request(servidor)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(500)
            .expect('"Usuario ou senha invalido."')
    });

    it('O login deve validar se esta sendo retornado um accessToken', async () => {
        const loginMock = {
            email: 'luis@test.com.br',
            senha: 'senhateste'
        }

        const response = await request(servidor)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(201)
        
        expect(response.body.message).toEqual('Usuario conectado')
        expect(response.body).toHaveProperty('accessToken')
    });
});