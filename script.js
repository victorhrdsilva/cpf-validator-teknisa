$(document).ready(function(){
    $('#cpf').inputmask('999.999.999-99');
});

document.getElementById("cpf")
    .addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        validateCPF()
    }
});

function validateCPF(){
   const formattedCpf = document.getElementById('cpf').value;
    const cpf = cleanFormat(formattedCpf);
    if(cpf.length !== 11){
        showResult('CPF deve conter 11 dígitos.', 'red');
        
        return;
    }
    if (checkRepeatedDigits(cpf)){
        showResult('CPF não pode conter apenas repetições do mesmo dígito.', 'red');
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

function calculateDigitVerifier(cpf, position){
    const sequence = cpf.slice(0, 8 + position).split('');

    let sum = 0;
    let multiplier = 9 + position;

    for (const num of sequence){
        sum += multiplier * Number(num);
        multiplier--;
    }
    let divisionRest = (sum * 10) % 11;
    if ((divisionRest === 10) || (divisionRest === 11))  divisionRest = 0;
    const digit = parseInt(cpf.slice(8+position, 9+ position));
    return divisionRest === digit;
}

function cleanFormat(cpf){
    cpf = cpf.replace(/\D/g, ''); 

    return cpf;
}

function showResult(text, color){
    const div =  document.getElementById('result');
    div.innerHTML = ""
    if(color === "red"){
        div.style.background = "rgb(230,133,133)"
        div.style.background = "linear-gradient(137deg, rgba(230,133,133,1) 4%, rgba(233,56,92,1) 69%)"
    }
    if(color === "green"){
        div.style.background = "rgb(167,227,162)"
        div.style.background = "linear-gradient(137deg, rgba(167,227,162,1) 4%, rgba(7,156,31,1) 65%)"
    }
     div.innerHTML = `
        <div class="toast">
            ${text}
        </div>
    ` 
    
    setTimeout(()=> div.classList.add("fade"), 2000)
    setTimeout(()=> {div.classList.remove("fade"); div.innerHTML=""}, 3000)
}

function checkRepeatedDigits(cpf){
    return cpf.split('').every((d) => d === cpf[0]);
}
