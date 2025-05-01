function showTab(id) {
  const tabs = document.querySelectorAll('section');
  const links = document.querySelectorAll('nav a');

  tabs.forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  links.forEach(link => link.classList.remove('active-tab'));
  const activeLink = Array.from(links).find(link => link.getAttribute('onclick').includes(id));
  if (activeLink) activeLink.classList.add('active-tab');
}

