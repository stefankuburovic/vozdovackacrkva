let index = 0;
let $ = window.jQuery;

let lastScrollTop = 0;
let st = window.pageYOffset || document.documentElement.scrollTop;
$(document).ready(function () {
    $('.carousel').carousel({
        pause: "false"
    });
    $('body').scrollspy();
});
