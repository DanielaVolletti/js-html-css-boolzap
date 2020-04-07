$(document).ready(function(){

  $('.invio').click(function(){
    var contenitoreInviati = $('.mittente ul');
    var msgInviato = $('.scrivi-msg input').val();
    console.log(msgInviato);
    contenitoreInviati.append("<li class='msg-inviato'>" + msgInviato + "</li>");
  })

});
