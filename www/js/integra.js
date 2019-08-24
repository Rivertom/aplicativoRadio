var telaPrincipal = document.getElementById("telaPrincipal");

var leftButton = document.getElementById("leftButton");
var leftButtonSpace = document.getElementById("leftButtonSpace");
var leftButtonImage = document.getElementById("leftButtonImage");
var rightButton = document.getElementById("rightButton");
var rightButtonSpace = document.getElementById("rightButtonSpace");
var rightButtonImage = document.getElementById("rightButtonImage");
var titleSpace = document.getElementById("titleSpace");
var titleText = document.getElementById("titleText");

var modalContent = document.getElementById("modalContent");

var  toast = document.getElementById("toast");
var toastText = document.getElementById("toastText");

var  preloader = document.getElementById("preloader");

// PALAVRAS RESERVADAS
var acentos = ["á","é","í","ó","ú","õ","ã","ô","ê","ç"];
var blockedWords=["null","not","script","drop","exec","true","cú","cu","viado","veado","buceta","bucetinha","xota","xoxota","xoxotinha","xereca","xerequinha"];
var blockedChars = ["=","<",">","%","&","*"];

// CORES
var azulsjc = "#004997";
var azulescurosjc = "#213A73";
var amarelosjc = "#FBAF05";
var verde = "#2E7D32";
var vermelho = "#C62828";
var azulclaro = "#D4EFFA";
var branco = "#FFFFFF";
////////////////////////////////

//OVERLAY
var mdCurView = "";
var mdStart = 10;
var mdMax = 270;
var mdIntervalo = 100;
var mdTimer=null;
var mdStep = 10;
var mdElapsed = 0;
var mdDone = false;
/////////////////////////////


var currView = "";

/////////////////////////

var plAngle = 20;
var  toastExibida = false;
var  timerRotacao = null;

var promptResult = "";

//MODAL

var modalMain = document.getElementById("modalMain");
var modalContent = document.getElementById("modalContent");
var modalTitulo = document.getElementById("modalTitulo");
var modalText = document.getElementById("modalText");
var modalYes = document.getElementById("modalYes");
var modalOk = document.getElementById("modalOk");
var modalNo = document.getElementById("modalNo");


//USar essa variável para indicar de onde vem a chamada das callbacks para interopretar os botões
var funcaoDaModal = "";
var modalResult = 0; // 0-No, 1-Yes;


function configAppBarBasics(title,back){

    appBarTitleText.innerHTML=title;

    if(back=="showBackButton"){
        appBarLeftButton.style.display = "block";

    } else {
        appBarLeftButton.style.display = "block";
        appBarLeftButton.width="10%";

    }

    appBarButton1.style.display = "none";
    appBarButton1.width="20%";
    appBarButton2.style.display = "none";
    appBarButton2.width="20%";
    appBarButton3.style.display = "none";
    appBarButton3.width="20%";
    appBarButton4.style.display = "none";
    appBarButton4.width="20%";

    appBar.style.display = "block";

}

function configAppBarButton(numero,imagem,callBack){
    document.getElementById("imgAppBarButton"+numero).src = imagem;
    document.getElementById("appBarButton"+numero).style.width="10%";
    document.getElementById("appBarButton"+numero).style.display = "block";
    document.getElementById("appBarButton"+numero).onclick = callBack;
    
}





function alerta(mens,titulo,funcao){
    
    if(device.platform=="browser"){
        alert(mens);
    } else {
        navigator.notification.alert(mens,funcao,titulo);
    }
    
    /*
    funcaoDaModal=funcao;

    modalTitulo.innerHTML = titulo;
    modalText.innerHTML = mens;
    modalOk.style.display = "block";
    modalYes.style.display = "none";
    modalNo.style.display = "none";
    modalOn=true;
    modalMain.style.display = "block";
    */
}

function confirma(mens,titulo,funcao,botoes){

    //if(device.platform=="browser"){
        //funcao => (confirm(mens));
    //}
    navigator.notification.confirm(mens,funcao,titulo,botoes);

    /*
    funcaoDaModal = funcao;

    modalTitulo.innerHTML = titulo;
    modalText.innerHTML = mens;
    modalOn=true;

    modalOk.style.display = "none";
    modalYes.style.display = "block";
    modalNo.style.display = "block";
    modalMain.style.display = "block";
    */
}

/////////

// PRE-LOADER

function rotatePreloader (){
	
	preloader.style.transform = "rotate("+plAngle+"deg)";
	plAngle+=20;
	if(plAngle>360) plAngle=0;
	return;
	
}

function hidePreloader(){
	preloader.style.display = 'none';
}

function showPreloader(){

	preloader.style.display = 'block';
	preloader.style.position="fixed";
	preloader.style.top="200px";
	
    larguraPreloader=preloader.offsetWidth;
	
    preloader.style.left = (window.innerWidth / 2) - (larguraPreloader / 2) + "px";

	plAngle=20;
	
}

//////////

// TOASTS

function showToast(text,time){
    toastExibida=false;
    toastText.innerHTML = text ;
    toast.style.display = "block";

    if(time>0){
        setTimeout(function () {
               removeToast();
            },time);
    }
}

function removeToast(){
    toast.style.display = "none";
    toastExibida=true;
    return;
}    

/////////////////////////

///// AJAX 

var dataLoaded = false;

function doPost(url, params, successCallBack) {
    showPreloader();
 
    if(simulaAjax){
        var funcao = url.substr(url.lastIndexOf('/')+1,url.lenght);
        simulaPost(funcao,params,successCallBack);
        return;
    }

    var ajax_request = new XMLHttpRequest();
    ajax_request.onreadystatechange = function () {

        if (ajax_request.readyState == 4) {
            if (ajax_request.status == 200) {
                hidePreloader();
                successCallBack(ajax_request.responseText);
            } else {
                alerta("Verifique sua conexão de rede !","Erro de rede !!",null);
                hidePreloader();
            }
        } else return;

    }

    ajax_request.open("POST", url, true);
    
    //ajax_request.setRequestHeader('Access-Control-Allow-Origin', '*');

    
    ajax_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax_request.send(params);

}

function doGet(url, successCallBack) {
    showPreloader();

    if(simulaAjax){
        var funcao = url.substr(url.lastIndexOf('/')+1,url.lenght);
        simulaGet(funcao,successCallBack);
        return;
    }


    var ajax_request = new XMLHttpRequest();
    ajax_request.onreadystatechange = function () { 

        if (ajax_request.readyState == 4) {
            if (ajax_request.status == 200) {
                hidePreloader();
                successCallBack(ajax_request.responseText);
            }
        } else return;

    }
    ajax_request.open("GET", url, true);
    //ajax_request.setRequestHeader('Access-Control-Allow-Origin', '*');
    ajax_request.send(null);

    //ajax_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

}

function settings(){
    if(loginDone){
        window.location.href='configs.html';

    } else {
        showToast("Favor realizar login!",2000);

    }
}

// GENERICAS

function verificaAcentuacao(frase){

    for(var i=0;i<=acentos.length-1;i++){
        if(frase.indexOf(acentos[i])!=-1) return true;
        if(frase.indexOf(acentos[i].toUpperCase())!=-1) return true;
    }
    return false;
}

function verificaCarBloqueados(frase){
    for(var i=0;i<=blockedChars.length-1;i++){
        if(frase.indexOf(blockedChars[i])!=-1) return true;
    }

    return false;
}

function verificaPalavrasProibidas(frase){
    for(var i=0;i<=blockedWords.length-1;i++){
        if(frase.indexOf(blockedWords[i])!=-1) return true;
        if(frase.indexOf(blockedWords[i].toUpperCase())!=-1) return true;
    }

    return false;
}

function formataData(dtdesejada){

    if (dtdesejada == null) {
        return("Data indeterminada");
    } else {
        var dia = dtdesejada.substr(8, 2);
        var mes = dtdesejada.substr(5, 2);
        var ano = dtdesejada.substr(0, 4);

        return(dia + "/" + mes + "/" + ano);
    }


}

function decodifica(letra){
    if(letra=='a') return '1';
    if(letra=='b') return '2';
    if(letra=='c') return '3';
    if(letra=='d') return '4';
    if(letra=='e') return '5';
    if(letra=='f') return '6';
    if(letra=='g') return '7';
    if(letra=='h') return '8';
    if(letra=='i') return '9';
    return '0';
}

function formata_data(dataDes){

    dt=new Date(dataDes);
    var d = dt.getDate();
    if(d.length<2) d = "0" + d;
    var m = dt.getMonth()+1;
    if(m.length<2) m = "0" + m;
    var a = dt.getFullYear();
    var h = dt.getHours();
    if(h.length<2) h = "0" + h;
    var n = dt.getMinutes();
    if(n.length<2) n = "0" + n;
    res=d+"/"+m+"/"+a + " " + h+":"+n;

    return res;

}

// CRIPTOGRAFIA
function Encripta(dados){
    return(dados);

        var mensx="";
        var alf= ["BYCADEZFGH","IJKLMNOPQR"];
        var seq = [['A','N',"H","#","U","%","6","7","?","}"],
         ['F','G','T','Y','N','D','G','I','O','<'],
         ['1','6','3','Q','@','#','<','=','+','-'],
         ['n','h','d','g','f','u','%','$','&','p'],
         ['J','d','w','#','7','8','6','5','d','g'],
         ['k','l','m','n','#','o','p','q','r','s'],
         ['a','b','c','d','!','e','f','g','h','i'],
         ['A','B','C','D','&','E','F','G','H','I'],
         ['J','d','w','#','7','8','6','5','d','g'],
         ['J','d','w','#','7','8','6','5','d','g']]
        

        var data = new Date();
        var seg = data.getSeconds();
        var seg2 = seg.toString();
        var digSeg = parseInt(seg2.substr(0,1));
        if(seg2.length > 1){
            digSeg = parseInt(seg2.substr(1,1));
        }

        var tamNomePac = user.PAC_NOME_PACIENTE.length;
        if(tamNomePac > 20) var alfInd = 1;
        else var alfInd=0;

        var ultLetNom = user.PAC_NOME_PACIENTE.substr(user.PAC_NOME_PACIENTE.length-1,1);
        var ultDigCPF = parseInt(user.PDOC_NUMERO.substr(10,1));

        mensx = alf[alfInd].substr(digSeg,1) +alf[alfInd].substr(ultDigCPF,1);

        for(i=0;i<=dados.length-1;i++){
            car = Asc(dados.substr(i,1));
            carAux = car + digSeg+((i+1)*2);
            caraux2 = carAux.toString();
            num = parseInt(user.PDOC_NUMERO.substr(i,1));
            mensx = mensx + seq[num][parseInt(caraux2.substr(0,1))]+seq[num+1][parseInt(caraux2.substr(1,1))];

        }

        car = Asc(ultLetNom);
        caraux2 = car.toString();

        mensx = mensx + caraux2;
 
	return(mensx);
}

function Descripta(dados){
    
    return(dados);
    
    var mensx="";

    var chave1 = parseInt(cadtxtCPF.value.substr(13,1));
    var chave="";

    chave = chave1+2;

    digitado = dados.substr(0,6) + dados.substr(8,dados.length);

    for(i=0;i<=(digitado.length/2)-1;i++){
        var aux = parseInt(digitado.substr(i,2));

        mensx = mensx + String.fromCharCode(aux-(chave-i));
    }
    

    return(mensx);
}

function Asc(t){
	return t.charCodeAt(0);
}
 
function Chr(AsciiNum){
	return String.fromCharCode(AsciiNum)
}

// EVENTO DE INTERCEPTAÇÃO DE ERRO EM JAVASCRIPT

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {

    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + ' Column: ' + column + ' StackTrace: ' +  errorObj);

}


//FORMATACAO DE DATA JSON
/*
* Anil Singh
*/

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};


function FormatarCPF(cpf) {

    //var ao_cpf = document.forms.form1.ao_cpf.value;
    var ao_cpf = cpf;
    var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
    if (cpfValido.test(ao_cpf) == false) {

        ao_cpf = ao_cpf.replace(/\D/g, ""); //Remove tudo o que não é dígito

        if (ao_cpf.length == 11) {
            ao_cpf = ao_cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
            ao_cpf = ao_cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
            //de novo (para o segundo bloco de números)
            ao_cpf = ao_cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos

            //var valorValido = document.getElementById("ao_cpf").value = ao_cpf;
            var valorValido = ao_cpf;
            return valorValido;
        } else {
            console.log("CPF invalido");
        }

    }
}

function mascaratel(v,n) {
    v = v.replace(/\D/g, "");                      //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");     //Coloca parênteses em volta dos dois primeiros dígitos
    if (n = 4) {
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quinto e o sexto dígitos
    } else {
        v = v.replace(/(\d)(\d{3})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    }
    return v;
}

function mascaracep(v) {
    v = v.replace(/\D/g, "");                      //Remove tudo o que não é dígito
    v = v.replace(/(\d)(\d{3})$/, "$1-$2");        //Coloca hífen entre o quinto e o sexto dígitos
    return v;
}

function hideSearchBar(){
    searchBar.style.display="none";
}

function showSearchBar(){
    searchBar.style.display="block";
    searchBarTxt.value="";
    searchBarTxt.focus();
}

function FormatarCPF(cpf) {

    //var ao_cpf = document.forms.form1.ao_cpf.value;
    var ao_cpf = cpf;
    var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
    if (cpfValido.test(ao_cpf) == false) {

        ao_cpf = ao_cpf.replace(/\D/g, ""); //Remove tudo o que não é dígito

        if (ao_cpf.length == 11) {
            ao_cpf = ao_cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
            ao_cpf = ao_cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
            //de novo (para o segundo bloco de números)
            ao_cpf = ao_cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos

            //var valorValido = document.getElementById("ao_cpf").value = ao_cpf;
            var valorValido = ao_cpf;
            return valorValido;
        } else {
            console.log("CPF invalido");
        }

    }
}
