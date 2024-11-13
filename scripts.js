// JavaScript to toggle the mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
const body = document.body;

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    body.classList.toggle('menu-open');
});

document.getElementById('ctaButton').addEventListener('click', function() {
    const targetSection = document.querySelector('#contact');
    const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get the height of the navbar

    // Calculate the offset position by adjusting for the navbar height
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    // Smoothly scroll to the adjusted position
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});


// Select all nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default jump to anchor

        const targetId = this.getAttribute('href'); // Get the href value (e.g., #home)
        const targetSection = document.querySelector(targetId); // Find the target section
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get navbar height

        // Calculate the offset position
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        // Smoothly scroll to the calculated position
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});



