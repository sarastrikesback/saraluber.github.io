// Tab navigation logic
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-link');
  const sections = document.querySelectorAll('.tab-section');

  // Hide all sections
  sections.forEach(section => section.classList.remove('active'));

  // Show default section (About)
  const defaultSection = document.getElementById('about');
  if (defaultSection) defaultSection.classList.add('active');

  // Handle tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = tab.getAttribute('data-tab');

      sections.forEach(section => section.classList.remove('active'));
      const targetSection = document.getElementById(targetTab);
      if (targetSection) targetSection.classList.add('active');
    });
  });
});

// Contact form submission logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const successMessage = document.querySelector('.success-message');
  const errorMessage = document.querySelector('.error-message'); // New error message element
  const contactSection = document.querySelector('.contact-form'); // To hide the form on success

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      })
        .then(response => {
          if (response.ok) {
            // Reset the form and show success message
            form.reset();
            if (successMessage) {
              successMessage.style.display = 'block';
            }

            // Optionally hide the form after submission (if desired)
            if (contactSection) {
              contactSection.style.display = 'none';
            }
          } else {
            // Show error message if the submission fails
            if (errorMessage) {
              errorMessage.style.display = 'block';
            }
            alert('There was an error sending your message. Please try again.');
          }
        })
        .catch(error => {
          // Handle errors in case of a fetch issue
          console.error('Error!', error);
          if (errorMessage) {
            errorMessage.style.display = 'block';
          }
          alert('There was an error sending your message. Please try again.');
        });
    });
  }
});
