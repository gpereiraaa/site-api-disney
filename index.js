'use strict'


const botaoBuscar = document.getElementById('search')
const main = document.getElementById('main')

async function buscarTodasImagens() {
    const url = `https://api.disneyapi.dev/character`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

async function criarImagens(){
    

    const fotos = await buscarTodasImagens()

    fotos.data.forEach(imagem => {
        const img = document.createElement('img')
        img.src = imagem.imageUrl
        main.appendChild(img)
    })
}

async function buscarPersonagem(personagem) {
    const url = `https://api.disneyapi.dev/character?name=${personagem}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

async function criarImagensPersonagem() {
    main.textContent = ''
    const input = document.getElementById('caixa-de-pesquisa').value
    const fotos = await buscarPersonagem(input)

    fotos.data.forEach(imagem => {
        const img = document.createElement('img')
        img.src = imagem.imageUrl
        main.appendChild(img)
    })
    
}

const verificarEnter = function (event){
    if (event.key === 'Enter') 
        criarImagensPersonagem()
}


botaoBuscar.addEventListener('keypress', criarImagensPersonagem)
botaoBuscar.addEventListener('click', criarImagensPersonagem)

criarImagens()