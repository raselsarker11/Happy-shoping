document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://e-shoping-tkrl.onrender.com/card/add/";

  // Fetch Cart Items
  function fetchCartItems() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }

  fetchCartItems();

  // Update Quantity
  function updateQuantity(product, price, isIncreasing) {
   const productInput = document.getElementById(product + "-number");
   let productNumber = parseInt(productInput.value);
 
   if (isIncreasing) {
     productNumber++;
   } else if (productNumber > 0) {
     productNumber--;
   }
 
   productInput.value = productNumber;
   updateItemTotal(product, productNumber, price);
   calculateTotal();
 }
 

  // Update Item Total Price
  function updateItemTotal(product, quantity, price) {
    const itemTotal = document.getElementById(product + "-total");
    itemTotal.innerText = quantity * price;
    calculateTotal(); // Call calculateTotal() after updating the item total
  }

  // Calculate Total
  function calculateTotal() {
    let subTotal = 0;

    // Loop through each product type
    ["case", "case"].forEach((product) => {
      const productNumber = getInputvalue(product);
      const productPrice = product === "case" ? 1219 : 59; // Update price accordingly

      subTotal += productNumber * productPrice;
    });

    const tax = subTotal * 0.1; // Assuming tax is 10% of the subtotal
    const totalPrice = subTotal + tax;

    // Update on the HTML
    document.getElementById("sub-total").innerText = subTotal;
    document.getElementById("tax-amount").innerText = tax;
    document.getElementById("total-price").innerText = totalPrice;
  }

  // Get Input Value
  function getInputvalue(product) {
    const productInput = document.getElementById(product + "-number");
    return parseInt(productInput.value);
  }

  // Event Listeners
  document.getElementById("case-plus").addEventListener("click", function () {
    updateQuantity("case", 59, true);
  });

  document.getElementById("case-minus").addEventListener("click", function () {
    updateQuantity("case", 59, false);
  });

  document.getElementById("case-number").addEventListener("click", function () {
    updateQuantity("case", 1219, true);
  });

  document.getElementById("case-minus").addEventListener("click", function () {
    updateQuantity("case", 1219, false);
  });

  document.querySelectorAll(".btn-danger").forEach((button) => {
    button.addEventListener("click", function () {
      // Remove item from the cart
      // Recalculate total
    });
  });

  document.querySelector(".check-out").addEventListener("click", function () {
    // Implement checkout functionality
  });
});



const getProducts = async () => {
   let cart_items = JSON.parse(localStorage.getItem("cart_items"));
   const cartsContainer = document.getElementById("cart_containers");
   cartsContainer.innerHTML = ""; // Clear the container before adding new items
   
   cart_items?.forEach((item, index) => {
     const cartItemHTML = `
       <div class="cart-item">
         <div class="row">
           <div class="col-md-7 center-item mx-auto">
             <img src="${item.image}" alt="...">
             <h5>${item.name}</h5>
           </div>
           <div class="col-md-5 center-item">
             <div class="input-group number-spinner">
               <button class="btn btn-default decrease-quantity" data-index="${index}"><i class="fas fa-minus"></i></button>
               <input type="number" min="0" class="form-control text-center quantity-input" value="${item.quantity}"/>
               <button class="btn btn-default increase-quantity" data-index="${index}"><i class="fas fa-plus"></i></button>
             </div>
             <h5>$ <span class="item-total">${parseInt(item.price) * parseInt(item.quantity)}</span> </h5>
             <button class="btn btn-danger remove-product" data-index="${index}">Remove</button>
           </div>
         </div>
       </div>
     `;
     cartsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
   });
 
   // Add event listeners to plus and minus buttons
   document.querySelectorAll('.increase-quantity').forEach((button) => {
     button.addEventListener('click', (event) => {
       const index = parseInt(event.target.dataset.index);
       cart_items[index].quantity++;
       updateCart();
     });
   });
 
   document.querySelectorAll('.decrease-quantity').forEach((button) => {
     button.addEventListener('click', (event) => {
       const index = parseInt(event.target.dataset.index);
       if (cart_items[index].quantity > 1) {
         cart_items[index].quantity--;
         updateCart();
       }
     });
   });
 
   // Add event listeners to remove buttons
   document.querySelectorAll('.remove-product').forEach((button, index) => {
     button.addEventListener('click', () => {
       cart_items.splice(index, 1);
       updateCart();
     });
   });
 
   // Function to update cart items and local storage
   function updateCart() {
     localStorage.setItem('cart_items', JSON.stringify(cart_items));
     getProducts(); // Rerender the products
   }
 }
 
 getProducts();


// remove functionality
async function removeProduct(id) {
   let cart_item = JSON.parse(localStorage.getItem("cart_items"))
   let fillercartItem = cart_item.filter(item => item.id !== id);
   localStorage.setItem("cart_items", JSON.stringify(fillercartItem));
}
