const products = [
  {
    name: "Sony Playstation 5",
    url: "images/playstation_5.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Samsung Galaxy",
    url: "images/samsung_galaxy.png",
    type: "smartphones",
    price: 399.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "images/cannon_eos_camera.png",
    type: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "images/sony_a7_camera.png",
    type: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "images/lg_tv.png",
    type: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "images/nintendo_switch.png",
    type: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "images/xbox_series_x.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "images/samsung_tv.png",
    type: "televisions",
    price: 1099.99,
  },
  {
    name: "Google Pixel",
    url: "images/google_pixel.png",
    type: "smartphones",
    price: 499.99,
  },
  {
    name: "Sony ZV1F Camera",
    url: "images/sony_zv1f_camera.png",
    type: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "images/toshiba_tv.png",
    type: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "images/iphone_14.png",
    type: "smartphones",
    price: 999.99,
  },
];

const searchInput = document.getElementById("search");
const cartBtn = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const filtersContainer = document.getElementById("filters-container");
const checkEls = document.querySelectorAll(".check");
// const camerasCheck = document.getElementById("cameras");
// const smartphonesCheck = document.getElementById("smartphones");
// const gamesCheck = document.getElementById("games");
// const televisionsCheck = document.getElementById("televisions");
const productsWrapper = document.getElementById("products-wrapper");

function displayProductToDOM(product) {
  const productEl = document.createElement("div");
  productEl.className = "item space-y-2";
  productEl.setAttribute("data-category", product.type);
  productEl.innerHTML = `
    <div
            class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border"
          >
            <img
              src="${product.url}"
              alt="${product.name}"
              class="w-full h-full object-cover"
            />
            <span
              class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
              >Add To Cart</span
            >
          </div>
          <p class="text-xl">${product.name}</p>
          <strong>$${product.price.toLocaleString()}</strong>
  `;
  productEls.push(productEl);
  productsWrapper.append(productEl);
}

function handleProductClick(e) {
  if (e.target.tagName === "SPAN" || e.target.tagName === "IMG") {
    const item = e.target.closest(".item");
    const itemBtn = item.querySelector(".status");
    if (itemBtn.textContent === "Add To Cart") {
      cartItemsCount++;
      itemBtn.textContent = "Remove From Cart";
      itemBtn.style.backgroundColor = "red";
      // itemBtn.classList.remove("bg-black");
      // itemBtn.classList.add("bg-red");
    } else {
      cartItemsCount--;
      itemBtn.textContent = "Add To Cart";
      itemBtn.style.backgroundColor = "";
      // itemBtn.classList.remove("bg-red");
      // itemBtn.classList.add("bg-black");
    }
    cartCount.textContent = cartItemsCount;
  }
}

function filterProducts(category = "") {
  const text = searchInput.value.trim().toLowerCase();
  if (!category) {
    checkEls.forEach((checkEl) => {
      if (checkEl.checked) {
        category = checkEl.id;
      }
    });
  }
  productsWrapper.innerHTML = "";
  let filteredProductEls;

  if (text && category) {
    filteredProductEls = productEls.filter(
      (product) =>
        product.querySelector("p").textContent.toLowerCase().includes(text) &&
        product.dataset.category === category,
    );
  } else if (text) {
    filteredProductEls = productEls.filter((product) =>
      product.querySelector("p").textContent.toLowerCase().includes(text),
    );
  } else if (category) {
    filteredProductEls = productEls.filter(
      (product) => product.dataset.category === category,
    );
  } else {
    filteredProductEls = productEls;
  }

  filteredProductEls.forEach((product) => productsWrapper.append(product));
}

let cartItemsCount = 0;

const productEls = [];

products.forEach((product) => displayProductToDOM(product));

productsWrapper.addEventListener("click", handleProductClick);

searchInput.addEventListener("input", (e) => filterProducts());

checkEls.forEach((checkEl) =>
  checkEl.addEventListener("change", (e) => {
    checkEls.forEach((checkEl) => {
      if (checkEl.id !== e.target.id) {
        checkEl.checked = false;
      }
    });
    if (!e.target.checked) return filterProducts();
    filterProducts(e.target.id);
  }),
);
