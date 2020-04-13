$(document).ready(function(){

  // salvo in variabile dove andrò ad aggiungere ulteriori messaggi
  var contenitoreInviati;

  // salvo in una variabile il pulsante invio
  var invio = $('.invio');

  // salvo in una variabile cosa ho scritto nell'input
  var msgScritto = $('.scrivi-msg input');

  // al click salvo ciò che ha scritto l'utente e lo aggiungo sotto i msg inviati
  invio.click(function(){
    // salvo ciò che ha scritto l'utente
    var msgInviato = msgScritto.val();
    console.log(msgInviato);

    // aggiungo  ciò che ho salvato sotto i msg inviati
    contenitoreInviati.append('<div class="mittente clear"><div class="msg-inviato"><span>' + msgInviato + '</span><i class="fas fa-chevron-down"></i><span class="ora-msg">15:40</span></div><div class="drop-cancella-inviato"><div class="info"><h6>Info messaggio</h6></div><div class="delete"><h6>Cancella il messaggio</h6></div></div></div>');

    // pulisco input dopo aver cliccato
    $('.scrivi-msg input').val("");

    // dopo un secondo appare la risposta automatica ok
    setTimeout(risposta, 1000);
    function risposta() {
      contenitoreInviati.append('<div class="destinatario clear"><div class="msg-ricevuto"><span>Ok</span><i class="fas fa-chevron-down"></i><span class="ora-msg">15:40</span></div><div class="drop-cancella"><div class="info"><h6>Info messaggio</h6></div><div class="delete"><h6>Cancella il messaggio</h6></div></div></div>')
    }

  });

  // invio messaggio con tasto invio
  msgScritto.keyup(function(enter){

    // salvo ciò che ha scritto l'utente
    var msgInviato = msgScritto.val();
    console.log(msgInviato);

    // alla pressione del tasto invio, invio il messaggio
    var code = enter.keyCode;
    if(code == 13){
      // aggiungo  ciò che ho salvato sotto i msg inviati
      contenitoreInviati.append('<div class="mittente clear"><div class="msg-inviato"><span>' + msgInviato + '</span><i class="fas fa-chevron-down"></i><span class="ora-msg">15:40</span></div><div class="drop-cancella-inviato"><div class="info"><h6>Info messaggio</h6></div><div class="delete"><h6>Cancella il messaggio</h6></div></div></div>');

      // pulisco input dopo aver cliccato
      $('.scrivi-msg input').val("");

      // dopo un secondo appare la risposta automatica ok
      setTimeout(risposta, 1000);
      function risposta() {
        contenitoreInviati.append('<div class="destinatario clear"><div class="msg-ricevuto"><span>Ok</span><i class="fas fa-chevron-down"></i><span class="ora-msg">15:40</span></div><div class="drop-cancella"><div class="info"><h6>Info messaggio</h6></div><div class="delete"><h6>Cancella il messaggio</h6></div></div></div>')
      }
    }

  });

  // cambio il microfono in aereoplano quando sto scrivendo
  $('.scrivi-msg input').focusin(function(){
    invio.removeClass('fa-microphone');
    invio.addClass('fa-paper-plane');
  });
  $('.scrivi-msg input').focusout(function(){
    invio.removeClass('fa-paper-plane');
    invio.addClass('fa-microphone');
  });


  //gestisco evento ricerca su tastiera
  $('.contenitore-cerca input').keyup(function(){

    // salvo input utente
    var inputUser = $('.contenitore-cerca input').val();

    // converto caratteri inseriti in minuscoli
    var inputUserMin = inputUser.toLowerCase();

    console.log('input inserito', inputUserMin);

    // seleziono tutti i blocchi di contatto e ciclo tra di essi
    $('.container-chat').each(function() {
      // creo variabile per trovare gli h2
      var nome = $(this).find('h2');

      // creo variabile per salvare il testo degli h2
      var nomeContatto = nome.text();

      // converto i caratteri in minuscoli
      var nomeContattoMin = nomeContatto.toLowerCase();

      console.log(nomeContattoMin);

      // verifico che il nome degli utenti includa ciò che ha inserito l'utente nella ricerca e quindi rendo visibile

      if(nomeContattoMin.includes(inputUserMin)){
        $(this).show();
      } else {
        $(this).hide();
      }

    });

  });


/*
  //gestisco evento ricerca con CLICK su icona ricerca
  $('.search').click(function(){
    // salvo input utente
    var inputUser = $('.contenitore-cerca input').val();

    // converto caratteri inseriti in minuscoli
    var inputUserMin = inputUser.toLowerCase();
    console.log(inputUserMin);

    // seleziono tutti i blocchi di contatto e ciclo tra di essi
    $('.container-chat').each(function() {
      // creo variabile per trovare gli h2
      var nome = $(this).find('h2');

      // creo variabile per salvare il testo degli h2
      var nomeContatto = nome.text();

      // converto i caratteri in minuscoli
      var nomeContattoMin = nomeContatto.toLowerCase();

      console.log(nomeContattoMin);

      // verifico che il nome degli utenti includa ciò che ha inserito l'utente nella ricerca e quindi rendo visibile
      if(nomeContattoMin.includes(inputUserMin)){
        $(this).show();
      } else {
        $(this).hide();
      }

    });

  });

  */

  // faccio apparire solo chat attiva al click su corrispondente sinistra
  $('.container-chat').click(function() {

    // tolgo classe attiva a tutte le sezioni di chat
    $('.container-chat').removeClass('attiva');

    // aggiungo background grigio per chat selezionata
    $(this).addClass('attiva');

    // rimuovo "clicca su una chat"
    $('.clicca-chat').hide();

    // seleziono la chat corrente
    var elementoSelezionato = $(this);

    // seleziono il nome nella sezione di sinistra
    var nomeChat = elementoSelezionato.find('h2').text();

    // associo alla chat di destra il nome della chat su cui clicco
    $('.dati-chat').find('h2').text(nomeChat);

    // seleziono l'immagine di sinistra
    var imgChat = elementoSelezionato.find('img').attr('src');
    console.log(imgChat);

    // associo alla chat di destra l'immagine della chat su cui clicco
    $('.dati-chat').find('img').attr('src', imgChat);

    // seleziono il nome nella sezione di sinistra
    var oraChat = elementoSelezionato.find('span').text();

    // associo alla chat di destra il nome della chat su cui clicco
    $('.dati-chat').find('h5').text('Ultimo accesso oggi alle ' + oraChat);

    // recupero valore attributo della chat
    var mioAttributo = elementoSelezionato.data('conversazione');

    console.log('posizione chat' + mioAttributo);

    // tolgo classe active a tutte le finestre di chat destra
    $('.contenitore-testo').removeClass('active');

    // ciclo i contenitori di destra
    $('.contenitore-testo').each(function() {

      // this è l'elemento iterato attuale
      var mioAttributoDue = $(this).data('conversazione');

      console.log('posizione conversazione' +
      mioAttributoDue);

      // do classe active solo all'elemento con attributo uguale
      if (mioAttributo == mioAttributoDue) {
        console.log("elemento trovato");
        $(this).addClass("active");
        contenitoreInviati = $(this);
      }
    });

  });

  $('.contenitore-testo').on("click", ".msg-ricevuto i",
     function () {
       if(!$(this).parents('.destinatario').find('.drop-cancella').hasClass('drop-attivo')){
         $(this).parents('.destinatario').find('.drop-cancella').addClass('drop-attivo');
       } else if($(this).parents('.destinatario').find('.drop-cancella').hasClass('drop-attivo')){
         $(this).parents('.destinatario').find('.drop-cancella').removeClass('drop-attivo');
       }
     }
  );

  $('.contenitore-testo').on("click", ".msg-inviato i",
     function () {
       if(!$(this).parents('.mittente').find('.drop-cancella-inviato').hasClass('drop-attivo')){
         $(this).parents('.mittente').find('.drop-cancella-inviato').addClass('drop-attivo');
       } else if($(this).parents('.mittente').find('.drop-cancella-inviato').hasClass('drop-attivo')){
         $(this).parents('.mittente').find('.drop-cancella-inviato').removeClass('drop-attivo');
       }
     }
  );


  $('.contenitore-testo').on("click", ".delete",
     function () {
       if($(this).parents('.destinatario')){
         $(this).parents('.destinatario').hide();
       }
       if($(this).parents('.mittente')){
         $(this).parents('.mittente').hide();
       }
     }
  );

});
