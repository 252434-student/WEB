const calculateTotalPrice = () => {
    const totalPrice = document.querySelector('.total-price');
    const cartContent = document.querySelectorAll('.cart-box');
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        const priceElement = cartBox.querySelector('.price');
        const quantityElement = cartBox.querySelector('.number');
        const price = priceElement.textContent.replace("₸","");
        const quantity = quantityElement.textContent;
        total = price * quantity;
        totalPrice.textContent = `${total}₸`;
    })
}