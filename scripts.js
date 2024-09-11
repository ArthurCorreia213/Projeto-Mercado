function catalogoInicial(){
    document.getElementById('catalogo-teste').innerText = ''

    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
        data.catalogo.forEach(produto =>{
            criarCartao(produto.nome, produto.preço, produto.tipo, produto.imagem)
        });
        })
        .catch(error => alert('Erro ao carregar o JSON:', error));
}

function pesquisaCatalogo(){
    const pesquisa_texto = document.getElementById("texto_pesquisa").value.toLowerCase()
    const container = document.getElementById('catalogo-teste');

    // document.getElementById("p").innerHTML = document.getElementById("myCheck").checked == true;

    container.innerHTML = ''

    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
    data.catalogo.forEach(produto =>{
        let nomeLower = produto.nome.toLowerCase()
        if(nomeLower.includes(pesquisa_texto)){
            criarCartao(produto.nome, produto.preço, produto.tipo, produto.imagem)
        }
    });
    })
    .catch(error => alert('Erro ao carregar o JSON:', error));
}

function criarCartao(nome, preço, tipo, imagem){
    const container = document.getElementById('catalogo-teste');
    // Percorre os itens do carrinho e cria os elementos da grid
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
  
        // Adiciona conteúdo ao item
        itemElement.innerHTML = `
        <div class="cart-item-info">
            <div class="card 1">
                <div class="imag" style="background-image: url(${imagem});"></div>
                <div class="legenda">
                    <div class="nomes">
                        <div class="names">
                            <div class="title">${tipo}</div>
                            <div class="carac">${nome}</div>
                        </div>
                </div>
                    
                        <div class="acoes">
                            <div class="valor">🛒R$${preço}</div>
                            <button onclick="adicionarAoCarrinho('${nome}', ${preço}, '${tipo}', '${imagem}' )">Adicionar Ao Carrinho</button>
                        </div>
                </div>
            </div>
        </div>
        `;
  
        // Adiciona o item à grid do carrinho
        container.appendChild(itemElement);
    }

// Adiciona o produto ao carrinho
function adicionarAoCarrinho(nome, preco, tipo, imagem) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(p => p.nome === nome);
    
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, tipo , quantidade: 1, imagem: `${imagem}` });
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
        document.getElementById("total_comprar").innerText = '';
        return;
    }

    let total = 0;

    // Percorre os itens do carrinho e cria os elementos da grid
    carrinho.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        // Adiciona conteúdo ao item
        itemElement.innerHTML = `
        <div id="imagen"><img src="${item.imagem}"></div>
        <div id="tipo_produto">${item.tipo} <h2 id="produto_nome">${item.nome}</h2></div>
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



// Código do carrossel
const box = document.querySelector('.container')
const imagens = document.querySelectorAll('.container img')

let contador = 0;

function slider(){
    contador++

    if(contador > imagens.length - 1){
        contador = 0
    }

    box.computedStyleMap.transform = `translateX(${-contador * 1600}px)`
}

setInterval(slider, 2000)