// Favorites section

const data = [
    {
        title: 'Not Momo Dumplings',
        id: 'momo',
        description: 'There is no description',
        image: 'images/dal_bhat.jpg',
        price: '$99',
        weight: '399g'
    },
    {
        title: 'Butter Chicken',
        id: 'butter-chicken',
        description: 'Rich butter chicken simmered slow with creamy delight',
        image: 'images/butter_chicken.jpg',
        price: '$25',
        weight: '250g'
    },
    {
        title: 'Biryani',
        id: 'biryani',
        description: 'Fragrant biryani bursting with herbs and warming spice',
        image: 'images/biryani.jpg',
        price: '$20',
        weight: '270g'
    }
];

const container = document.getElementById('cards-block');

data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <img src="${item.image}" alt="${item.title}" class="card-img">
    <div class="card-content-wrapper">
        <div class="card-text">
            <h4>${item.title}</h4>
            <div class="price-weight-row"><h4>${item.price}</h4><h5>${item.weight}</h5></div>
            <p>${item.description}</p>
        </div>
        <div class="card-buttons flex justify-between">
                <a
                onclick="addToCart('${item.id}');"
                href="#add-to-cart"
                  class="add-to-cart flex items-center justify-center text-white bg-[var(--red-color)] w-[150px] h-[35px] rounded-full hover:bg-amber-900 transition duration-300"
                  >Add to cart</a
                >
                <a
                  href="index.html"
                  class="info flex items-center justify-center text-black bg-[var(--gray-color)] w-[150px] h-[35px] rounded-full hover:bg-gray-400 transition duration-300"
                  >Info</a
                >
        </div>
    </div>
    `
    container.appendChild(card);
});


function addToCart(id) {
    // find out which item was clicked
    const item = data.find(item => item.id === id);
    const numberOfItems = parseInt(document.querySelector('#count span').innerText); // 0 
    document.querySelector('#count span').innerText = numberOfItems + 1;

    // if the cart is empty (numberOfItems is 0), hide the cart icon else show it

    if (numberOfItems >= 0) {
        document.querySelector('#count i').style = 'display: none;';
    }

    else {
        document.querySelector('#count i').style = 'display: block;';
    }

    // update the list of items in .cart-items li 

    const cartItems = document.querySelector('.cart-items ul');

    const found = cartItems.querySelector(`#${item.id}`);


    if (found) {
        // if the item is already in the cart, increase the number of items
        const itemNumber = found.querySelector('.cart-item-number');
        itemNumber.innerText = parseInt(itemNumber.innerText) + 1;
    }

    else {
        // create a new list item for the cart
        const listItem = document.createElement('li');
        listItem.innerHTML =
            `
    <li id="${item.id}">
        <h4> ${item.title} </h4>
        <div class="cart-item-price">
            <span>${item.price}</span>
            <a onclick="removeItem('${item.id}');" href="#remove-event" class="remove-item">-</a>
            <span class="cart-item-number">1</span>
            <a href="#addToCart" onclick="addToCart('${item.id}');" class="add-item">+</a>
        </div>
    </li>`;

        // append the new list item to the cart items
        cartItems.appendChild(listItem);
    }

    
    updateLocalStorage();
}


function removeItem(id) {
    const item = data.find(item => item.id === id);
    const numberOfItems = parseInt(document.querySelector('#count span').innerText); // 0 
    document.querySelector('#count span').innerText = numberOfItems - 1;

    if (numberOfItems >= 0) {
        document.querySelector('#count i').style = 'display: none;';
    }

    else {
        document.querySelector('#count i').style = 'display: block;';
    }

    // find the item in the cart-items and update the number 
        const numberofItems = document.querySelector(`#${item.id} .cart-item-number`);
        const currentNumber = parseInt(numberofItems.innerText);
        if (currentNumber > 1) {
            numberofItems.innerText = currentNumber - 1;
        } else {
            document.querySelector(`#${item.id}`).remove();
        }

    updateLocalStorage();

}

function updateLocalStorage() {
    console.log('Updating localStorage with cart items and count');
    // clear localStorage before updating
    localStorage.clear();
    const cartItems = document.querySelector('.cart-items ul').innerHTML;
    localStorage.setItem('cartItems', cartItems);
    const count = document.querySelector('#count span').innerText;
    localStorage.setItem('count', count);
}

function loadCart() {
    const cartItems = localStorage.getItem('cartItems');
    const count = localStorage.getItem('count');
    if (cartItems) {
        document.querySelector('.cart-items ul').innerHTML = cartItems;
    }
    if (count) {
        document.querySelector('#count span').innerText = count;
    }
}

loadCart();