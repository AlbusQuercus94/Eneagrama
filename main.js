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
const home = document.querySelector('.home')

const getInputs = document.querySelectorAll('.tabs input')
const inputs = {...getInputs}
/*
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

console.log(eneatipo.texto)

function navbar(id){
    switch (id){
    case 'radio-1':
        console.log(home);
        main.innerHTML="";
        main.appendChild(home)
        break
    case 'radio-2':
        console.log(id);
        main.innerHTML = `
            <div class='regras'>
                <h1>Regras</h1>
                <p>O eneagrama é um teste de personalidade, portanto leve o tempo que precisar para fazê-lo.</p>
                <p>O teste é simples, aparecerá uma carta com uma frase e você deverá escolher se concorda ou discorda.</p>
                <p>São 9 cores de cartas e ao fim será contado quantas você concordou de cada tipo e selecionaremos as duas mais escolhidas para fazer um teste final.</p>
                <p>Se o teste recomeçar, significa que você teve 3 ou mais tipos de cores com o maior número de confirmações (exemplo: 6 confirmações cor 1, 6 confirmações cor 2, 6 confirmações cor 3).</p>
                <p>Ao fim você saberá seu eneagrama.</p>
                <p>Este teste é apenas um treinamento de programação. Se você quer saber mais ou ter algo fidegno, vá no saiba mais e veja os links sobre o Eneagrama</p>
            </div>
            `
        break
    case 'radio-3':
        console.log(id);
        main.innerHTML = `
            <div class='saibamais'>
                <ul>
                    <li>
                        <a href='https://br.arica.org/the-enneagram' target="_blank">
                            The eneagram
                        </a>
                    </li>
                    <li>
                        <a href='https://www.vittude.com/blog/eneagrama/' target="_blank">
                            Eneagrama: conheça os 9 tipos de personalidade
                        </a>
                    </li>
                    <li>
                        <a href='https://www.sbie.com.br/blog/os-9-tipos-de-personalidade-do-eneagrama-e-como-psicologia-explica-o-teste/' target="_blank">
                        Os 9 tipos de personalidade do Eneagrama e como a psicologia explica o teste

                        </a>
                    </li>
                </ul>
                </div>
            `
        break
    }
}

window.navbar = navbar

console.log(inputs[0].id)

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
    console.log(carta, tipo)
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
                <p id = "${i}"class='liBTN' onclick='coringa(this.id)'>
                    ${desempate.coringa[arr[i].enea]}
                </ <p>
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
                    <p id="${eneaA}" class='liBTN' onclick='fimDeJogo(this.id)'>
                        ${x.opcao1}
                    </ <p>
                </li>`
            ul.innerHTML += 
                `<li>
                    <p id="${eneaB}" class='liBTN' onclick='fimDeJogo(this.id)'>
                        ${x.opcao2}
                    </ <p>
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
                    <p id = "${maisEscolhidos[i].enea}" class='liBTN' onclick='fimDeJogo(this.id)'>
                        ${desempate.coringa[maisEscolhidos[i].enea]}
                        </p>
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
    content.innerHTML = `<h1>${eneatipo.eneatipo}</h1>
        <p>${eneatipo.texto}</p>`
    
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


comecar.addEventListener('click', iniciar)



