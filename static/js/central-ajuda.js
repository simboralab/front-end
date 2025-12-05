// Função para alternar FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');

    // Alternar classe ativs
    element.classList.toggle('active');
    answer.classList.toggle('active');

    // Ffechar outros FAQs abertos
    const allFaqs = document.querySelectorAll('.faq-item');
    allFaqs.forEach(faq => {
        if (faq !== faqItem) {
            faq.querySelector('.faq-question').classList.remove('active');
            faq.querySelector('.faq-answer').classList.remove('active');
        }
    });
}
