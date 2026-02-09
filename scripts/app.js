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
function addToCart(id){
        alert(id + " added to cart");
        mydata.forEach(element=>{
            if(element.id==id){
                all_items.push(element);
                all_item_ids.push(id);
                console.log(all_items);
                console.log(all_item_ids);
            }
            
        });
        localStorage.setItem("cart_items", JSON.stringify(all_items));
}

function viewCart(){
    if(localStorage.getItem("cart_items")===null){
        document.getElementById("cart-items").innerHTML="No items in cart";
    }
    else{
        let cart_items=JSON.parse(localStorage.getItem("cart_items"));
       console.log(cart_items);
        let cart_html="";
        let order=0;
        cart_items.forEach(item => {
            cart_html +=`
            <li class=${order}>
            <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <h2>${item.title}</h2>
                    <span><span>Price:</span style="color:black"> $${item.price}</span>
                    <button id=${item.id} onClick='removeFromCart(${item.id})'>Remove</button>
                </div>
            </li>
            `;
            order++;
        });
        document.getElementById("cart-items").innerHTML = cart_html;
    }
}

function removeFromCart(id) {
    let cart_items = JSON.parse(localStorage.getItem("cart_items")) || [];
    const index = cart_items.findIndex(item => item.id == id);
    if (index > -1) {
        cart_items.splice(index, 1);
    }

    if (cart_items.length === 0) {
        localStorage.removeItem("cart_items");
    } else {
        localStorage.setItem("cart_items", JSON.stringify(cart_items));
    }
    viewCart();
}