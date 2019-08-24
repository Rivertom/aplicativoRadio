
//TELA DE ABERTURA

        function loadConfigs() {
            
            app.style.display = "block";
            currView="abertura";            
            menu_principal_Show();            
         }
 
         function abertura_Show() {
             appBar.style.display = "none";
             abertura.style.display = "block";
             currView = "abertura";
             setTimeout(loadConfigs, 3000);
         }

         
//TELA MENU PRINCIPAL
function menu_principal_Show() {
   
    rodape.style.display="none";
    appBar.style.display = 'none';
    //configAppBarBasics("Radio Verde","showBackButton");

    document.getElementById(currView).style.display="none"; 
    currView = "menu_principal"; 
    document.getElementById(currView).style.display="block";

    removeToast();

}


