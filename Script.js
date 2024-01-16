<script>
  let openShopping = document.querySelector('.shopping');
  let closeShopping = document.querySelector('.closeShopping');
  let list = document.querySelector('.list');
  let listCard = document.querySelector('.listCard');
  let body = document.querySelector('body');
  let total = document.querySelector('.total');
  let quantity = document.querySelector('.quantity');

  openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
  })
  closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
  })
  let products = [
    {% for item in module.food_card %}
    {
      id: {{ item.food_id }},                                                     
      name: '{{ item.food_name }}',
      image: '{{ item.food_image.src }}',
      price: 	{{ item.food_price }}
    },
    {% endfor %}  
  ];
  let listCards  = [];
  function initApp(){
    products.forEach((value, key) =>{
      let newDiv = document.createElement('div');
      newDiv.classList.add('item');
      newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})" class='popup'>Add To Card
  </button> 
            <p class='add' >ADDED</p> `;
      list.appendChild(newDiv);
    })
  }
  initApp();
  function addToCard(key){
    if(listCards[key] == null){
      // copy product form list to list card
      listCards[key] = JSON.parse(JSON.stringify(products[key]));
      listCards[key].quantity = 1;
    }
    else{
      alert(' Already added to cart');
    }
    reloadCard();
  }
  function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
      totalPrice = totalPrice + value.price;
      count = count + value.qua88ntity;
      if(value != null){
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
                <div><img src="${value.image}"></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
  </div>`;
        listCard.appendChild(newDiv);
      }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
  }
  function changeQuantity(key, quantity){
    if(quantity == 0){
      delete listCards[key];
    }else{
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
  }
</script>
