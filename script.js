// Show the relevant content section when a tab is clicked
document.querySelectorAll('nav ul li a').forEach(tab => {
    tab.addEventListener('click', function(event) {
        event.preventDefault();

        // Hide all sections
        document.querySelectorAll('.tab-content').forEach(section => {
            section.style.display = 'none';
        });

        // Show the clicked section
        const target = document.querySelector(tab.getAttribute('href'));
        target.style.display = 'block';
    });
});

// Show the 'About' section by default when the page loads
document.getElementById('about').style.display = 'block';
