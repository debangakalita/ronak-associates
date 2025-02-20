// Get all sections and navigation elements
const sections = document.querySelectorAll('section');
const menuLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.nav-links');

// Hamburger menu functionality
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Remove active class from all links in mobile view
        if (window.innerWidth <= 768) {
            menuLinks.forEach(l => l.classList.remove('active'));
        }
    });
});

// Add scroll event listener
window.addEventListener('scroll', () => {
    // Only run this for screens wider than 768px
    if (window.innerWidth > 768) {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
                
                if (current === 'services-section') {
                    current = 'services-section';
                } else if (scrollPosition >= document.getElementById('about-section').offsetTop) {
                    current = 'about-section';
                }
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
});

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('appointment-modal');
    const appointmentBtn = document.querySelector('.btn-appointment');
    const enquireButtons = document.querySelectorAll('.enquire-btn');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = modal.querySelector('h3');
    const modalSubmitBtn = modal.querySelector('.submit-btn');
    
    // Function to open modal
    const openModal = (title, buttonText) => {
        modalTitle.textContent = title;
        modalSubmitBtn.textContent = buttonText;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // Function to close modal
    const closeModalFunc = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Book Appointment button
    if (appointmentBtn) {
        appointmentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Book an Appointment', 'Book Appointment');
        });
    }

    // Enquire Now buttons
    enquireButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceName = button.closest('.service-card').querySelector('h4').textContent;
            openModal(`Enquire about ${serviceName}`, 'Send Enquiry');
        });
    });

    // Close button
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    // Click outside modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Form submission
    const appointmentForm = modal.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your request has been submitted!');
            closeModalFunc();
        });
    }

    // Handle service description expansion
    const seeDescriptionButtons = document.querySelectorAll('.see-description');
    
    seeDescriptionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const description = button.nextElementSibling;
            button.classList.toggle('active');
            description.classList.toggle('active');
            button.textContent = button.classList.contains('active') ? 'Hide description' : 'See description';
        });
    });
}); 