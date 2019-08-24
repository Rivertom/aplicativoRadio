
var i = 0;
var passageiro = document.getElementById('passageiro_qt')
var exibeQT = document.getElementById('mostraQT')
var local = document.getElementById('localizacao')
//FUNÇAO DA SELEÇAO DE LOCALIZAÇAO
function select()
{
if(lugar.value=="Sj")
{
    palavras.innerHTML = "Motoristas Disponiveis em <br> Paraopeba para Sao Jose";
    document.getElementById('motorista').style.display = "block";
}
if(lugar.value=="Pb")
{
    palavras.innerHTML = "Motoristas Disponiveis em <br> Sao Jose para Paraopeba";
}
}

// funcao quero ir
function quero_Ir()
{
    document.getElementById('passageiro_area').style.display ="block";
    document.getElementById('Encomenda').style.display ="none";
    document.getElementById('Carro_fechado').style.display ="none";
    i++
}

// funcao encomenda
 function encomenda () {
    
    document.getElementById('queroIr').style.display ="none";
    document.getElementById('Carro_fechado').style.display ="none";
}

function fechado () {
    exibeQT.innerHTML = "Fechado"
     i = 2;
    document.getElementById('queroIr').style.display ="none";
    document.getElementById('Encomenda').style.display ="none";
}

function cancelar()
{
    document.getElementById('info_viagem').style.display ="none";
}