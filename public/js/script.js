let $ = window.jQuery;
$(document).ready(function () {
    $('.carousel').carousel({
        pause: "false"
    });
    $('body').scrollspy();
});
document.addEventListener('DOMContentLoaded', function() {
    // Check if there is a hash in the URL
    if (window.location.hash) {
        // Update the URL without the hash
        window.history.replaceState(null, null, window.location.pathname);
    }
});