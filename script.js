const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {button.addEventListener("click", event=>{
    const productBox = event.target.closest(".food-item");
    addToCart(productBox);
    calculateTotalPrice();
    updateCartCount();
})});

function calculateTotalPrice(){
    const totalPrice = document.querySelector('.total-price');
    const cartBoxes = document.querySelectorAll('.cart-box');
    let total = 0;
    for (const cartBox of cartBoxes) {
        const priceElement = cartBox.querySelector('.cart-price');
        const quantityElement = cartBox.querySelector('.number');
        const price = priceElement.textContent.replace("₸","");
        const quantity = quantityElement.textContent;
        total += Number(price) * Number(quantity);
    }
    totalPrice.textContent = total+'₸';
}

let cartItemCount = 0;
function updateCartCount(){
    const cartIcon = document.querySelector(".cart-icon");
    const cartBoxes = document.querySelectorAll('.cart-box');
    if(cartBoxes.length > 0){
        cartIcon.classList.add("notify");
    }
    else{
        cartIcon.classList.remove("notify");
    }
}

const cartContent = document.querySelector(".cart-content");
function addToCart(productBox){
    const productTitle = productBox.querySelector(".food-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItems) {
        if(item.textContent === productTitle){
            alert("Это блюдо уже находится в корзине!");
            return;
        }
    }
    alert("Добавлено в корзину!");

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
       <div class="cart-detail">
            <h5 class="cart-product-title">${productTitle}</h5>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
        `;
    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", event=>{
        cartBox.remove();
        calculateTotalPrice();
        updateCartCount();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event=>{
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if(event.target.id === "decrement" && quantity > 1){
            quantity--;
            if(quantity === 0){
                decrementButton.style.color = "#999";
            }
        }
        else if(event.target.id === "increment"){
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;
        calculateTotalPrice();
    });
}


const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", event=>{
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if(cartBoxes.length === 0){
        alert("Ваша корзина пуста. Добавьте в неё блюда перед заказом.");
        return;
    }
    alert("Спасибо за ваш заказ!");
    for (const cartBox of cartBoxes) {
        cartBox.remove();
    }
    cartItemCount = 0;
    calculateTotalPrice();
    updateCartCount();
});