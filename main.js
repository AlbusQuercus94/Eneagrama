
const data = 
    $.getJSON("./dados.json", function (dados){
        perfeicao = dados.perfeicao
        return perfeicao
    })

console.log(data)
