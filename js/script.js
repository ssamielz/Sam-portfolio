document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Adjust scroll threshold as needed
                navbar.classList.add('bg-opacity-100', 'shadow-lg');
                navbar.classList.remove('bg-gradient-to-b', 'from-gray-900', 'to-transparent');
                navbar.classList.add('bg-gray-900'); // Solid color when sticky
            } else {
                navbar.classList.remove('bg-opacity-100', 'shadow-lg', 'bg-gray-900');
                navbar.classList.add('bg-gradient-to-b', 'from-gray-900', 'to-transparent');
            }
        });
    }

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.getElementById('portfolio-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Animate out
            portfolioGrid.classList.add('opacity-0'); // Fade out the grid
            setTimeout(() => {
                portfolioGrid.classList.remove('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'); // Remove grid for smooth transition

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block'; // Show item
                    } else {
                        item.style.display = 'none'; // Hide item
                    }
                });

                // Restore grid layout (ensure it recalculates correctly)
                portfolioGrid.classList.add('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');

                // Animate in
                portfolioGrid.classList.remove('opacity-0'); // Fade in the grid
            }, 300); // Duration of the fade-out transition
        });
    });


    // Scroll-triggered Section Reveals
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // Percentage of the element that needs to be visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Contact Form Submission (Basic - for demonstration)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you'd send this data to a backend service (e.g., Formspree, Netlify Forms, or your own API)
            alert('Thank you for your message, Sam Sanya will get back to you soon!');
            contactForm.reset(); // Clear the form
        });
    }

});