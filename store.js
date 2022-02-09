const shopItems = document.querySelector(".shop__items");
const cartItemsList = document.querySelector(".cart__items");
const itemQuantity = document.querySelector(".item__quantity");
const purchaseBtn = document.querySelector(".cart__btn_purchase");
const cartTotalPrice = document.querySelector(".cart__total");



const shopProducts = [
  {
    id: 1,
    title: "In Animate",
    price: 65,
    image: "./Images/Alicks-inanimate.jpg",
    inCartQuantity: 1,
  },
  {
    id: 2,
    title: "Help me out",
    price: 45,
    image: "./Images/Alicks-help_me_out.jpg",
    inCartQuantity: 1,
  },
  {
    id: 3,
    title: "Fell",
    price: 55,
    image: "./Images/Alicks-fell.jpg",
    inCartQuantity: 1,
  },
  {
    id: 4,
    title: "Everything is so beautiful",
    price: 60,
    image: "./Images/Alicks-everything_is_so_beautiful.jpg",
    inCartQuantity: 1,
  },
  {
    id: 5,
    title: "A mess",
    price: 75,
    image: "./Images/Alicks-a_mess.jpg",
    inCartQuantity: 1,
  },
  {
    id: 6,
    title: "1997",
    price: 45,
    image: "./Images/Alicks-1997.jpg",
    inCartQuantity: 1,
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const displayProduct = (product) => {
  const { id, title, price, image, inCartQuantity } = product;

  const shopItem = document.createElement("li");
  shopItem.classList.add("shop__item");

  const shopItemTitle = document.createElement("h3");
  shopItemTitle.classList.add("shopItem__title");
  shopItemTitle.innerText = title;

  const shopItemImage = document.createElement("img");
  shopItemImage.classList.add("shopItem__image");
  shopItemImage.src = image;
  shopItemImage.alt = title;

  const shopItemDetials = document.createElement("div");
  shopItemDetials.classList.add("shopItem__details");

  const shopItemPrice = document.createElement("h4");
  shopItemPrice.classList.add("shopItem__price");
  shopItemPrice.innerText = `${price}zł`;

  const shopItemAddProductBtn = document.createElement("button");
  shopItemAddProductBtn.classList.add("shopItem__btn");
  shopItemAddProductBtn.innerText = "ADD TO CART";
  shopItemAddProductBtn.addEventListener("click", () => addProductToCart(id));

  shopItemDetials.appendChild(shopItemPrice);
  shopItemDetials.appendChild(shopItemAddProductBtn);

  shopItem.appendChild(shopItemTitle);
  shopItem.appendChild(shopItemImage);
  shopItem.appendChild(shopItemDetials);

  shopItems.appendChild(shopItem);
};

shopProducts.forEach((product) => displayProduct(product));

const displayCartItem = (cartItem) => {
  const { id, image, title, inCartQuantity, price } = cartItem;

  const cartRow = document.createElement("li");

  cartRow.classList.add(`cart__row`);

  const cartTitle = document.createElement("div");
  cartTitle.classList.add("cart__item");
  cartTitle.classList.add("cart__column");

  const cartItemImage = document.createElement("img");
  cartItemImage.classList.add("cart__item_image");
  cartItemImage.src = image;
  cartItemImage.alt = title;

  const cartItemTitle = document.createElement("h4");
  cartItemTitle.classList.add("cart__item_title");
  cartItemTitle.innerText = title;

  cartTitle.appendChild(cartItemImage);
  cartTitle.appendChild(cartItemTitle);

  const cartPrice = document.createElement("h4");
  cartPrice.classList.add("cart__price");
  cartPrice.classList.add("cart__column");
  cartPrice.innerText = `${price}zł`;

  const cartQuantity = document.createElement("div");
  cartQuantity.classList.add("cart__quantity");
  cartQuantity.classList.add("cart__column");

  const decreaseQuantityBtn = document.createElement("button");
  decreaseQuantityBtn.innerText = "-";
  decreaseQuantityBtn.classList.add("cart__quantityBtn_down");
  decreaseQuantityBtn.disabled = inCartQuantity === 1 ? true : false;

  decreaseQuantityBtn.addEventListener("click", () =>
    decreaseProductQuaniity(id, decreaseQuantityBtn)
  );

  const quantity = document.createElement("h4");
  quantity.classList.add("item__quantity");
  quantity.classList.add(`id${id}`);

  quantity.innerText = inCartQuantity;

  const increaseQuantityBtn = document.createElement("button");
  increaseQuantityBtn.innerText = "+";
  increaseQuantityBtn.classList.add("cart__quantityBtn_up");
  increaseQuantityBtn.addEventListener("click", () =>
    increaseProductQuaniity(id, decreaseQuantityBtn)
  );

  const deleteItemBtn = document.createElement("button");
  deleteItemBtn.innerText = "REMOVE";
  deleteItemBtn.classList.add("cart__quantity_removeBtn");
  deleteItemBtn.addEventListener("click", () =>
    deleteProductFromCart(id, cartRow)
  );

  cartQuantity.appendChild(decreaseQuantityBtn);
  cartQuantity.appendChild(quantity);
  cartQuantity.appendChild(increaseQuantityBtn);
  cartQuantity.appendChild(deleteItemBtn);

  cartRow.appendChild(cartTitle);
  cartRow.appendChild(cartPrice);
  cartRow.appendChild(cartQuantity);

  cartItemsList.appendChild(cartRow);
};

const countCartTotal = (cartItem) => {
  let cartTotal = 0;
  cart.forEach(
    (cartItem) => (cartTotal += cartItem.inCartQuantity * cartItem.price)
  );
  cartTotalPrice.innerText = `Total: ${cartTotal} zł`;
};

const setCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
console.log(cart);

cart.forEach((cartItem) => displayCartItem(cartItem));
countCartTotal();

const addProductToCart = (productId) => {
  const chosenProduct = shopProducts.find(
    (product) => product.id === productId
  );

  if (cart.includes(chosenProduct)) {
    const quantityWrapper = document.querySelector(`.id${productId}`);
    console.log(quantityWrapper, "TUTAJ");

    cart = cart.map((item) => {
      if (item.id === chosenProduct.id) {
        item.inCartQuantity = item.inCartQuantity + 1;
        quantityWrapper.innerText = item.inCartQuantity;
        // return {
        //   ...item,
        //   inCartQuantity: item.inCartQuantity + 1,
        // };
      }
      return item;
    });
    // console.log(itemQuantity);
    // itemQuantity.innerText = chosenProduct.inCartQuantity + 1;
  } else {
    displayCartItem(chosenProduct);

    // cart.push(chosenProduct);

    cart = [...new Set([...cart, chosenProduct])];
  }

  console.log(cart);
  countCartTotal();
  setCartToLocalStorage();
};

const increaseProductQuaniity = (productId, decreaseQuantityBtn) => {
  const quantityWrapper = document.querySelector(`.id${productId}`);
  decreaseQuantityBtn.disabled = false;

  cart = cart.map((product) => {
    if (product.id === productId) {
      product.inCartQuantity += 1;
      quantityWrapper.innerText = product.inCartQuantity;
    }
    return product;
  });

  console.log(cart);
  countCartTotal();
  setCartToLocalStorage();
};

const decreaseProductQuaniity = (productId, decreaseQuantityBtn) => {
  console.log(decreaseQuantityBtn);
  const quantityWrapper = document.querySelector(`.id${productId}`);

  cart = cart.map((product) => {
    if (product.id === productId) {
      if (product.inCartQuantity === 2) {
        decreaseQuantityBtn.disabled = true;
      }
      product.inCartQuantity -= 1;
      quantityWrapper.innerText = product.inCartQuantity;
    }
    return product;
  });

  console.log(cart);
  countCartTotal();
  setCartToLocalStorage();
};

const deleteProductFromCart = (productId, cartRow) => {
  cart = cart.filter((product) => {
    if (product.id === productId) {
      product.inCartQuantity = 1;
    }

    return product.id !== productId;
  });
  console.log(cart);

  cartItemsList.removeChild(cartRow);
  countCartTotal();
  setCartToLocalStorage();
};

const purchaseClicked = () => {
  alert("Thank you for your purchase.");
  while (cartItemsList.children.length > 0) {
    cartItemsList.removeChild(cartItemsList.children[0]);
  }
  cart = [];
  localStorage.removeItem("cart");
  countCartTotal();
  cartTotalPrice.innerText = `Total: 0 zł`;
};

purchaseBtn.addEventListener("click", purchaseClicked);

// let sum = 2 + 5

// sum= sum + 10

// "2 + 5 + 10 * 2 /3"

// const result = eval("2+ 2 + 10 /2");
// // const result2 = eval("2------------");

// console.log(result);

// try {
//   const result2 = eval("2------------");
//   console.log(result2);
// } catch (err) {
//   alert("Popraw dzialanie");
// }

/*const numbers = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3];
console.log(numbers);
console.log([...new Set(numbers)]);*/