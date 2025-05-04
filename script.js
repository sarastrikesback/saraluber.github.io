// Tab navigation logic
const tabs = document.querySelectorAll('.tab-link');
const sections = document.querySelectorAll('.tab-section');

tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const targetTab = e.target.getAttribute('data-tab');

    // Hide all sections
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(targetTab).classList.add('active');
  });
});

// Form submission logic
const form = document.getElementById('contact-form');
const successMessage = document.querySelector('.success-message');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      successMessage.style.display = 'block';
    } else {
      alert('There was an error sending your message. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error!', error);
    alert('There was an error sending your message. Please try again.');
  });
});
