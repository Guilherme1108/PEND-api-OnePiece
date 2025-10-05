'use strict'

// URL da API
const API_URL = 'https://api.api-onepiece.com/v2/fruits/en'

// Seleciona o elemento main
const main = document.querySelector('main')

// Cria um container para os cards
const cardsContainer = document.createElement('div')
cardsContainer.classList.add('cards-container')
main.appendChild(cardsContainer)

//Criando os cards
function criarCards(cards) {
    const divCard = document.createElement('div')

    const imgFruit = document.createElement('img')
    const fruitOriginalName = document.createElement('span')
    const fruitCommumName = document.createElement('span')

    divCard.classList.add('card')
    imgFruit.classList.add('img')
    fruitOriginalName.classList.add('fruitOriginalName')
    fruitCommumName.classList.add('fruitCommunName')

    imgFruit.src = cards.filename
    fruitOriginalName.textContent = cards.roman_name
    fruitCommumName.textContent = cards.name

    divCard.append(imgFruit, fruitOriginalName, fruitCommumName)

    return divCard
}

// Função para carregar as frutas da API
async function carregarCards() {
        try {
    const response = await fetch(API_URL)
    const fruits = await response.json()

        fruits.forEach(fruit => {
            const card = criarCards(fruit)
            cardsContainer.appendChild(card)
        })
            } catch (error) {
        console.error('Erro ao carregar frutas:', error)
    }
}

carregarCards()