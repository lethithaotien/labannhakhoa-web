import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inject contact links
    const btnZalo = document.getElementById('btn-zalo');
    if (btnZalo) btnZalo.href = config.zalo;
    
    const btnWa = document.getElementById('btn-wa');
    if (btnWa) btnWa.href = config.whatsapp;
    const btnWaEn = document.getElementById('btn-wa-en');
    if (btnWaEn) btnWaEn.href = config.whatsapp;
    
    const btnCall = document.getElementById('btn-call');
    if (btnCall) btnCall.href = `tel:${config.hotline}`;

    const btnFbEn = document.getElementById('btn-mess-en');
    if (btnFbEn) btnFbEn.href = config.messenger;
    
    // FAQ Accordion
    const faqs = document.querySelectorAll('.faq-title');
    faqs.forEach(faq => {
        faq.addEventListener('click', () => {
            const content = faq.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});
