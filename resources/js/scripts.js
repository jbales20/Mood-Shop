const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list') 
const totalDisplay = document.getElementById('cart-total') 
const qtyDisplay = document.getElementById('cart-qty') 
import data from './data.js'

data.forEach(function(elem,i, image){
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop. Can you explain why?
    img.src = data[i].image
    img.width = 300
    img.height = 300

    // Add the image to the div
    newDiv.appendChild(img)
    // put new div inside items container
    itemsContainer.appendChild(newDiv)

    let desc = document.createElement('text')
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)
    let price = document.createElement('text')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    
});


const cart = [ ]

// Add Item
function addItem(name, price){
    for (let i = 0; i < cart.length; i += 1){
        if(cart[i].name === name){
            cart[i].qty += 1
            return
        }
    }


    const item = {name, price, qty: 1}
    cart.push(item)
}

// Show Item
function showItems(){
    totalDisplay.innerHTML = ""
    qtyDisplay.innerHTML = ``
    const qty = getQty()
    let total = findTotal()
    qtyDisplay.innerHTML += `You have ${qty} items in your cart`


    
    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1){
        // { name: 'Apple', price: 0.99, qty: 3}
        const { name, price, qty} = cart[i]
        itemStr += `<li> ${name}  $${price} x ${qty} =  $${qty * price}</li>`
    }
    itemList.innerHTML = itemStr

    totalDisplay.innerHTML += `Total in cart $${total}`

}


// Get Quantity
function getQty(){
    let qty = 0
    for (let i = 0; i < cart.length; i += 1){
        qty += cart[i].qty
    }
    return qty
}


// Find Total
function findTotal(){
    let total = 0
    for (let i = 0; i < cart.length; i += 1){
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

// Removes an Item
function removeItem(name){ // the qty parameter is not needed here
    for (let i = 0; i < cart.length; i++){
        if (cart[i].name === name){
            if (cart[i].qty > 0) {
                cart[i].qty--
            }
            if (cart[i].qty < 1){
                cart.splice(i, 1)
            }
            return
        }
    }
}



const all_items_button = Array.from(document.querySelectorAll("button"))


all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))