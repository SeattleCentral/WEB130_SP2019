(function () {
    'use strict';

    var greeter = function greeter() {
      alert('yippie?!');
    };

    /* global $ */
    setTimeout(greeter, 1000);
    $('#menu').on('click', function (event) {
      if ($('#menu > ul').hasClass('closed')) {
        $('#menu > ul').removeClass('closed');
        $('#hamburger').css('background-image', 'url("img/X-Icon.png")');
      } else {
        $('#menu > ul').addClass('closed');
        $('#hamburger').css('background-image', 'url("img/Hamburger.png")');
      }
    });

}());
