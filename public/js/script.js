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


    window.scrollTo(0, 0);

    // Show the loading screen
    document.getElementById("loading-screen").style.display = "block";

    // Get the current URL path
    const path = window.location.pathname;

    // Check if the current URL is '/'
    if (path !== '/') {
        // Get all elements with the 'home-page' class
        const homePages = document.querySelectorAll('.home-page');

        // Loop through each element and add the 'hidden' class
        homePages.forEach(function(homePage) {
            homePage.classList.add('hidden');
        });
    }
    if (path !== '/riznica') {
        // Get all elements with the 'home-page' class
        const homePages = document.querySelectorAll('.riznica');

        // Loop through each element and add the 'hidden' class
        homePages.forEach(function(homePage) {
            homePage.classList.add('hidden');
        });
    }

    // Simulate some asynchronous task (e.g., fetching data)
    setTimeout(function () {
        document.getElementById("loading-screen").style.opacity = 0;
        setTimeout(function () {
            document.getElementById("loading-screen").style.display = "none";
        }, 500)
    }, 3000);

    // Function to check if element is in viewport
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

// Function to activate link based on viewport
    function activateLink() {
        var sections = document.querySelectorAll('.nav-link');
        sections.forEach(function(section) {
            var link = document.querySelector('a[href="#' + section.id + '"]');
            if (isInViewport(section)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

// Initial activation check
    activateLink();

// Listen for scroll event and activate link accordingly
    window.addEventListener('scroll', function() {
        activateLink();
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
