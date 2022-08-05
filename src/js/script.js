function criarCard(produto) {

    let li = document.createElement("li")

    let img = document.createElement("img")
    img.src = produto.img
    img.alt = produto.nome

    let h3 = document.createElement("h3")
    h3.innerText = produto.nome

    let span = document.createElement("span")
    span.innerText = produto.secao

    let p = document.createElement("p")
    p.innerText = `R$ ${produto.preco}`


    // novidades

    let pVitaminas = document.createElement("p")

    produto.componentes.forEach((element, index) => {
        let vitamina = document.createElement("span")
        vitamina.classList.add("vitaminas")
        vitamina.innerText = `${index + 1}. ${element}`

        let quebraDeLinha = document.createElement("br")
        pVitaminas.append(vitamina, quebraDeLinha)
    })

    let div = document.createElement("div")

    let botaoComprar = document.createElement("button")

    div.append(p, botaoComprar)


    li.append(img, h3, span, pVitaminas, div)

    return li
}



function adicionarNaTela(listaProdutos) {
    let containerListaProdutos = document.querySelector(".containerListaProdutos")
    containerListaProdutos.innerHTML = ""

    let ul = document.createElement("ul")

    listaProdutos.forEach(element => {
        ul.append(criarCard(element))
    });

    containerListaProdutos.append(ul)
}

adicionarNaTela(produtos)



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
        return adicionarNaTela(produtos)
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
    return adicionarNaTela(produtosFiltrados)
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