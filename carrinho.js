// Adiciona o produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(p => p.nome === nome);
    
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1, imagem: `https://via.placeholder.com/100?text=${encodeURIComponent(nome)}` });
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(nome + ' foi adicionado ao carrinho!');

    atualizarCarrinho();
}

// Remove um item do carrinho
function removerDoCarrinho(nome) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(p => p.nome !== nome);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho(); // Atualiza a página do carrinho
}

// Atualiza o carrinho na página
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoContainer = document.getElementById('carrinhoteste');
    const totalContainer = document.getElementById('total');
    
    carrinhoContainer.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        totalContainer.innerText = 'Total: R$0,00';
        return;
    }

    let total = 0;

    // Percorre os itens do carrinho e cria os elementos da grid
    carrinho.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        // Adiciona conteúdo ao item
        itemElement.innerHTML = `
        <div id="imagen"><img src="imagens/jao-svg.svg"></div>
        <div id="tipo_produto">Funko Pop <h2 id="produto_nome">${item.nome}</h2></div>
        <div id="valor_comprar">
            R$${item.preco}<br><br>
            Quantidade: ${item.quantidade}<br><br><br>
            <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
        </div>
        `;

        // Adiciona o item à grid do carrinho
        carrinhoContainer.appendChild(itemElement);

        // Calcula o total do carrinho
        total += item.preco * item.quantidade;
    });

    totalContainer.innerText = `Total: R$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', atualizarCarrinho);

{/* <img src="${item.imagem}" alt="${item.nome}">
<div class="cart-item-info">
    <h2>${item.nome}</h2>
    <p>Preço: R$${item.preco.toFixed(2)}</p>
    <p>Quantidade: ${item.quantidade}</p>
    <p>Subtotal: R$${(item.preco * item.quantidade).toFixed(2)}</p>
    <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
</div> */}