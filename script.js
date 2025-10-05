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
    // Se a imagem não carregar vai colocar uma padrão
    imgFruit.onerror = () => {
        imgFruit.src = './img/imgNotFound.png';
    };

fruitOriginalName.textContent = cards.roman_name //verifica se existe
                              && cards.roman_name.trim()!== ''  //verifica se não é só espaços em branco
                              ? cards.roman_name : 'Nome desconhecido'; //se for vdd usa o roman name, se for falso usa o nome desconhecido

fruitCommumName.textContent = cards.name
                            && cards.name.trim() !== '' 
                            ? cards.name : 'Nome comum não conhecido';

    divCard.append(imgFruit, fruitOriginalName, fruitCommumName)

    return divCard
}

// Função para carregar as frutas da API
async function carregarCards() {
    try {
        const response = await fetch(API_URL) //faz uma requsição para a API
        const fruits = await response.json() //converte o json paraa objeto

        fruits.forEach(fruit => { //percorre a o objeto
            const card = criarCards(fruit)
            cardsContainer.appendChild(card) //adiciona o card dentro do container
        })
    } catch (error) {
        console.error('Erro ao carregar frutas:', error)
    }
}

carregarCards()