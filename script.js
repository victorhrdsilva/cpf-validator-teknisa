$(document).ready(function(){
    $('#cpf').inputmask('999.999.999-99');
});


function validateCPF(){
   const formattedCpf = document.getElementById('cpf').value;
    const cpf = cleanFormat(formattedCpf);
    if(cpf.length !== 11){
        showResult('CPF deve conter 11 digitos.', 'red');
        return;
    }
    if (checkRepeatedDigits(cpf)){
        showResult('CPF não pode conter repetição do mesmo digito.', 'red');
        return;
    }
    const firtNumber =  calculateDigitVerifier(cpf, 1);
    const secondNumber =  calculateDigitVerifier(cpf, 2);

    if(!firtNumber || !secondNumber){
        showResult(`CPF inválido - ${formattedCpf}`, 'red');
        return

    } else {
        showResult(`CPF válido - ${formattedCpf}`, 'green');
        return
    }

}

function calculateDigitVerifier(cpf, posicao){
    const sequencia = cpf.slice(0, 8 + posicao).split('');

    let soma = 0;
    let multiplicador = 9 + posicao;

    for (const numero of sequencia){
        soma += multiplicador * Number(numero);
        multiplicador--;
    }
    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8+posicao, 9+ posicao);

    return restoDivisao == digito;
}

function cleanFormat(cpf){
    //cpf = cpf.replace('.', '');  //pegar onde tiver ponto e mudar para vazio
    cpf = cpf.replace(/\D/g, '');  //remove qualquer coisa diferente de caracteres por vazio

    return cpf;
}

function showResult(texto, cor){
    const span =  document.getElementById('result');
    span.innerHTML = texto;
    span.style.color = cor;
}

function checkRepeatedDigits(cpf){
    return cpf.split('').every((d) => d === cpf[0]);
}
