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
    p.innerText = `R$ ${produto.preco.toFixed(2)}` 

    li.append(img, h3, span, p)

    return li
}



function adicionarNaTela (listaProdutos){
    let containerListaProdutos = document.querySelector(".containerListaProdutos")
    containerListaProdutos.innerHTML = ""

    let ul = document.createElement("ul")

    let total = 0

    listaProdutos.forEach(element => {
        ul.append(criarCard(element))
        total += element.preco
    });
    
    containerListaProdutos.append(ul)

    let precoDaSecao = document.querySelector(".precoDaSecao")
    precoDaSecao.innerText = `R$ ${total.toFixed(2)}`    
}

adicionarNaTela(produtos)



let botoesContainer = document.querySelector("#botoesContainer")

botoesContainer.addEventListener("click", botoesPesquisa)

function botoesPesquisa(event){
    let target = event.target

    if(target.tagName == "BUTTON"){
        filtrarProdutos(target.innerText)
    }
}



function filtrarProdutos (pesquisa){
    let produtosFiltrados = []

    if(pesquisa == "Todos Produtos"){
        return adicionarNaTela(produtos)
    }

    produtos.forEach(element => {
        let nome = element.nome.toUpperCase()
        let secao = element.secao.toUpperCase()

        pesquisa = pesquisa.toUpperCase()

        if(secao == pesquisa || nome.includes(pesquisa)){
            produtosFiltrados.push(element)
        }
    })
    return adicionarNaTela(produtosFiltrados)
}



let containerBuscaPorNome = document.querySelector(".containerBuscaPorNome")

containerBuscaPorNome.addEventListener("click", pesquisaInput)

function pesquisaInput(event){
    let input = document.querySelector(".campoBuscaPorNome")
    
    let target = event.target

    if(target.tagName == "BUTTON" || target.tagName == "IMG"){
        filtrarProdutos(input.value)
    }
    input.value = ""    
}