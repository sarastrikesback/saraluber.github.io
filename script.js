function showTab(id) {
  // Remove 'active' class from all sections
  const tabs = document.querySelectorAll('section');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Add 'active' class to the clicked section
  const activeTab = document.getElementById(id);
  activeTab.classList.add('active');

  // Remove 'active' class from all navigation links
  const navLinks = document.querySelectorAll('header nav ul li a');
  navLinks.forEach(link => link.classList.remove('active'));

  // Add 'active' class to the clicked navigation link
  const activeLink = document.querySelector(`header nav ul li a[href="#${id}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}
