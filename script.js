// JavaScript to handle tab switching and form submission

// Tab navigation logic
const tabs = document.querySelectorAll('.tab-link');
const sections = document.querySelectorAll('.tab-section');

tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const targetTab = e.target.getAttribute('data-tab');

    // Hide all sections and remove active class
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.getElementById(targetTab);
    if (activeSection) {
      activeSection.classList.add('active');
    }
  });
});

// Form submission logic
const form = document.getElementById('contact-form');
const successMessage = document.querySelector('.success-message');

form.addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the default form submission

  // Create FormData object and send via fetch API
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
  })
  .then(response => {
    if (response.ok) {
      form.reset();  // Reset form fields after successful submission
      successMessage.style.display = 'block';  // Show success message
    } else {
      alert('There was an error sending your message. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error!', error);
    alert('There was an error sending your message. Please try again.');
  });
});
