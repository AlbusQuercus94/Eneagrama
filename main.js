import {dados} from "./dados.js" //Importando os dados

const eneatipo = Object.keys(dados) //Para poder alterar as cores do css.

const {perfeicao, prestatividade, performance, profundidade, privacidade, planejamento, prazer, poder, paz, desempate} = dados // Criando constantes com cada tipo de carta eneatipo e desempate.

const content = document.querySelector('#content')
const main = document.querySelector('#main')
const card = document.querySelector('#card')

for(let x in desempate.cartoes){
    if(desempate.cartoes[x].empate1===3 && desempate.cartoes[x].empate2===6){
        console.log(desempate.cartoes[x].pergunta)
        console.log(desempate.cartoes[x].opcao1)
        console.log(desempate.cartoes[x].opcao2)
    }
}


var comecar = document.querySelector('#iniciar')

function iniciar(){
    comecar.style.visibility = 'hidden'
    card.style.visibility = 'visible'
}



comecar.addEventListener('click', iniciar)

content.innerHTML = `<p>${performance.cartoes[3].afirmacao}</p>`
content.style.color = `var(--${eneatipo[8]}-txt-color)`
document.querySelector('.card').style.backgroundColor = `var(--${eneatipo[8]}-bg-color)`