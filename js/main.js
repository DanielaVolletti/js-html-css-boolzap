$(document).ready(function(){

  // salvo in variabile dove andrò ad aggiungere ulteriori messaggi
  var contenitoreInviati;

  // salvo in una variabile il pulsante invio
  var invio = $('.invio');

  // salvo in una variabile cosa ho scritto nell'input
  var msgScritto = $('.scrivi-msg input');

  // salvo in una variabile input di ricerca della chat
  var search = $('.contenitore-cerca input');

  // salvo in una variabile i blocchi di chat di sinistra
  var boxChat = $('.container-chat');

  // salvo in una variabile la sezione di destra contenente i msg scritti
  var contenitoreTesto = $('.contenitore-testo');

  // cambio il microfono in aereoplano quando sto scrivendo
  msgScritto.focusin(aereoplanoOn);
  msgScritto.focusout(aereoplanoOut);

  // al click salvo ciò che ha scritto l'utente e lo aggiungo sotto i msg inviati
  invio.click(invioMsg);

  // invio messaggio con tasto invio
  msgScritto.keyup(function(event) {

    var code = event.which;

    if(code == 13){

      invioMsg();
    }
  });

  //gestisco evento ricerca su tastiera
  search.keyup(ricercaChat);

  // faccio apparire solo chat attiva al click su corrispondente chat sinistra
  boxChat.click(selezionaChat);

  // mostro dropdown di messaggi ricevuti al click su freccia
  contenitoreTesto.on("click", ".msg-ricevuto i", dropRicevuti);

  // mostro dropdown di messaggi inviati al click su freccia
  contenitoreTesto.on("click", ".msg-inviato i", dropInviati);

  // elimino i msg cliccando su cancella chat del dropdown
  contenitoreTesto.on("click", ".delete", deleteMsg);




  // FUNZIONI

  // icona aereoplano quando scrivo
  function aereoplanoOn(){
    invio.removeClass('fa-microphone');
    invio.addClass('fa-paper-plane');
  };

  function aereoplanoOut(){
    invio.removeClass('fa-paper-plane');
    invio.addClass('fa-microphone');
  };

  // funzione per invio msg tramite click
  function invioMsg(){
    // salvo ciò che ha scritto l'utente
    var msgInviato = msgScritto.val();
    console.log(msgInviato);

    // inizializzazione template handlebars msg (in function invioMsg)
    var source = $('#msg-template').html();
    var template = Handlebars.compile(source);

    //Handlebars operations
     var contextInv = {"user": "mittente", "msg": "msg-inviato", "msgText": msgInviato, "drop": "drop-cancella-inviato"};
     var htmlInv = template(contextInv);

     // aggiungo  ciò che ho salvato sotto i msg inviati
     contenitoreInviati.append(htmlInv);

    // contenitoreInviati.append('<div class="mittente clear"><div class="msg-inviato"><span>' + msgInviato + '</span><i class="fas fa-chevron-down"></i><span class="ora-msg">15:40</span></div><div class="drop-cancella-inviato"><div class="info"><h6>Info messaggio</h6></div><div class="delete"><h6>Cancella il messaggio</h6></div></div></div>');

    // pulisco input dopo aver cliccato
    $('.scrivi-msg input').val("");

    // dopo un secondo appare la risposta automatica ok
    setTimeout(risposta, 1000);
    function risposta() {
      //Handlebars operations
       var contextRic = {"user": "destinatario", "msg": "msg-ricevuto", "msgText": "Ok", "drop": "drop-cancella"};
       var htmlRic = template(contextRic);

       // aggiungo risposta automatica
       contenitoreInviati.append(htmlRic);
      // contenitoreInviati.append('<div class="destinatario clear"><div class="msg-ricevuto"><span>Ok</span><i class="fas fa-chevron-down"></i><span class="ora-msg">15:40</span></div><div class="drop-cancella"><div class="info"><h6>Info messaggio</h6></div><div class="delete"><h6>Cancella il messaggio</h6></div></div></div>');
    }

  };



  // funzione per cercare una chat
  function ricercaChat(){
    // salvo input utente
    var inputUser = search.val();

    // converto caratteri inseriti in minuscoli
    var inputUserMin = inputUser.toLowerCase();

    console.log('input inserito', inputUserMin);

    // seleziono tutti i blocchi di contatto e ciclo tra di essi
    boxChat.each(function() {
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

  };

  // seleziona chat attiva
  function selezionaChat() {

    // tolgo classe attiva a tutte le sezioni di chat
    boxChat.removeClass('attiva');

    // aggiungo background grigio per chat selezionata
    $(this).addClass('attiva');

    // rimuovo "clicca su una chat"
    $('.clicca-chat').hide();

    // seleziono la chat corrente
    var chatCorrente = $(this);

    // seleziono il nome nella sezione di sinistra
    var nomeChat = chatCorrente.find('h2').text();

    // associo alla chat di destra il nome della chat su cui clicco
    $('.dati-chat').find('h2').text(nomeChat);

    // seleziono l'immagine di sinistra
    var imgChat = chatCorrente.find('img').attr('src');
    console.log(imgChat);

    // associo alla chat di destra l'immagine della chat su cui clicco
    $('.dati-chat').find('img').attr('src', imgChat);

    // seleziono il nome nella sezione di sinistra
    var oraChat = chatCorrente.find('span').text();

    // associo alla chat di destra il nome della chat su cui clicco
    $('.dati-chat').find('h5').text('Ultimo accesso oggi alle ' + oraChat);

    // recupero valore attributo della chat
    var mioAttributo = chatCorrente.data('conversazione');

    console.log('posizione chat' + mioAttributo);

    // tolgo classe active a tutte le finestre di chat destra
    contenitoreTesto.removeClass('active');

    // ciclo i contenitori di destra
    contenitoreTesto.each(function() {

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

  };

  // dropdown msg ricevuti
  function dropRicevuti() {
    $(this).parents('.destinatario').find('.drop-cancella').toggleClass('drop-attivo');
  };

  // dropdown msg inviati
  function dropInviati() {
  $(this).parents('.mittente').find('.drop-cancella-inviato').toggleClass('drop-attivo');
  };


  // funzione per eliminare msg
  function deleteMsg() {
    if($(this).parents('.destinatario')){
      $(this).parents('.destinatario').remove();
    }
    if($(this).parents('.mittente')){
      $(this).parents('.mittente').remove();
    }
  };


});
