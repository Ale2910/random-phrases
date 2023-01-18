
//! PARTE DA LISTA//

// Declarando variáveis
const txt = window.document.getElementById('txxt')
const res = window.document.getElementById('res')
const rad = window.document.getElementsByName('rad')

const buttons = {
    add: window.document.getElementById('add'),
    limpar: window.document.getElementById('limpar'),
    choice: window.document.getElementById('choice')
}

let augusto = []


// Configurando os botões
buttons.add.addEventListener('click', adicionar)
buttons.limpar.addEventListener('click', limpar)
buttons.choice.addEventListener('click', choice)


// Funções
function adicionar() {
 
    // Verificando se o input está vazio
    if(txt.value.length === 0) {
        return window.alert('Não dá pra adicionar vento na lista')
    }

    if(txt.value.length >= 81) {
        return window.alert('O que você digitou é muito grande! Limite: 80 caracteres')
    }

    if(txt.value.includes('{cut}')) {
        return window.alert('Não é permitido escrever {cut} no texto! Motivo: há uma parte do código em que o {cut} é usado para prevenir problemas com o texto escrito')
    }
    
    
    // Declarando o texto em minúsculo
    let lowerTxt = txt.value.toLowerCase()


    //? === //

    // Apenas verificando o tamanho do txt para n bugar na página
    let firstTime = true


    if(lowerTxt.length >= 40) {
        cutTxt(lowerTxt)
    }
    
    
    function cutTxt(txt) {
        //
        if(!firstTime) {
        
            let lastTxt = txt.replace('<br>', '{cut}')
            lastTxt = lastTxt.split('{cut}')[1]

            if(lastTxt.length >= 40){
                cutTxt(lastTxt)
            }

        } else {

            txt = txt.split('')
        
            // Tem q ser 1 num maior
            let a = txt[41]
            txt[41] = '{cut}'
            
            txt = txt.join('')
            txt = txt.replace('{cut}', `${a}<br>`)

            lowerTxt = txt
        }
    }
    //? === //
    
        
    // Verificando se o item já está na lista 
    if(augusto.includes(lowerTxt)) {

        let char = txt.value.charAt(0)
        return window.alert(`\"${txt.value.replace(char, char.toUpperCase())}\" já está na lista!`)
    } 


    // Se a pessoa tiver adicionado 100 itens na lista
    if(augusto.length === 100) {
        return window.alert('Você atingiu o limite de itens (100)!')
    }
    
    
    // Adicionando o texto na lista
    augusto.push(lowerTxt)
    
    // Limpando e colocando os textos na div
    res.innerHTML = ''  
    let char = ''

    for(let i = 0; i < augusto.length; i++) {
        //
        char = augusto[i].charAt(0)
        res.innerHTML += `${augusto[i].replace(char, char.toUpperCase())} <br>`
    }

    txt.value = ''
    txt.focus()
}


function limpar() {
  
    // Limpando a div e a lista
    res.innerHTML = 'Limpo! 🗑️'
    txt.value = ''
    txt.focus()
  
    augusto = []
}


//! PARTE DAS ESCOLHAS //
function choice (args, choices) {
    
     
    //* >> Parâmetro 1 << 
    //    (frases)
    args = augusto.join('{cut}')

    //* >> Parâmetro 2 <<
    //(quant. de escolhas) 
    
    //* Primeira verificação (verificando o parâmetro) 
    choices = args.split('{cut}').length

    if(choices <= 1){
        return window.alert('Escreva pelo menos 2 frases! Escreva sua frase e clique em add, logo após, faça o mesmo porém escreva outra frase')
    }


    //? Agora sim a parte das escolhas

    // Valores
    let phrases = args.split('{cut}')

    
    // Pegando as frases de acordo com o num. de escolhas
    let rand = Math.floor(Math.random() * phrases.length)
    console.log(rand)
    rand = phrases[rand]
    

    // Colocando o resultado na div
    res.innerHTML += '<br>'
    res.innerHTML += `O escolhido foi: <br> <strong>${rand}</strong>`


    // Limpando o array para n ter problemas se recomeçar
    augusto = []
    txt.focus()
}
