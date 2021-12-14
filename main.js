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

var eneatipo = dados[novetipo[0]]
var carta = 0
var tipo = 0


//Agilizar o teste de ENDGAME
tipo=8;

for(let x in desempate.cartoes){
    if(desempate.cartoes[x].empate1===3 && desempate.cartoes[x].empate2===6){
        console.log(desempate.cartoes[x].pergunta)
        console.log(desempate.cartoes[x].opcao1)
        console.log(desempate.cartoes[x].opcao2)
    }
}

for (let x in dados){
    if(x === 'desempate'){
        continue
    }else{
        dados[x].agree = 0;
        dados[x].disagree = 0;
    }
}


function iniciar(){
    comecar.style.visibility = 'hidden'
    card.style.visibility = 'visible'
    
    content.innerHTML = `<p>${eneatipo.cartoes[carta].afirmacao}</p>`
    content.style.color = `var(--${novetipo[tipo]}-txt-color)`
    document.querySelector('.card').style.backgroundColor = `var(--${novetipo[tipo]}-bg-color)`
}

function proximo(){
    if(carta>7){
        carta = 0
        tipo++
    }else{
        carta++
    }
}



function endgame(){
    let agreeArray = [];
    let disagreeArray = [];
    for (let x in dados){
        if(x !=='desempate'){
            agreeArray.push({enea:dados[x].eneatipo, confirm:dados[x].agree=Math.floor(Math.random() * 6)});
            disagreeArray.push(dados[x].eneatipo,dados[x].disagree=Math.floor(Math.random() * 5));
        }
    }

    agreeArray.sort((a, b) => b.confirm - a.confirm)

    for(let i=0; i<agreeArray.length; i++){
        let count = 0
        for(let j=0; j<agreeArray.length; j++){
            if(i!=j && agreeArray[i].confirm === agreeArray[j].confirm){
                count++
            }
        }
        console.log(agreeArray[i].enea,count)
    }

    console.log(agreeArray)

}


btnAgree.addEventListener('click', () => {
    if(tipo==9){
        console.log('Fim de Jogo')
        endgame()
    }
    else{
        eneatipo = dados[novetipo[tipo]]
        eneatipo.agree+=1;
        content.innerHTML = `<p>${eneatipo.cartoes[carta].afirmacao}</p>`
        content.style.color = `var(--${novetipo[tipo]}-txt-color)`
        document.querySelector('.card').style.backgroundColor = `var(--${novetipo[tipo]}-bg-color)`
    }
    proximo()
})

btnDisagree.addEventListener('click', () => {
    if(tipo==9){
        console.log('Fim de Jogo')
        endgame()
    }
    else{
        eneatipo = dados[novetipo[tipo]]
        eneatipo.disagree+=1;
        content.innerHTML = `<p>${eneatipo.cartoes[carta].afirmacao}</p>`
        content.style.color = `var(--${novetipo[tipo]}-txt-color)`
        document.querySelector('.card').style.backgroundColor = `var(--${novetipo[tipo]}-bg-color)`
    }
    proximo()
})

endgame()

comecar.addEventListener('click', iniciar)
