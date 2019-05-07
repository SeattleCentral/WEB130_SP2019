/* global $ */

$('.save-button').on('click', function(event) {
    event.preventDefault()
})

var $titleField = $('input[name="title"]')
$titleField.on('keyup', function(event) {
    if ($titleField.val().length > 2) {
        $titleField.removeClass('is-invalid')
    } else {
        $titleField.addClass('is-invalid')
    }
})


