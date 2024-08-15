import Carrinho from "../carrinho.js";
import Item from "../item.js"

describe('Testes do carrinho', () => {
    it('Deve inicializar vázio', () => {
        const carrinho = new Carrinho();
        expect(carrinho.subtotal).toBeNull()
    });

    it('Deve ter itens', () => {
        const item = new Item('banana', 2, 5);
        const item2 = new Item('maça', 0.5, 2);

        const carrinho = new Carrinho();
        carrinho.adiciona(item);
        carrinho.adiciona(item2);

        expect(typeof carrinho).toBe('object');
        expect(carrinho.itens).toContain(item);
        expect(carrinho.itens).toContain(item2);
    });

    it('Deve ter a propriedade total na inicialização', () => {
        const carrinho = new Carrinho();

        expect(carrinho).toHaveProperty('total');
    });

    it('Deve lançar erro ao finalizar compra com carrinho vázio', () => {
        function englobaErroCarrinho() {
            const carrinho = new Carrinho()
            carrinho.finalizaCompra()
        };
        expect(englobaErroCarrinho).toThrowError('Carrinho de compras vazio');
    });

    it('Deve adicionar o frete', () => {
        const carrinho = new Carrinho()
        carrinho.adicionaFrete(10)

        expect(carrinho.frete).toBe(10)
    });

    it('Deve finalizar as compras', () => {
        const item1 = new Item('Banana', 2, 5)
        const item2 = new Item('Maça', 1, 5)

        const carrinho = new Carrinho()
        carrinho.adiciona(item1)
        carrinho.adiciona(item2)
        carrinho.adicionaFrete(10)

        expect(carrinho.finalizaCompra()).toStrictEqual({
            subtotal: 15,
            frete: 10,
            total: 25
        });
    });
});