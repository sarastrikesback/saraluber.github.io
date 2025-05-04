// JavaScript to switch tabs
const tabs = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

tabs.forEach(tab => {
  tab.addEventListener('click', (event) => {
    // Remove active class from all tabs
    tabs.forEach(tab => tab.classList.remove('active-tab'));
    
    // Add active class to clicked tab
    event.target.classList.add('active-tab');
    
    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));
    
    // Show the section corresponding to clicked tab
    const targetSection = document.querySelector(event.target.getAttribute('href'));
    targetSection.classList.add('active');
  });
});
