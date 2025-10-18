document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-link');
  const sections = document.querySelectorAll('.tab-section');

  // Show default tab (About)
  sections.forEach(section => section.classList.remove('active'));
  const defaultSection = document.getElementById('about');
  if (defaultSection) defaultSection.classList.add('active');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = tab.getAttribute('data-tab');

      sections.forEach(section => section.classList.remove('active'));
      const targetSection = document.getElementById(targetTab);
      if (targetSection) targetSection.classList.add('active');
    });
  });

  // Contact form logic
  const form = document.getElementById('contact-form');
  const successMessage = document.querySelector('.success-message');
  let errorMessage = document.querySelector('.error-message');
  
  // If errorMessage element doesn't exist, create it dynamically
  if (!errorMessage && form) {
    errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.style.display = 'none';
    errorMessage.textContent = 'There was an error sending your message. Please try again.';
    form.appendChild(errorMessage);
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      })
        .then(response => {
          if (response.ok) {
            form.reset();
            if (successMessage) successMessage.style.display = 'block';
            if (errorMessage) errorMessage.style.display = 'none';
          } else {
            if (errorMessage) errorMessage.style.display = 'block';
            if (successMessage) successMessage.style.display = 'none';
          }
        })
        .catch(error => {
          console.error('Error!', error);
          if (errorMessage) errorMessage.style.display = 'block';
          if (successMessage) successMessage.style.display = 'none';
        });
    });
  }
});
