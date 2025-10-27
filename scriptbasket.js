const icon = document.querySelector("#icon_mood");
const basketContainer = document.querySelector(".basket-container");
const basket = JSON.parse(localStorage.getItem("basket")) || [];

if (basket.length === 0) {
  basketContainer.innerHTML = "<p>Your basket is empty 😢</p>";
} else {
  const itemsHTML = basket
    .map(
      (item) => `
      <div class="basket-item">
        <img src="${item.img}" alt="${item.name}" />
        <div>
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
        </div>
        <button onclick="removeFromBasket(${item.id})">Remove</button>
      </div>
    `
    )
    .join("");

  basketContainer.innerHTML = itemsHTML;
}
function handleTheme() {
  document.body.classList.toggle("dark_theme");
  icon.src = document.body.classList.contains("dark_theme")
    ? "./img/sun.png"
    : "./img/moon.png";
}
// حذف از سبد
icon.addEventListener("click", handleTheme);
function removeFromBasket(id) {
  const updatedBasket = basket.filter((item) => item.id !== id);
  localStorage.setItem("basket", JSON.stringify(updatedBasket));
  window.location.reload(); // صفحه رو دوباره لود کن تا لیست آپدیت شه
}
