import {dados} from "./dados.js"

const {perfeicao, pretatividade, performance, profundidade, privacidade, planejamento, prazer, poder, paz, desempate} = dados

for(let x in desempate.cartoes){
    if(desempate.cartoes[x].empate1===3 && desempate.cartoes[x].empate2===6){
        console.log(desempate.cartoes[x].pergunta)
        console.log(desempate.cartoes[x].opcao1)
        console.log(desempate.cartoes[x].opcao2)
    }
}
