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

    agreeArray.sort((a, b) => b.confirm - a.confirm) //Organiza por ordem crescente
    
    let group = [] //Criar um Array pra receber os maiores grupos

    group.push(agreeArray[0]) //Adiciona o eneatipo com maior grupo

    for(let i=1; i<agreeArray.length; i++){ //verifica se há outros eneatipos com a mesma quantidade de confirmações
            if(agreeArray[0].confirm == agreeArray[i].confirm){
            group.push(agreeArray[i])
        }
    }
    // console.log(group) //Teste de desenvolvimento

    if(group.length<2){//Se não tiver apenas um eneatipo de maior quantidade de confirmações
    group.push(agreeArray[1]) // Adiciona o segundo maior e repete o processo de igualdade
        for(let i=2; i<agreeArray.length; i++){
            if(agreeArray[1].confirm == agreeArray[i].confirm){
                group.push(agreeArray[i])
            }
        }
        console.log('Desempate das menores')
        console.log(group) //Ainda falta um passo
    }else if(group.length>2){//Se tiver 3 eneatipos com o mesmo maior valor de confirmações, dever-se-á repetir o teste
        console.log('Refazer o teste')
    }else{
        console.log(group.length)//Proximo passo de desempate.
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
