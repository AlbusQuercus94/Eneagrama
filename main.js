import {dados} from "./dados.js" //Importando os dados

const novetipo = Object.keys(dados) //Para poder alterar as cores do css.

const {perfeicao, prestatividade, performance, profundidade, privacidade, planejamento, prazer, poder, paz, desempate} = dados // Criando constantes com cada tipo de carta eneatipo e desempate.

//DOM
const content = document.querySelector('#content')
const main = document.querySelector('#main')
const card = document.querySelector('#card')
const comecar = document.querySelector('#iniciar')
const btnAgree = document.querySelector('#agree')
const btnDisagree = document.querySelector('#disagree')

var teste = dados[novetipo[0]]
var carta = 0
var tipo = 0


for(let x in desempate.cartoes){
    if(desempate.cartoes[x].empate1===3 && desempate.cartoes[x].empate2===6){
        console.log(desempate.cartoes[x].pergunta)
        console.log(desempate.cartoes[x].opcao1)
        console.log(desempate.cartoes[x].opcao2)
    }
}

for (let x in dados){
    if(dados[x] == 'desempate'){
        continue
    }else{
        dados[x].agree = 0;
        dados[x].disagree = 0;
    }
}


function iniciar(){
    comecar.style.visibility = 'hidden'
    card.style.visibility = 'visible'
    
    content.innerHTML = `<p>${teste.cartoes[carta].afirmacao}</p>`
    content.style.color = `var(--${novetipo[tipo]}-txt-color)`
    document.querySelector('.card').style.backgroundColor = `var(--${novetipo[tipo]}-bg-color)`
}


btnAgree.addEventListener('click', () => {
    if(carta>7){
        carta = 0
        tipo++
    }else{
        carta++
    }
    var teste = dados[novetipo[tipo]]
    perfeicao.agree+=1;
    console.log(teste, carta)
    content.innerHTML = `<p>${teste.cartoes[carta].afirmacao}</p>`
    content.style.color = `var(--${novetipo[tipo]}-txt-color)`
    document.querySelector('.card').style.backgroundColor = `var(--${novetipo[tipo]}-bg-color)`
})

btnDisagree.addEventListener('click', () => {
    if(carta>7){
        carta = 0
        tipo++
    }else{
        carta++
    }
    var teste = dados[novetipo[tipo]]
    teste.disagree+=1;
    console.log(teste, carta)
    content.innerHTML = `<p>${teste.cartoes[carta].afirmacao}</p>`
    content.style.color = `var(--${novetipo[tipo]}-txt-color)`
    document.querySelector('.card').style.backgroundColor = `var(--${novetipo[tipo]}-bg-color)`
})


comecar.addEventListener('click', iniciar)