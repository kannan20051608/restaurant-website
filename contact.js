function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg = document.getElementById("formMsg");

  if (name === "" || email === "" || message === "") {
    msg.style.color = "red";
    msg.textContent = "Please fill all fields.";
    return false;
  }

  msg.style.color = "green";
  msg.textContent = "Message sent successfully!";
  return false; // frontend demo only
}
