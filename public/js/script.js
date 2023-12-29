let $ = window.jQuery;
$(document).ready(function () {
    $('.carousel').carousel({
        pause: true
    });
    $('.carousel').bind('slide.bs.carousel', function (e) {
        const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        window.scrollTo({
            left: 0,
            top: scrollPosition
        });
    });

});
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
    const menuToggle = document.getElementById('dropdown');
    const mainMenu = document.getElementById('nav');

    // Remove hash from URL on page load
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
    window.scrollTo(0, 0);

    // Show the loading screen
    document.getElementById("loading-screen").style.display = "block";

    // Simulate some asynchronous task (e.g., fetching data)
    setTimeout(function () {
        document.getElementById("loading-screen").style.opacity = 0;
        setTimeout(function () {
            document.getElementById("loading-screen").style.display = "none";
        }, 500)
    }, 3000); // Adjust the time according to your needs

    const navbar = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar',
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', function () {
            // Highlight clicked link
            navLinks.forEach((navLink) => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });

    menuToggle.addEventListener('change', function() {
        if (menuToggle.checked) {
            mainMenu.classList.add('show');
        } else {
            mainMenu.classList.remove('show');
        }
    });
});
