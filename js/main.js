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
    contenitoreInviati.append("<div class='mittente clear'><div class='msg-inviato'>" + msgInviato + "</div></div>");

    // pulisco input dopo aver cliccato
    $('.scrivi-msg input').val("");

    // dopo un secondo appare la risposta automatica ok
    setTimeout(risposta, 1000);
    function risposta() {
      contenitoreInviati.append('<div class="destinatario clear"><div class="msg-ricevuto"> Ok </div></div>')
    }

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

  // faccio apparire solo cha
  $('.container-chat').click(function() {
    var elementoSelezionato = $(this);

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

      // con eq io recupero l'elemento tramite indice, ma la numerazine parte da 0 non da 1
      /*
      $('.contenitore-testo').eq(mioAttributo - 1).addClass('active');
      */


  });




  //Click sul contatto mostra la conversazione del contatto cliccato
    // click sul contatto che ha data-attr che corrisponde a stesso data-attr in chat

    // salvo il valore dell'attr e lo usso per dire quale chat è attiva


  // è possibile inserire nuovi messaggi per ogni conversazione [attiva]




});
