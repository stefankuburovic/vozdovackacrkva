let $ = window.jQuery;
$(document).ready(function () {
    $('.carousel').carousel({
        pause: "false"
    });
    $('body').scrollspy();
});
