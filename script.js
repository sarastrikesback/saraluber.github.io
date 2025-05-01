<script>
    // Function to show a specific section when a tab is clicked
    function showTab(tabId) {
        // Hide all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove the active class from all tabs
        const tabs = document.querySelectorAll('nav a');
        tabs.forEach(tab => {
            tab.classList.remove('active-tab');
        });

        // Show the selected section
        const activeSection = document.getElementById(tabId);
        activeSection.classList.add('active');

        // Highlight the clicked tab
        const activeTab = document.querySelector(`a[onclick="showTab('${tabId}')"]`);
        activeTab.classList.add('active-tab');
    }
</script>
