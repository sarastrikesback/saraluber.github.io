// Tab navigation logic
const tabs = document.querySelectorAll('.tab-link');
const sections = document.querySelectorAll('.tab-section');

tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const targetTab = e.target.getAttribute('data-tab');
    
    // Remove 'active' class from all sections
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Add 'active' class to the clicked tab's corresponding section
    document.getElementById(targetTab).classList.add('active');
  });
});
