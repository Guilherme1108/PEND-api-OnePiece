'use strict'

// URL da API buscando frutas
const API_URL = 'https://api.api-onepiece.com/v2/fruits/en'

// Seleciona o elemento main
const mainCatalog = document.getElementById('catalog')

// Cria um container para os cards
const cardsContainer = document.createElement('div')
cardsContainer.classList.add('cards-container')
mainCatalog.appendChild(cardsContainer)

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

    imgFruit.src = `${cards.filename}`
    // Se a imagem não carregar vai colocar uma padrão
    imgFruit.onerror = () => {
        imgFruit.src = './img/imgNotFound.png';
    };

    fruitOriginalName.textContent = cards.roman_name //verifica se existe
        && cards.roman_name.trim() !== ''  //verifica se não é só espaços em branco
        ? cards.roman_name : 'Nome desconhecido'; //se for vdd usa o roman name, se for falso usa o nome desconhecido

    fruitCommumName.textContent = cards.name
        && cards.name.trim() !== ''
        ? cards.name : 'Nome comum não conhecido';

    divCard.append(imgFruit, fruitOriginalName, fruitCommumName)

    // Quando clicar no card, abre o modal com detalhes
    divCard.addEventListener('click', () => {
        abrirModal(cards);
    });

    return divCard
}

// Função para abrir o modal com detalhes da fruta
function abrirModal(fruit) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <h2>${fruit.name || 'Nome não conhecido'}</h2>
        <img src="https://corsproxy.io/?url=${fruit.filename}" 
             onerror="this.src='./img/imgNotFound.png';">
        <p><strong>Original Name:</strong> ${fruit.roman_name || 'Desconhecido'}</p>
        <p><strong>Type:</strong> ${fruit.type || 'Tipo não informado'}</p>
        <p><strong>Description:</strong> ${fruit.description || 'Sem descrição disponível.'}</p>
        <button id="close-modal">Fechar</button>
    `;

    modal.classList.remove('hidden');

    document.getElementById('close-modal').addEventListener('click', fecharModal);
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
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