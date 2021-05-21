
  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    fadeOutFlash();
  });

  function fadeOutFlash(){
    $('.flashes').delay(4000).slideUp('slow');
  }