const tabs = document.querySelectorAll('.tab-link');
const sections = document.querySelectorAll('section');

tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const tabId = tab.getAttribute('data-tab');

    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));

    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active-tab'));

    // Show the clicked section
    document.getElementById(tabId).classList.add('active');

    // Highlight the clicked tab
    tab.classList.add('active-tab');
  });
});
