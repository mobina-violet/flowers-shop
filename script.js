// ✅ Dynamic products array
const PRODUCTS = [
  {
    id: 1,
    name: "Romantic Rose Bouquet",
    price: 24.99,
    oldPrice: 29.99,
    discount: "-17%",
    img: "./img/img1.jpg",
    category: "bouquet",
  },
  {
    id: 2,
    name: "Spring Tulip Vase",
    price: 18.5,
    oldPrice: 21.0,
    discount: "-12%",
    img: "./img/img2.jpg",
    category: "bouquet",
  },
  {
    id: 3,
    name: "Sunny flower",
    price: 14.99,
    oldPrice: 17.5,
    discount: "-14%",
    img: "./img/img3.jpg",
    category: "bouquet",
  },
  {
    id: 4,
    name: "Pure White Lily Basket",
    price: 26.99,
    oldPrice: 31.0,
    discount: "-13%",
    img: "./img/img4.jpg",
    category: "bouquet",
  },
  {
    id: 5,
    name: "Mini Orchid Pot",
    price: 22.49,
    oldPrice: 26.0,
    discount: "-14%",
    img: "./img/img5.jpg",
    category: "pot",
  },
  {
    id: 6,
    name: "Green Leafy Pot",
    price: 19.99,
    oldPrice: 23.0,
    discount: "-13%",
    img: "./img/img6.jpg",
    category: "pot",
  },
  {
    id: 7,
    name: "Lavender Breeze Pot",
    price: 16.5,
    oldPrice: 19.0,
    discount: "-13%",
    img: "./img/img7.jpg",
    category: "pot",
  },
  {
    id: 8,
    name: "Pink Blossom Pot",
    price: 27.99,
    oldPrice: 32.0,
    discount: "-15%",
    img: "./img/img8.jpg",
    category: "pot",
  },
  {
    id: 9,
    name: "Rustic Garden Basket",
    price: 32.99,
    oldPrice: 39.0,
    discount: "-15%",
    img: "./img/s1.jfif",
    category: "basket",
  },
  {
    id: 10,
    name: "Golden Daisy Basket",
    price: 29.5,
    oldPrice: 35.0,
    discount: "-16%",
    img: "./img/s2.jfif",
    category: "basket",
  },
  {
    id: 11,
    name: "Blush Peony Basket",
    price: 34.99,
    oldPrice: 40.0,
    discount: "-13%",
    img: "./img/s3.jfif",
    category: "basket",
  },
  {
    id: 12,
    name: "Lavish Orchid Basket",
    price: 38.49,
    oldPrice: 44.0,
    discount: "-12%",
    img: "./img/s4.jfif",
    category: "basket",
  },
];

let BASKET = [];

// ✅ Select elements
const boxContainer = document.querySelector(".products .box_container");
const basketBtn = document.querySelector(".basket");
const counterBasket = document.querySelector(".counter");
const icon = document.querySelector("#icon_mood");
const inputName = document.querySelector("#input_name");
const inputEmail = document.querySelector('input[type="email"]');
const inputNumber = document.querySelector('input[type="number"]');
const inputMessage = document.querySelector("textarea");
const timer = document.getElementById("time");
const date = document.getElementById("date");
const logoProducts = document.querySelector(".logo");
const inputBtn = document.querySelector("#input_btn");
const homeSection = document.querySelector(".home");
const sections = document.querySelectorAll("section");
const productsSection = document.querySelector(".products");

const btnAll = document.getElementById("all");
const btnPot = document.getElementById("pot");
const btnBouquet = document.getElementById("bouquet");
const btnBasket = document.getElementById("basket");

const open = document.querySelector("#open");
const madalContainer = document.querySelector(".madal-contaner");
const close = document.querySelector("#close");

//  Forms validation
const handleForms = () => {
  const name = inputName.value.trim();
  const email = inputEmail.value.trim();
  const number = inputNumber.value.trim();
  const message = inputMessage.value.trim();

  //regex
  const invalidName = /^[\d.#]/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberPattern = /^\d+$/;

  if (!name || !email || !number) {
    alert("Please fill out the form completely.");
    return;
  }

  if (invalidName.test(name)) {
    alert("Name cannot start with a number, '.' or '#'");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email!");
    return;
  }

  if (!numberPattern.test(number)) {
    alert("Number should contain only digits!");
    return;
  }

  const data = { name, email, number, message };
  console.log(data);

  inputName.value = "";
  inputEmail.value = "";
  inputNumber.value = "";
  inputMessage.value = "";
};

//  Theme toggle
const handleTheme = () => {
  document.body.classList.toggle("dark_theme");
  icon.src = document.body.classList.contains("dark_theme")
    ? "./img/sun.png"
    : "./img/moon.png";
  //? yani hamon if
  //: yani hamon else
};

// Render products
//tofixed method bara 2ragham ashar
const render = (list) => {
  const template = list
    .map((product) => {
      const inBasket = BASKET.find((item) => item.id === product.id);
      return `
      <div class="box">
        <span class="discount">${product.discount}</span>
        <div class="image">
          <img src="${product.img}" alt="${product.name}" />
        </div>
        <div class="content">
          <h3>${product.name}</h3>
          <div class="price">
            $${product.price.toFixed(2)} 
            <span>$${product.oldPrice.toFixed(2)}</span>
          </div>
        </div>
        <div>
          ${
            inBasket
              ? `<button onclick="handleBasket(${product.id})" class="remove">REMOVE</button>`
              : `<button onclick="handleBasket(${product.id})">ADD TO BASKET</button>`
          }
        </div>
      </div>
    `;
    })
    .join("");
  boxContainer.innerHTML = template;
};

//  Filter products by category
const renderFiltered = (category) => {
  const filteredProducts =
    category === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);
  //agar products==all bod  ? hame ro neshon bde
  // dar gheir in sorat bar asas category entekhab kon
  render(filteredProducts);
};

// Handle basket
const handleBasket = (productId) => {
  const selectedProduct = PRODUCTS.find((item) => item.id === productId);
  if (!selectedProduct) return;

  const inBasket = BASKET.find((item) => item.id === productId);

  if (inBasket) {
    BASKET = BASKET.filter((item) => item.id !== productId);
  } else {
    BASKET.push(selectedProduct);
  }

  // Save to localStorage
  //setItem(key, value)
  //object ro be string tabdil mikone
  localStorage.setItem("basket", JSON.stringify(BASKET));
  counterBasket.textContent = BASKET.length;

  // Update buttons
  render(PRODUCTS);
};

// Show only basket items
const showBasket = () => {
  render(BASKET);
};

// Digital clock
const updateClock = () => {
  const now = new Date();
  // method padstar add 8 ra be 08 tabdil mikonad
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");

  timer.textContent = `${hours}:${minutes}:${seconds}`;

  //long= کامل
  //numeric=عدد
  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  date.textContent = now.toLocaleDateString("en-US", option);
};
//setInterval(تابع, فاصله_زمانی);
setInterval(updateClock, 1000);
updateClock();

//مقدار JSON رو دوباره به آرایه (یا آبجکت) تبدیل می‌کنه.
const updateBasketCount = () => {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  counterBasket.textContent = basket.length;
};
updateBasketCount();

basketBtn.addEventListener("click", () => {
  window.location.href = "basket.html"; // مسیر صفحه‌ی سبد خرید
});

// Event listeners
window.addEventListener("load", () => render(PRODUCTS));

//vaghti click kardim ro logo hame products ro neshon bde & hame disply ha none bshe
logoProducts.addEventListener("click", (e) => {
  e.preventDefault();
  sections.forEach((section) => (section.style.display = "none"));
  productsSection.style.display = "block";
  boxContainer.innerHTML = "";
  render(PRODUCTS);
  window.scrollTo({ top: 2, behavior: "smooth" });
});

icon.addEventListener("click", handleTheme);
inputBtn.addEventListener("click", handleForms);

btnAll.addEventListener("click", () => renderFiltered("all"));
btnPot.addEventListener("click", () => renderFiltered("pot"));
btnBouquet.addEventListener("click", () => renderFiltered("bouquet"));
btnBasket.addEventListener("click", () => renderFiltered("basket"));

basketBtn.addEventListener("click", showBasket);

//modal => vaghti click kardm ro button learn more modal baz bshe
open.addEventListener("click", () => {
  madalContainer.classList.add("show");
});
close.addEventListener("click", () => {
  madalContainer.classList.remove("show");
});
