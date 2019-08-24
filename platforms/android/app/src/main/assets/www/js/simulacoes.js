function simula2(){
    hidePreloader();
    
        
    if(f1=="aposta/ranking")
        c1('{"versao":"1.0.0","erros":false,"message":false,"id":"12","nome":"Mário César Berardo","email":"mario.cesar@gmail.com","datanasc":"1972-08-19","sexo":"1","datacad":"2018-08-02 21:18:29","token":"","ativo":"1","senha":"12356789","nivel":"1"}');
    
}

function simulaPost(f,p,c){
    f1=f;
    p1=p;
    c1=c;

    setTimeout(simula2,500);
}    

function simulaGet(f,c){
    f1=f;
    c1=c;

    setTimeout(simula2,2000);
}    


