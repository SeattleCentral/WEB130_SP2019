/* global $ */

import { greeter } from './other'

setTimeout(greeter, 1000)

$('#menu').on('click', (event) => {
    if ($('#menu > ul').hasClass('closed')) {
        $('#menu > ul').removeClass('closed')
        $('#hamburger').css('background-image', 'url("img/X-Icon.png")')
    } else {
        $('#menu > ul').addClass('closed')
        $('#hamburger').css('background-image', 'url("img/Hamburger.png")')
    }
})
