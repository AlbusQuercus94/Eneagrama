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
const wrapper = document.querySelector('.wrapper')

/*
const getInputs = document.querySelectorAll('.tabs input')
const inputs = {...getInputs}

console.log(getInputs.length)
document.querySelector('.glider').style.width = `calc(((98%) - (0.75rem))/ ${getInputs.length})`

console.log(inputs[2].checked)

for(let x in inputs){
    inputs[x].checked=true
    console.log(inputs[x])
}
*/
let liBTN = document.querySelector('.liBTN')

var eneatipo = dados[novetipo[0]]
var carta = 0
var tipo = 0

let agreeArray = [];
let disagreeArray = [];
let maisEscolhidos = [] //Criar um Array pra receber os maiores grupos
let segundoMaisEscolhidos = []

//Globalizando a função
window.coringa = coringa
window.fimDeJogo = fimDeJogo

//Agilizar o teste de eneatipoMaisEscolhido


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

    reset()

    content.innerHTML = ` <p class="afirmacao">${dados[novetipo[tipo]].cartoes[carta].afirmacao}</p>`
    content.style.color = `var(--${novetipo[tipo]}-txt-color)`
    document.querySelector('.card').style.backgroundColor = `var(--${novetipo[tipo]}-bg-color)`

    
}

function proximo(){
    if(carta==8){
        carta = 0
        tipo++
    }else{
        carta++
    }
}

function reset(){
    carta = 0
    tipo = 0
    for (let x in dados){
        if(x === 'desempate'){
            continue
        }else{
            dados[x].agree = 0;
            dados[x].disagree = 0;
        }
    }
}

function eneatipoMaisEscolhido(){
    for (let x in dados){
        if(x !=='desempate'){
            agreeArray.push({enea:dados[x].tipo, confirm:dados[x].agree});
            disagreeArray.push(dados[x].eneatipo,dados[x].disagree);
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
            // iniciar() //para o teste
            escolhaFinal()
        }
        
        else{   
            console.log('Desempate dos menores')
            // iniciar() //para o teste
            desempateDosGrupos(segundoMaisEscolhidos)
        }
    }

    else if(maisEscolhidos.length>2){//Se tiver 3 eneatipos com o mesmo maior valor de confirmações, dever-se-á repetir o teste
        iniciar()
        console.log('Refazer o teste')
    }

    else{
        console.log('Apenas dois mais escolhidos')//Proximo passo de desempate.
        
        // iniciar() //para o teste
        escolhaFinal()
    }

    console.log(agreeArray)

}

function coringa(id){
    maisEscolhidos.push(segundoMaisEscolhidos[id])
    escolhaFinal()
}

function desempateDosGrupos(arr){
    content.innerHTML = ` <p class="afirmacao">${desempate.coringa.pergunta}</p>`
    content.innerHTML += `<ul></ul>`
    const ul = document.querySelector('ul')
    wrapper.style.visibility='hidden'

    for(let i=0; i<arr.length; i++) {
        ul.innerHTML += `<li>
                <button id = "${i}"class='liBTN' onclick='coringa(this.id)'>
                    ${desempate.coringa[arr[i].enea]}
                </button>
            </li>`
    }
    
    let liOption = document.querySelectorAll('LI')

    content.style.color = `var(--desempate-txt-color)`
    document.querySelector('.card').style.backgroundColor = `var(--desempate-bg-color)`
}

function escolha(eneaA, eneaB){//Nome provisório
    let count = 0;
    for(let x of desempate.cartoes){
        if(x.empate1===eneaA && x.empate2===eneaB){

            console.log('Entrou aqui')

            content.innerHTML = `<p>${x.pergunta}</p>`
            content.innerHTML += `<ul></ul>`
            const ul = document.querySelector('ul')
            ul.innerHTML += 
                `<li>
                    <button id="${eneaA}" class='liBTN' onclick='fimDeJogo(this.id)'>
                        ${x.opcao1}
                    </button>
                </li>`
            ul.innerHTML += 
                `<li>
                    <button id="${eneaB}" class='liBTN' onclick='fimDeJogo(this.id)'>
                        ${x.opcao2}
                    </button>
                </li>`
            content.style.color = `var(--desempate-txt-color)`
            document.querySelector('.card').style.backgroundColor = `var(--desempate-bg-color)`
        }else{
            count++
            if(count==18){
                console.log('só tem falso aqui')
                
                content.innerHTML = ` <p class="afirmacao">${desempate.coringa.pergunta}</p>`
                content.innerHTML += `<ul></ul>`
                const ul = document.querySelector('ul')
                for(let i=0; i<2; i++) {
                    ul.innerHTML += 
                    `<li>
                    <button id = "${maisEscolhidos[i].enea}" class='liBTN' onclick='fimDeJogo(this.id)'>
                        ${desempate.coringa[maisEscolhidos[i].enea]}
                        </button>
                    </li>`
                }
                content.style.color = `var(--desempate-txt-color)`
                document.querySelector('.card').style.backgroundColor = `var(--desempate-bg-color)`
            }
        } 
    }
}

function escolhaFinal(){//Nome provisório
    wrapper.style.visibility='hidden'
    
    maisEscolhidos.sort((a, b) => a.enea - b.enea)
    console.log(maisEscolhidos[0].enea)
    escolha(maisEscolhidos[0].enea,maisEscolhidos[1].enea)
    
}

function fimDeJogo(id){
    eneatipo = dados[novetipo[id-1]]
    content.innerHTML = `<h1>${eneatipo.eneatipo}</h1>`
    
}


btnAgree.addEventListener('click', () => {

    eneatipo.agree+=1;
    proximo()

    if(tipo==9){
        console.log('Fim de Jogo')
        eneatipoMaisEscolhido()
    }
    else{
        eneatipo = dados[novetipo[tipo]]
        content.innerHTML = ` <p class="afirmacao">${eneatipo.cartoes[carta].afirmacao}</p>`
        content.style.color = `var(--${novetipo[tipo]}-txt-color)`
        document.querySelector('.card').style.backgroundColor = `var(--${novetipo[tipo]}-bg-color)`
    }
})

btnDisagree.addEventListener('click', () => {

    eneatipo.disagree+=1;
    proximo()

    if(tipo==9){
        console.log('Fim de Jogo')
        eneatipoMaisEscolhido()
    }
    else{
        eneatipo = dados[novetipo[tipo]]
        content.innerHTML = ` <p class="afirmacao">${eneatipo.cartoes[carta].afirmacao}</p>`
        content.style.color = `var(--${novetipo[tipo]}-txt-color)`
        document.querySelector('.card').style.backgroundColor = `var(--${novetipo[tipo]}-bg-color)`
    }
})


// eneatipoMaisEscolhido()

comecar.addEventListener('click', iniciar)
// iniciar()


