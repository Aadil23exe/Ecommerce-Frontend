console.log("E-Commerce Website Loaded");
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");

    hamburger.addEventListener("click", () => {
        nav.classList.toggle("nav-open");
    });
});

let mydata=[];
fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            mydata = data;
            
            
        });
let all_item_ids=[]
let all_items=[]
function addToCart(id, goToCart = false) {

    let cart_items = JSON.parse(localStorage.getItem("cart_items")) || []
    const product = mydata.find(item => item.id == id)

    if (!product) return

    const option1 = ""
    const option2 = ""
    const quantity = 1

    const existingIndex = cart_items.findIndex(item =>
        item.id === product.id &&
        (item.option1 || "") === option1 &&
        (item.option2 || "") === option2
    )

    if (existingIndex > -1) {
        cart_items[existingIndex].quantity =
            (parseInt(cart_items[existingIndex].quantity) || 1) + quantity
    } else {
        cart_items.push({
            ...product,
            option1,
            option2,
            quantity
        })
    }

    localStorage.setItem("cart_items", JSON.stringify(cart_items))
    updateCartCount()

    if (goToCart) {
        window.location.href = "cart.html"
    }
}

function viewCart() {
    const cartContainer = document.getElementById("cart-items")
    const totalElement = document.getElementById("cart-total")
    const checkoutBtn = document.getElementById("checkout-btn")

    let cart_items = JSON.parse(localStorage.getItem("cart_items")) || []

    if (cart_items.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>"
        if (totalElement) totalElement.innerText = "0.00"
        if (checkoutBtn) checkoutBtn.disabled = true
        return
    }

    if (checkoutBtn) checkoutBtn.disabled = false

    let total = 0
    let html = ""

    cart_items.forEach((item, index) => {
        const quantity = parseInt(item.quantity) || 1
        const itemTotal = item.price * quantity
        total += itemTotal

        html += `
        <div class="cart-item">
            <div class="cart-left" onclick='openProductFromCart(${index})'>
                <img src="${item.image}" width="80">
                <div>
                    <h3>${item.title}</h3>
                    ${item.option1 ? `<p>${item.option1}</p>` : ``}
                    ${item.option2 ? `<p>${item.option2}</p>` : ``}
                    <p>$${item.price}</p>
                </div>
            </div>

            <div class="cart-right">
                <div class="qty-control">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>${quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
                <p>$${itemTotal.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeFromCartByIndex(${index})">Remove</button>
            </div>
        </div>
        `
    })

    cartContainer.innerHTML = html
    if (totalElement) totalElement.innerText = total.toFixed(2)
    updateCartCount()
}

function openProductFromCart(index){
    let cart_items = JSON.parse(localStorage.getItem("cart_items")) || []
    let product = cart_items[index]

    localStorage.setItem("selected_product", JSON.stringify(product))
    localStorage.setItem("from_cart", "true")

    window.location.href = "productdetailpage.html"
}

function removeFromCartByIndex(index) {
    let cart_items = JSON.parse(localStorage.getItem("cart_items")) || []

    cart_items.splice(index, 1)

    if (cart_items.length === 0) {
        localStorage.removeItem("cart_items")
    } else {
        localStorage.setItem("cart_items", JSON.stringify(cart_items))
    }

    viewCart()
}
function changeQty(index, change) {
    let cart_items = JSON.parse(localStorage.getItem("cart_items")) || []

    if (!cart_items[index]) return

    let newQty = (parseInt(cart_items[index].quantity) || 1) + change

    if (newQty < 1) return

    cart_items[index].quantity = newQty

    localStorage.setItem("cart_items", JSON.stringify(cart_items))
    viewCart()
}   
function getProductDetails(productId) {
            const product = mydata.find(item => item.id == productId);
            if (product) {
                document.querySelector('.container').innerHTML = `
                    <div class="product-detail">
                        <img src="${product.image}" alt="${product.title}" loading="lazy">
                        <h1>${product.title}</h1>
                        <p>${product.description}</p>
                        <span>$${product.price}</span>
                        <button id=${product.id} onClick='addToCart(${product.id})'>Add to Cart</button>
                    </div>
                `;
            } else {
                document.querySelector('.container').innerHTML = `<p>Product not found.</p>`;
            }
        }
    function updateCartCount(){
    const countElement = document.getElementById("cart-count")
    if(!countElement) return

    const cart_items = JSON.parse(localStorage.getItem("cart_items")) || []
    countElement.innerText = cart_items.length
        countElement.classList.add("bump")
    setTimeout(()=>{
        countElement.classList.remove("bump")
    },300)
}
document.addEventListener("DOMContentLoaded", ()=>{
    updateCartCount()
})
function showToast(message="Added to cart ✓"){
    const toast = document.getElementById("toast")
    if(!toast) return
    toast.innerText = message
    toast.classList.add("show")

    setTimeout(()=>{
        toast.classList.remove("show")
    },2000)
}
function showToast(message){
    const toast = document.getElementById("toast")
    if(!toast) return

    toast.innerText = message
    toast.classList.add("show")

    setTimeout(()=>{
        toast.classList.remove("show")
    },2000)
}
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart-items")) {
        viewCart()
    }
})