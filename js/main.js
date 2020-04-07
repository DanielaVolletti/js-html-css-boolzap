$(document).ready(function(){


  $('.invio').click(function(){
    var contenitoreInviati = $('.contenitore-testo');
    var msgInviato = $('.scrivi-msg input').val();
    console.log(msgInviato);
    contenitoreInviati.append("<div class='mittente clear'>"+
                      "<div class='msg-inviato'>" + msgInviato + "</div>"+
                  "</div>");

    $('.scrivi-msg input').val("");
  })

});
