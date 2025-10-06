'use strict'


const botaoBuscar = document.getElementById('search')
const containerGeral = document.getElementById('container-geral')
const containerEsquerda = document.getElementById('container-esquerda')
const containerDireita = document.getElementById('container-direita')

async function buscarTodasImagens() {
    const url = `https://api.disneyapi.dev/character`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

async function criarImagens() {
    containerGeral.textContent = ''
    containerDireita.textContent = ''
    containerEsquerda.textContent = ''
    const fotos = await buscarTodasImagens()

    fotos.data.forEach(imagem => {
        const a = document.createElement('a')
        const img = document.createElement('img')
        img.src = imagem.imageUrl
        a.addEventListener('click', function () {
            exibirDetalhesPersonagem(img.src, fotos)
        })
        a.appendChild(img)
        containerGeral.appendChild(a)
    })
}

async function buscarPersonagem(personagem) {
    const url = `https://api.disneyapi.dev/character?name=${personagem}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

async function criarImagensPersonagem() {
    containerGeral.textContent = ''
    containerDireita.textContent = ''
    containerEsquerda.textContent = ''
    const input = document.getElementById('caixa-de-pesquisa').value
    const fotos = await buscarPersonagem(input)

    fotos.data.forEach((imagem) => {
        const a = document.createElement('a')
        const img = document.createElement('img')
        img.src = imagem.imageUrl
        a.addEventListener('click', function () {
            exibirDetalhesPersonagem(img.src, fotos)
        })
        a.appendChild(img)
        containerGeral.appendChild(a)
    })

}

async function exibirDetalhesPersonagem(urlImage, dados) {
    containerGeral.textContent = ''
    containerDireita.textContent = ''
    containerEsquerda.textContent = ''
    const informacoes = await dados
    informacoes.data.forEach(detalhes => {
        if (detalhes.imageUrl === urlImage) {
            const h2 = document.createElement('h2')
            h2.textContent = detalhes.name

            const img = document.createElement('img')
            img.src = detalhes.imageUrl
            containerEsquerda.appendChild(h2)
            containerEsquerda.appendChild(img)

            if (detalhes.films.length > 0) {
                const h3 = document.createElement('h3')
                h3.textContent = 'Filmes:'
                containerDireita.appendChild(h3)
                const ul = document.createElement('ul')
                detalhes.films.forEach(lista => {
                    const li = document.createElement('li')
                    li.textContent = lista

                    ul.appendChild(li)
                    containerDireita.appendChild(ul)
                })
            }

            if (detalhes.shortFilms.length > 0) {
                const h3 = document.createElement('h3')
                h3.textContent = 'Curtas Metragens:'
                containerDireita.appendChild(h3)
                const ul = document.createElement('ul')
                detalhes.shortFilms.forEach(lista => {
                    const li = document.createElement('li')
                    li.textContent = lista

                    ul.appendChild(li)
                    containerDireita.appendChild(ul)
                })
            }

            if (detalhes.tvShows.length > 0) {
                const h3 = document.createElement('h3')
                h3.textContent = 'Programas de TV:'
                containerDireita.appendChild(h3)
                const ul = document.createElement('ul')
                detalhes.tvShows.forEach(lista => {
                    const li = document.createElement('li')
                    li.textContent = lista

                    ul.appendChild(li)
                    containerDireita.appendChild(ul)
                })
            }

            if (detalhes.videoGames.length > 0) {
                const h3 = document.createElement('h3')
                h3.textContent = 'Jogos:'
                containerDireita.appendChild(h3)
                const ul = document.createElement('ul')
                detalhes.videoGames.forEach(lista => {
                    const li = document.createElement('li')
                    li.textContent = lista

                    ul.appendChild(li)
                    containerDireita.appendChild(ul)
                })
            }

            if (detalhes.parkAttractions.length > 0) {
                const h3 = document.createElement('h3')
                h3.textContent = 'Atrações de parque:'
                containerDireita.appendChild(h3)
                const ul = document.createElement('ul')
                detalhes.parkAttractions.forEach(lista => {
                    const li = document.createElement('li')
                    li.textContent = lista

                    ul.appendChild(li)
                    containerDireita.appendChild(ul)
                })
            }

            if (detalhes.allies.length > 0) {
                const h3 = document.createElement('h3')
                h3.textContent = 'Aliados:'
                containerDireita.appendChild(h3)
                const ul = document.createElement('ul')
                detalhes.allies.forEach(lista => {
                    const li = document.createElement('li')
                    li.textContent = lista

                    ul.appendChild(li)
                    containerDireita.appendChild(ul)
                })
            }

            if (detalhes.enemies.length > 0) {
                const h3 = document.createElement('h3')
                h3.textContent = 'Inimigos:'
                containerDireita.appendChild(h3)
                const ul = document.createElement('ul')
                detalhes.enemies.forEach(lista => {
                    const li = document.createElement('li')
                    li.textContent = lista

                    ul.appendChild(li)
                    containerDireita.appendChild(ul)
                })
            }


        }
    })

}

const verificarEnter = function (event) {
    if (event.key === 'Enter')
        criarImagensPersonagem()
}


botaoBuscar.addEventListener('keypress', criarImagensPersonagem)
botaoBuscar.addEventListener('click', criarImagensPersonagem)

criarImagens()