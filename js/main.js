$(document).ready(function(){

  $('.invio').click(function(){
    $('.mittente ul').append('<li class="msg-inviato"></li>');
    var msgInviato = $('.scrivi-msg input').val();
    console.log(msgInviato);
    $('.msg-inviato').text(msgInviato);
  })



});
