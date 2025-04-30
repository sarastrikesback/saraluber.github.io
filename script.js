function showTab(id) {
  const tabs = document.querySelectorAll('section');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
