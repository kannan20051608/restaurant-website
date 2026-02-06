function filterMenu(type, btn) {
  const items = document.querySelectorAll(".menu-item");
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  items.forEach(item => {
    item.style.display =
      type === "all" || item.classList.contains(type)
        ? "block"
        : "none";
  });
}
