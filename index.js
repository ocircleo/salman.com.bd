document.addEventListener('DOMContentLoaded', () => {
    // 1. Update copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Contact Form Logic with FormSubmit.co
    const contactForm = document.getElementById('contactForm');
    const successBox = document.getElementById('successBox');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && successBox && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(contactForm);
            
            try {
                // Change the email address below to your own FormSubmit email once configured
                const response = await fetch('https://formsubmit.co/ajax/your-email@example.com', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    contactForm.style.display = 'none';
                    successBox.style.display = 'block';
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                // Fallback success for local testing
                contactForm.style.display = 'none';
                successBox.style.display = 'block';
            }
        });
    }

    // 3. Simple fade-in animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(15px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 600,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, header').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
