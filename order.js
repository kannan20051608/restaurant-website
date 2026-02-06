const menuItems = [
  { name: "Masala Dosa", price: 60 },
  { name: "Idli & Sambar", price: 40 },
  { name: "Pongal", price: 50 },
  { name: "Veg Meals", price: 120 },
  { name: "Chicken Biryani", price: 180 },
  { name: "Parotta", price: 40 },
  { name: "Chicken Curry", price: 120 }
];

const menuDiv = document.getElementById("menuItems");
const grandTotalEl = document.getElementById("grandTotal");
const msg = document.getElementById("msg");

let totalAmount = 0;

// Render menu
menuItems.forEach((item, i) => {
  menuDiv.innerHTML += `
    <div class="item">
      <label>
        <input type="checkbox" id="check${i}" onchange="toggleQty(${i})">
        ${item.name} (₹${item.price})
      </label>
      <input type="number" id="qty${i}" min="1" value="1"
        oninput="calculateTotal()">
    </div>
  `;
});

// Toggle qty
function toggleQty(i) {
  const cb = document.getElementById("check" + i);
  const qty = document.getElementById("qty" + i);

  if (cb.checked) {
    qty.style.display = "block";
    qty.value = 1;
  } else {
    qty.style.display = "none";
    qty.value = "";
  }
  calculateTotal();
}

// Calculate total
function calculateTotal() {
  totalAmount = 0;

  menuItems.forEach((item, i) => {
    if (document.getElementById("check" + i).checked) {
      const qty = Number(document.getElementById("qty" + i).value);
      if (qty > 0) totalAmount += qty * item.price;
    }
  });

  grandTotalEl.textContent = totalAmount;
}

// Submit
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const table = document.getElementById("table").value.trim();
  const btn = document.querySelector("button");

  if (!name || !table) {
    msg.textContent = "Please fill all details";
    msg.style.color = "red";
    return;
  }

  const items = [];
  menuItems.forEach((item, i) => {
    if (document.getElementById("check" + i).checked) {
      const qty = Number(document.getElementById("qty" + i).value);
      if (qty > 0) items.push({ name: item.name, qty, price: item.price });
    }
  });

  if (items.length === 0) {
    msg.textContent = "Select at least one item";
    msg.style.color = "red";
    return;
  }

  // Instant feedback
  msg.textContent = "Order placed successfully!";
  msg.style.color = "green";
  btn.disabled = true;
  btn.textContent = "Order Submitted";

  fetch("https://script.google.com/macros/s/AKfycbxxG9esb7Tjangoz5VAizHFZt8NqkDwtbxDBMrygOMqtS_RE0f24HE-TEB5vKqzT9F6Vg/exec", {
    method: "POST",
    body: JSON.stringify({
      name,
      table,
      items,
      totalAmount
    })
  }).catch(() => console.log("Background save"));
});
