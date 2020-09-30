const itemsContainer = document.getElementById('items')
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
    let qty = getQty()
    let total = findTotal()
    console.log(`You have ${qty} items in your cart`)

    for (let i = 0; i < cart.length; i += 1){
        console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
    }

    console.log(`Total in cart $${total}`)
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
function removeItem(name){
    for (let i = 0; i < cart.length; i += 1){
        if (cart[i].name === name){
            console.log(cart[i].qty)
            if (cart[i].qty > 0){
                cart[i].qty -= 1
            }
            if(cart[i].qty < 1){
                cart.splice(i, 1)
            }
            return
        }
    }
}

addItem('Apple', 0.99)
addItem('Orange', 2.99)
addItem('Apple', 0.99)
addItem('Taco', 3.12)
removeItem("Apple")


showItems()
