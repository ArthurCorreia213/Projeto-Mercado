fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('catalogo', JSON.stringify(data.catalogo));
    })
    .catch(error => alert('Erro ao carregar o JSON:', error));

    function criarCartao(nome, preço, tipo, imagem, container, tamanho, descricao) {
        const divAlvo = document.getElementById(container);
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
    
        itemElement.innerHTML = `
        <div class="cart-item-info">
            <div class="card 1">
                <div class="imag" onclick="produtoModal('${nome}', ${preço}, '${tipo}', '${imagem}', '${tamanho}', '${descricao}')" style="background-image: url(${imagem});"></div>
                <div class="legenda">
                    <div class="nomes">
                        <div class="names">
                            <div class="title">${tipo}</div>
                            <div class="carac">${nome}</div>
                        </div>
                    </div>
                    <div class="acoes">
                        <div class="valor">🛒R$${preço}</div>
                        <button onclick="adicionarAoCarrinho('${nome}', ${preço}, '${tipo}', '${imagem}')">Adicionar Ao Carrinho</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        divAlvo.appendChild(itemElement);
    }

function catalogoInicial(){
    document.getElementById('catalogo-teste').innerText = ''
    catalogo = JSON.parse(localStorage.getItem('catalogo'))
    catalogo.forEach(item => criarCartao(item.nome, item.preço, item.tipo, item.imagem, 'catalogo-teste', item.tamanho, item.descricao))
}

//PESQUISA CATALOGO (CÓDIGO):

function pesquisaCatalogo(){
    const pesquisa_texto = document.getElementById("texto_pesquisa").value.toLowerCase()
    const container = document.getElementById('catalogo-teste');
    let catalogo = JSON.parse(localStorage.getItem('catalogo'))

    filtros = []

    if(document.getElementById('filtro_funko_pop').checked === true){
        filtros.push("Funko Pop")
    }
    if(document.getElementById('filtro_figura').checked === true){
        filtros.push("Figura")
    }
    if(document.getElementById('filtro_caneta').checked === true){
        filtros.push("Caneta")
    }

    ordenar = document.getElementById('opcoes-ordenar').value

    switch(true){
        case(ordenar === "alfabetica-az"):
            catalogo.sort((a, b) => a.nome.localeCompare(b.nome))
            break;
        case(ordenar === "alfabetica-za"):
            catalogo.sort((a, b) => b.nome.localeCompare(a.nome))
            break;
        case(ordenar === "preço-crescente"):
            catalogo.sort((a, b) => a.preço - b.preço)
            break;
        case(ordenar === "preço-decrescente"):
            catalogo.sort((a, b) => b.preço - a.preço)
            break;
    }

    if (filtros.length != 0){
        container.innerHTML = ''
        catalogo.forEach(produto =>{
            nomeLower = produto.nome.toLowerCase()
            if(nomeLower.includes(pesquisa_texto) && filtros.includes(produto.tipo)){
                criarCartao(produto.nome, produto.preço, produto.tipo, produto.imagem, 'catalogo-teste', produto.tamanho, produto.descricao)
            }
        })
    }
    else{
        container.innerHTML = ''
        catalogo.forEach(produto =>{
            nomeLower = produto.nome.toLowerCase()
            if(nomeLower.includes(pesquisa_texto)){
                criarCartao(produto.nome, produto.preço, produto.tipo, produto.imagem, 'catalogo-teste', produto.tamanho, produto.descricao)
            }
        })
    }
    if(container.innerHTML === ''){
        container.innerHTML = `<h1 id="nada_encontrado">Nenhum produto com o nome "${pesquisa_texto}" encontrado</h1>`
    }
}

//FIM PESQUISA DO CATÁLOGO


function telaInicialCartoes(){
    const catalogo = JSON.parse(localStorage.getItem('catalogo'))
    let funkos = 0; let canetas = 0; let figuras = 0

    catalogo.forEach(produto =>{
        switch(true){
            case(produto.tipo == "Funko Pop" && funkos < 3):
                funkos++
                criarCartao(produto.nome, produto.preço, produto.tipo, produto.imagem, "funkos", produto.tamanho, produto.descricao)
                break;
            case(produto.tipo == "Caneta" && canetas < 3):
                canetas++
                criarCartao(produto.nome, produto.preço, produto.tipo, produto.imagem, 'canetas', produto.tamanho, produto.descricao)
                break;
            case(produto.tipo == "Figura" && figuras < 3):
                figuras++
                criarCartao(produto.nome, produto.preço, produto.tipo, produto.imagem, 'figuras', produto.tamanho, produto.descricao)
                break;
        }
    })
}

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

    modal(nome)
    numeroDeItensCarrinho()
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

        itemElement.innerHTML = `
        <div id="imagen"><img src="${item.imagem}"></div>
        <div id="tipo_produto">${item.tipo} <h2 id="produto_nome">${item.nome}</h2></div>
        <div id="valor_comprar">
            R$${item.preco * item.quantidade}<br><br>
            Quantidade: ${item.quantidade}<br><br><br>
            <button id="remover-b" onclick="removerDoCarrinho('${item.nome}')">Remover</button>
        </div>
        `;

        carrinhoContainer.appendChild(itemElement);

 
        total += item.preco * item.quantidade;
    });

    totalContainer.innerText = `Total: R$${total.toFixed(2)}`;
}



//FIM FUNÇÃO DE ADICIONAR (RELACIONADO AO CARRINH)
//FUNÇÃO ""/FORMULÁRIO

function comprar() {
    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];
    
    modal.style.display = "block";
    
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }

}

function finalizarCompra(){
    document.getElementById("modal-body").innerHTML = '<img src="imagens/green-check-mark-icon-on-transparent-background-free-png-2417119346.png">'
    document.getElementById("pagamento_form").innerHTML = 'Compra finalizada!<br>Obrigado por comprar<br><br><a href="index.html">Voltar ao início</a>'

    localStorage.removeItem("carrinho")
    atualizarCarrinho()
}

document.getElementById('metodos-pagamento').addEventListener('change', function() {
    let metodo = document.getElementById('metodos-pagamento').value
    
    if(metodo === 'cartao'){
        document.getElementById('pagamento_form').innerHTML = `
        <form>
        
        <label for="nome">Nome Completo: </label>
        <input type="text" id="nome">
        
        <br>

        <label for="cpf">CPF: </label>
        <input type="number" id="cpf"><br><br>

        <label for="nome">Número do cartão: </label>
        <input type="number" id="cartao_num"><br>

        <label for="nome">Código de segurança: </label>
        <input type="number" id="cartao_seguranca"><br>

        <label for="nome">Data de expiração: </label><br>
        <input type="number" id="cartao_expiracao_mes" max="99"> /
        <input type="number" id="cartao_expiracao_ano" max="99"><br><br>

        <label for="nome">CEP: </label>
        <input type="number" id="nome"><br>

        <label for="nome">Logradouro: </label>
        <input type="text" id="endereco">

        <label for="nome">nº: </label>
        <input type="number" id="endereco_num"><br>

        <label for="nome">Cidade: </label>
        <input type="text" id="nome"><br>

        <label for="nome">País: </label>
        <input type="text" id="nome"><br>
        </form>
        <br>
        <button onclick="finalizarCompra()">Finalizar</button>
        `;
    }
}
)

function modal(item){
        var modal = document.getElementById("myModal");
    
        var span = document.getElementsByClassName("close")[0];
        
        modal.style.display = "block";

        document.getElementById("modal-body").innerHTML = `O produto "${item}" foi adicionado ao seu carrinho!`
        
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
        }
}


function produtoModal(nome, preço, tipo, imagem, tamanho, descricao){
    document.getElementById('imagem-produto-info').style.backgroundImage = `url('${imagem}')`;
    document.getElementById('produto-info-caracteristicas').innerHTML = 
    `<h2 id="produto-infos">Nome: ${nome}</h2><br>
    <h2 id="produto-infos">Preço: R$${preço.toFixed(2)}</h2><br>
    <h2 id="produto-infos">Tipo: ${tipo}</h2><br>
    <h2 id="produto-infos">Proporções: ${tamanho}</h2><br>
    <hr>
    <h2 id="produto-infos">Descrição:<br></h2> <h3 id="produto-infos-descricao">${descricao}</h3>

    <button id="botao-comprar-modal" onclick="adicionarAoCarrinho('${nome}', ${preço}, '${tipo}', '${imagem}' )">Comprar</button>
    `

    var modal = document.getElementById("produto-info-modal");

    var span = document.getElementsByClassName("fechar")[0];
    
    modal.style.display = "block";
    
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function numeroDeItensCarrinho(){
    const carrinho = JSON.parse(localStorage.getItem('carrinho'))
    document.getElementById("itens_carrinho").innerHTML = carrinho.length
}

document.addEventListener('DOMContentLoaded', numeroDeItensCarrinho);

document.addEventListener('DOMContentLoaded', atualizarCarrinho);