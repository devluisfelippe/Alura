import { describe, expect, it, jest } from '@jest/globals';
import Editora from '../../models/editora';

describe('Testando o modelo editora', () => {
  const objetoEditora = {
    nome: 'Casa do Código',
    cidade: 'São Bernado',
    email: 'cdc@email.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  it.skip('Deve salvar editora no DB', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('Casa do Código');
    });
  });

  it.skip('Deve salvar no DB usando a sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora);

    const dados = await editora.salvar();

    const valorRetornado = await Editora.pegarPeloId(dados.id);

    expect(valorRetornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve fazer uma chamada simulada ao DB', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'Casa do Código',
      cidade: 'São Bernado',
      email: 'cdc@email.com',
      created_at: '2024-06-18',
      updated_at: '2024-06-19'
    });

    const retorno = editora.salvar()

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );

  });
  
});
