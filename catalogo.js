fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    data.catalogo.forEach(produto =>{
        // alert(JSON.stringify(produto));
        criarCartao(produto.nome, produto.preço, produto.tipo)
    });
  })
  .catch(error => alert('Erro ao carregar o JSON:', error));

function criarCartao(nome, preço, tipo){
  const carrinhoContainer = document.getElementById('catalogo-teste');
  // Percorre os itens do carrinho e cria os elementos da grid
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';

      // Adiciona conteúdo ao item
      itemElement.innerHTML = `
      <div class="cart-item-info">
          <div class="card 1">
              <div class="imag"></div>
              <div class="legenda">
                  <div class="nomes">
                      <div class="names">
                          <div class="title">${tipo}</div>
                          <div class="carac">${nome}</div>
                      </div>
              </div>
                  
                      <div class="acoes">
                          <div class="valor">🛒R$${preço}</div>
                          <button onclick="adicionarAoCarrinho('${nome}', ${preço})">Adicionar Ao Carrinho</button>
                      </div>
              </div>
          </div>
      </div>
      `;

      // Adiciona o item à grid do carrinho
      carrinhoContainer.appendChild(itemElement);
  }

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
        <div class="cart-item-info">
            <div class="card 1">
                <div class="imag"></div>
                <div class="legenda">
                    <div class="nomes">
                        <div class="names">
                            <div class="carac">Funko PoP</div>
                            <div class="title">${item.nome}</div>
                        </div>
                </div>
                    
                        <div class="acoes">
                            <div class="valor">🛒 R$ 100,00</div>
                            <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
                        </div>
                </div>
            </div>
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