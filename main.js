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


let agreeArray = [];
let disagreeArray = [];
let maisEscolhidos = [] //Criar um Array pra receber os maiores grupos
let segundoMaisEscolhidos = []

//Agilizar o teste de ENDGAME
tipo=8;

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
    for (let x in dados){
        if(x !=='desempate'){
            agreeArray.push({enea:dados[x].tipo, confirm:dados[x].agree=Math.floor(Math.random() * 6)});
            disagreeArray.push(dados[x].eneatipo,dados[x].disagree=Math.floor(Math.random() * 5));
        }
    }

    agreeArray.sort((a, b) => b.confirm - a.confirm) //Organiza por ordem crescente

    maisEscolhidos.push(agreeArray[0]) //Adiciona o eneatipo com maior grupo

    for(let i=1; i<agreeArray.length; i++){ //verifica se há outros eneatipos com a mesma quantidade de confirmações
            if(agreeArray[0].confirm == agreeArray[i].confirm){
            maisEscolhidos.push(agreeArray[i])
        }
    }

    if(maisEscolhidos.length<2){//Se não tiver apenas um eneatipo de maior quantidade de confirmações
        segundoMaisEscolhidos.push(agreeArray[1]) // Adiciona o segundo maior e repete o processo de igualdade
        for(let i=2; i<agreeArray.length; i++){
            if(segundoMaisEscolhidos[0].confirm == agreeArray[i].confirm){
                segundoMaisEscolhidos.push(agreeArray[i])
            }
        }

        if(segundoMaisEscolhidos.length==1){//Finalizado
            maisEscolhidos.push(...segundoMaisEscolhidos)
            console.log('Desempate dos Grupos')
            escolhaFinal()
        }
        
        else{   
            console.log('Desempate dos menores')
            console.log(segundoMaisEscolhidos) //Ainda falta um passo
        }
    }

    else if(maisEscolhidos.length>2){//Se tiver 3 eneatipos com o mesmo maior valor de confirmações, dever-se-á repetir o teste
        iniciar()
        console.log('Refazer o teste')
    }

    else{
        console.log('Apenas dois mais escolhidos')//Proximo passo de desempate.
        escolhaFinal()
    }

    console.log(agreeArray)

}

function coringa(array){

}

function escolha(eneaA, eneaB){//Nome provisório
    for(let x of desempate.cartoes){
        if((x.empate1===eneaA) && (x.empate2===eneaB)){
            return x
        }else if(((x.empate1===eneaA) && (x.empate2===eneaB))===false){
            coringa()
            return console.log(
                desempate.coringa.pergunta,
                desempate.coringa[eneaA],
                desempate.coringa[eneaB]
                )
        }
    }
}


function escolhaFinal(){//Nome provisório
    console.log(maisEscolhidos)
    maisEscolhidos.sort((a, b) => a.enea - b.enea)
    // console.log(dados.desempate.coringa[
    //     maisEscolhidos[0].enea])
    // console.log(dados.desempate.coringa[
    //     maisEscolhidos[1].enea])
    // console.log(escolha(maisEscolhidos[0].enea,maisEscolhidos[1].enea))
    
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

escolha(2,7)