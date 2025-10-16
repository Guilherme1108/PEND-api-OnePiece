'use strict'

const API_PERSONAGENS = 'https://corsproxy.io/?url=https://api.api-onepiece.com/v2/characters/en'

function criarLista(list, posicao) {

    const table = document.getElementById('listWithDados')
    const divRow = document.createElement('div')
    const divNumberWithName = document.createElement('div')

    const number = document.createElement('span')
    const name = document.createElement('span')
    const bounty = document.createElement('span')

    divRow.classList.add('rowTop100')
    divNumberWithName.classList.add('numberMoreName')

    number.classList.add('number')
    name.classList.add('name')
    bounty.classList.add('bounty')

    number.textContent = posicao + 1
    name.textContent = list.name
    bounty.textContent = list.bounty

    table.appendChild(divRow)
    divRow.append(divNumberWithName, bounty)
    divNumberWithName.append(number, name)
}

async function carregarPersonagens() {

    try {
        const response = await fetch(API_PERSONAGENS)
        const data = await response.json()

        // Chama a função top100 passando todos os personagens
        top100(data)
        console.log(data)
    } catch (error) {
        console.error('Erro ao carregar personagens:', error)
    }
}

function top100(dados) {
    // Filtra apenas personagens com bounty válido
    const withBounty = dados.filter(personagem => personagem.bounty && personagem.bounty.trim() !== '')

    // Converte a string de bounty para número
    const parsed = withBounty.map(personagem => ({
        ...personagem,
        bountyValue: Number(personagem.bounty.replaceAll('.', '').replaceAll(',', '').trim())
    }))

    // Ordena do maior para o menor
    parsed.sort((a, b) => b.bountyValue - a.bountyValue)

    // Pega os top 100 (ou menos, se tiver menos personagens)
    const top100 = parsed.slice(0, 100)

    // Chama a função criarLista para cada personagem
    top100.forEach((personagem, index) => criarLista(personagem, index))
}


// Executa a função
carregarPersonagens()