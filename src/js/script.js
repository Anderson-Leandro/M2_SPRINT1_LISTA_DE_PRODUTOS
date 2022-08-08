function criarCard(produto, secao) {

    let li = document.createElement("li")

    let img = document.createElement("img")
    img.src = produto.img
    img.alt = produto.nome
    img.classList.add("imgProduto")

    let h3 = document.createElement("h3")
    h3.innerText = produto.nome

    let span = document.createElement("span")
    span.innerText = produto.secao

    let p = document.createElement("p")
    p.innerText = `R$ ${produto.preco}`


    // novidades

    let olVitaminas = document.createElement("ol")

    produto.componentes.forEach((element) => {
        let vitamina = document.createElement("li")
        vitamina.classList.add("vitaminas")
        vitamina.innerText = `${element}`
        olVitaminas.appendChild(vitamina)
    })

    let div = document.createElement("div")


    let botao = document.createElement("button")

    if (secao == listaCarrinho) {
        div.classList.add("descricaoProduto")

        botao.classList.add("remover")
        botao.id = produto.id

        let imgRemover = document.createElement("img")
        imgRemover.src = "./src/img/trash.png"
        imgRemover.id = produto.id
        botao.appendChild(imgRemover)

        div.append(h3, span, p)

        let divQuantidadeEBotao = document.createElement("div")
        divQuantidadeEBotao.classList.add("divQuantidadeEBotao")

        let spanQuantidade = document.createElement("span")
        spanQuantidade.classList.add("quantidadeDeItem")
        spanQuantidade.id = produto.id

        divQuantidadeEBotao.append(botao, spanQuantidade)


        li.append(img, div, divQuantidadeEBotao)

    }
    else {
        botao.classList.add("comprar")
        botao.innerText = "Comprar"
        botao.id = produto.id

        div.append(p, botao)

        li.append(img, h3, span, olVitaminas, div)

    }

    return li
}

let containerListaProdutos = document.querySelector(".containerListaProdutos")
let listaCarrinho = document.querySelector(".listaCarrinho")

function adicionarNaTela(listaProdutos, secao) {

    secao.innerHTML = ""

    let ul = document.createElement("ul")

    if (secao == containerListaProdutos) {
        ul.classList.add("listaDeProdutos")
    }
    else {
        ul.classList.add("listaDeProdutosCarrinho")
    }

    let itensJaListados = []
    listaProdutos.forEach(element => {
        if (!itensJaListados.includes(element.id)) {
            itensJaListados.push(element.id)
            ul.append(criarCard(element, secao))
        }

    });

    secao.append(ul)
}

adicionarNaTela(produtos, containerListaProdutos)



let botoesContainer = document.querySelector("#botoesContainer")

botoesContainer.addEventListener("click", botoesPesquisa)

function botoesPesquisa(event) {
    let target = event.target

    if (target.tagName == "BUTTON") {
        filtrarProdutos(target.innerText)
    }
}



function filtrarProdutos(pesquisa) {
    let produtosFiltrados = []

    if (pesquisa == "Todos Produtos") {
        return adicionarNaTela(produtos, containerListaProdutos)
    }

    produtos.forEach(element => {
        let nome = element.nome.toUpperCase()
        let secao = element.secao.toUpperCase()
        let categoria = element.categoria.toUpperCase()

        pesquisa = pesquisa.toUpperCase()

        if (secao == pesquisa || categoria == pesquisa || nome.includes(pesquisa)) {
            produtosFiltrados.push(element)
        }
    })
    return adicionarNaTela(produtosFiltrados, containerListaProdutos)
}



let containerBuscaPorNome = document.querySelector(".containerBuscaPorNome")

containerBuscaPorNome.addEventListener("click", pesquisaInput)
containerBuscaPorNome.addEventListener("keyup", pesquisaInput)

function pesquisaInput(event) {
    let input = document.querySelector(".campoBuscaPorNome")

    let target = event.target

    let teclaPressionada = event.keyCode

    if (input.value.length > 2 && teclaPressionada == 13 || target.tagName == "BUTTON" || target.tagName == "IMG") {
        filtrarProdutos(input.value)
        input.value = ""
    }
}

const carrinhoDeCompras = []
let quantidade = document.querySelector(".quantidadeValor")
let totalCarrinho = document.querySelector(".valorTotal")

containerListaProdutos.addEventListener("click", (event) => {
    const target = event.target
    if (target.tagName == "BUTTON") {
        produtos.forEach(element => {
            if (element.id == target.id) {
                carrinhoDeCompras.push(element)

            }
        })
        removeClasse()
        atualizandoValores()
        adicionarNaTela(carrinhoDeCompras, listaCarrinho)
        adicionaQuantidadeDeItens()
    }

})

function removeClasse() {
    if (carrinhoDeCompras.length > 0) {
        document.querySelector(".totaisCarrinho").classList.remove("naoMostrar")
    }
    else {
        document.querySelector(".totaisCarrinho").classList.add("naoMostrar")
        listaCarrinho.innerHTML =
            '<img src="./src/img/shopping-bag.png" alt="Carrinho vazio"> <p>Por enquanto não temos produtos no carrinho</p>'
    }
}


function atualizandoValores() {
    let total = 0

    carrinhoDeCompras.forEach(element => {
        total += +element.preco
    })

    totalCarrinho.innerText = `R$ ${total.toFixed(2)}`
    quantidade.innerText = carrinhoDeCompras.length
}


listaCarrinho.addEventListener("click", (event) => {
    let target = event.target

    if ((target.id > 0 && target.tagName == "BUTTON") || (target.id > 0 && target.tagName == "IMG")) {
        let index = carrinhoDeCompras.lastIndexOf(carrinhoDeCompras.find((element) => element.id == target.id))

        carrinhoDeCompras.splice(index, 1)

        adicionarNaTela(carrinhoDeCompras, listaCarrinho)
        atualizandoValores()
        removeClasse()
        adicionaQuantidadeDeItens()
    }
})


function adicionaQuantidadeDeItens() {

    let teste = document.querySelectorAll(".quantidadeDeItem")

    teste.forEach((element, index) => {

        let cont = 0

        carrinhoDeCompras.forEach(elementCarrinho => {
            if (elementCarrinho.id == element.id) {
                cont++
            }
        })
        teste[index].innerText = "x" + cont
    })

}