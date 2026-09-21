const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwdiDvhHV39hLTDk55BIFhLgvCFgBCvG_riQmv4UMMLaQFBJJPAiedIPZxk1edhJmA/exec';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const btnSubmit = document.getElementById('btnSubmit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Diperlukan untuk Google Apps Script
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                alert('Pesan Anda berhasil terkirim dan tersimpan! Terima kasih.');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Gagal mengirim pesan. Silakan coba lagi.');
            })
            .finally(() => {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            });
        });
    }
});