$(document).ready(function(){

  // salvo in variabile dove andrò ad aggiungere ulteriori messaggi
  var contenitoreInviati = $('.contenitore-testo');

  // salvo in una variabile il pulsante invio
  var invio = $('.invio');

  // salvo in una variabile cosa ho scritto nell'input
  var msgScritto = $('.scrivi-msg input');

  // al click salvo ciò che ha scritto l'utente e lo aggiungo sotto i msg inviati
  invio.click(function(){
    var msgInviato = msgScritto.val();
    console.log(msgInviato);

    contenitoreInviati.append("<div class='mittente clear'><div class='msg-inviato'>" + msgInviato + "</div></div>");

    $('.scrivi-msg input').val("");

    // dopo un secondo appare la risposta
    setTimeout(risposta, 1000);
    function risposta() {
      contenitoreInviati.append('<div class="destinatario clear"><div class="msg-ricevuto"> Ok </div></div>');
    }
    
  })

});
