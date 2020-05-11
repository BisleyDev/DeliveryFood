'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const closeBasket = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardRestaurant = document.querySelector(".card-restaurant");
// create card
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const cardsMenu = document.querySelector('.cards-menu');
const logo = document.querySelector('.logo');
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');
// Search
const inputSearch = document.querySelector('.input-search');
// CART
const modalBody = document.querySelector('.modal-body');
const modalPricetag = document.querySelector('.modal-pricetag');
const clearCart = document.querySelector('.clear-cart');

let login = localStorage.getItem('login_Delivery');

const cart = [];

const loadCart = function () {
	if (localStorage.getItem(login)) {
		JSON.parse(localStorage.getItem(login)).forEach(function (item) {
			cart.push(item);
		});
	}
};

const saveCart = function () {
	localStorage.setItem(login, JSON.stringify(cart));
};



// CREATE CARD FILE
// асинхронная функция
const getData = async function(url) {
   const response = await fetch(url);

   if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
   }

   return await response.json();   
};

function createCardsRestaurants(restaurant) {
   const { image, kitchen, name, price, products, stars,
      time_of_delivery: timeOfDelivery } = restaurant;
   
   const card = `
		<a class="card card-restaurant" 
		data-products="${products}"
		data-info="${[ name, price, stars, kitchen ]}">
			<img src="${image}" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">${name}</h3>
					<span class="card-tag tag">${timeOfDelivery} мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
               ${stars}
					</div>
					<div class="price">От ${price} ₽</div>
					<div class="category">${kitchen}</div>
				</div>
			</div>
		</a>
   `;
   cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}

/* function createTitleRestaurant(name) {
   console.log(name);
   const cardTitle = `
      <div class="section-heading">
         <h2 class="section-title restaurant-title">${name}</h2>
         <div class="card-info">
            <div class="rating">
               ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
         </div>
      </div>
   `;

   menu.insertAdjacentHTML('afterbegin', cardTitle);
} */

function createCardGood(goods) {

   const { description, id, image, name, price } = goods;
	const card = document.createElement('div');
	
   card.className = 'card';
   card.insertAdjacentHTML('beforeend', `
      <img src="${image}" alt="${name}" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title card-title-reg">${name}</h3>
			</div>
			<div class="card-info">
				<div class="ingredients">${description}
				</div>
			</div>
			<div class="card-buttons">
				<button class="button button-primary button-add-cart" id="${id}">
					<span class="button-card-text">В корзину</span>
					<span class="button-cart-svg"></span>
				</button>
				<strong class="card-price-bold">${price} ₽</strong>
			</div>
		</div>
   `);   
   cardsMenu.insertAdjacentElement('beforeend', card);
}

function openListGoods(event) {
	const target =  event.target;
	
   if (localStorage.getItem('login_Delivery')) {
		const restaurant = target.closest('.card-restaurant');
		
      if (restaurant) {
			const info = restaurant.dataset.info.split(',');
			const [ name, price, stars, kitchen ] = info;

			restaurantTitle.textContent = name;
			minPrice.textContent = `От ${price} ₽`;
			rating.textContent = stars;
			category.textContent = kitchen;

         containerPromo.classList.add('hide');
         restaurants.classList.add('hide');
         menu.classList.remove('hide');   
         cardsMenu.textContent = ''; 
			//createTitleRestaurant();
			

         getData(`./db/${restaurant.dataset.products}`).then(function(data) {
            data.forEach(createCardGood);
         });
      }
   } else {
      toggleModalAuth();
   }
   
}

function openStartPage() {
   containerPromo.classList.remove('hide');
   restaurants.classList.remove('hide');
   menu.classList.add('hide');
}
// _________________________

// MAIN file
//проверка правильности ввода логина через регулярное выражение
const valid = function(str) {
	const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
	return nameReg.test(str);
};

function toggleModal() {
	modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized() {

	function logOut() {
		login = null;
		cart.length = 0;
		localStorage.removeItem('login_Delivery');
		buttonAuth.style.display = '';
		userName.style.display = '';
		buttonOut.style.display = '';
		cartButton.style.display = '';  
		buttonOut.removeEventListener('click', logOut);    
		checkAuth();
		openStartPage();
	}
	console.log("authorized");	
	userName.textContent = login;	
	buttonAuth.style.display = 'none';
	userName.style.display = 'inline';
	buttonOut.style.display = 'flex';  
	cartButton.style.display = 'flex';  	
	buttonOut.addEventListener('click', logOut);
	loadCart();
}

function notAuthorized() {
	console.log("notAuthorized");
	function logIn(event) {
		event.preventDefault(); // отключение перезагрузки страницы после отправки формы
		if (valid(loginInput.value.trim())) {
			login = loginInput.value;
			localStorage.setItem('login_Delivery', login);  
			toggleModalAuth();
			buttonAuth.removeEventListener('click', toggleModalAuth);
			closeAuth.removeEventListener('click', toggleModalAuth);
			logInForm.removeEventListener('submit', logIn);
			logInForm.reset(); // очистить поле логин
			checkAuth();
		} else {
			event.preventDefault(); // отключение перезагрузки страницы после отправки формы
			alert('Введите логин и пароль!');
		}
	}
	buttonAuth.addEventListener('click', toggleModalAuth); 
	closeAuth.addEventListener('click', toggleModalAuth);
	logInForm.addEventListener('submit', logIn);
	// cardRestaurant.addEventListener('click', toggleModalAuth);

}

function checkAuth() {
  if (login) {
	 authorized();
  } else {
	 notAuthorized();
  }
}

getData('./db/partners.json').then(function(data) {
   data.forEach(createCardsRestaurants);
});
//_________________________

// SEARCH
function searchName(event) {
	let goods = [];

	if (event.keyCode === 13) {
		//console.log(inputSearch.value);
		const target = event.target;
		const value = target.value.toLocaleLowerCase().trim();

		target.value = '';
		if (!value ) {
			target.style.backgroundColor = 'tomato';
			setTimeout(function () { 
				target.style.backgroundColor = '';
			}, 2000);
			return;
		}


		getData('./db/partners.json').then(function(data) {
			const products = data.map(function(item) {
				return item.products;
			});
			products.forEach(function(product) {
				getData('./db/' + product).then(function(data) {
					goods.push(...data); // ... спрэд оператор
					const searchGoods = goods.filter(function(item) {
						return item.name.toLocaleLowerCase().includes(value);
					});
					restaurantTitle.textContent = 'Результат поиска: ' + value;
					minPrice.textContent = '';
					rating.textContent = '';
					category.textContent = '';	

					containerPromo.classList.add('hide');
					restaurants.classList.add('hide');
					menu.classList.remove('hide');   
					cardsMenu.textContent = ''; 

					return searchGoods;
				})
				.then(function(data) {
					if (data.length) {
					data.forEach(createCardGood);	
					} else {
						cardsMenu.style.fontSize = '50px';
						cardsMenu.style.color = 'red';
						cardsMenu.textContent = 'По Вашему запросу ничего не найдено';
					}					
				});
			});
		});

	}
}
// _________________________

// WORK CART (BACKET)

function addToCart(event) {
	const target = event.target;
	const buttonAddCart = target.closest('.button-add-cart');

	if (buttonAddCart) {
		const card = target.closest('.card');
		const title = card.querySelector('.card-title-reg').textContent;
		const price = card.querySelector('.card-price-bold').textContent;
		const id = buttonAddCart.id;

		const food = cart.find(function(item) {
			return item.id === id;
		});
		if (food) {
			food.count += 1;
		} else {
			cart.push({
				id,
				title,
				price,
				count: 1
			});			
		}		
	}
	saveCart();
}

function renderCart() {
	modalBody.textContent = '';
	cart.forEach(function ({ id, title, price, count }) { 
		const itemCart = `
			<div class="food-row">
				<span class="food-name">${title}</span>
				<strong class="food-price">${price}</strong>
				<div class="food-counter">
					<button class="counter-button counter-minus" data-id=${id}>-</button>
					<span class="counter">${count}</span>
					<button class="counter-button counter-plus" data-id=${id}>+</button>
				</div>
			</div>
		`;
		modalBody.insertAdjacentHTML('afterbegin', itemCart);
	});
	const totalPrice = cart.reduce(function(result, item) { 
		return result + (parseFloat(item.price) * item.count);
	}, 0);
	modalPricetag.textContent = totalPrice + ' ₽';
}

function changeCount(event) {
	const target = event.target;

	if (target.classList.contains('counter-button')) {
		const food = cart.find(function (item) {
			return item.id === target.dataset.id;
		});
		if (target.classList.contains('counter-minus')) {
			food.count--;
			if (food.count === 0) {
				cart.splice(cart.indexOf(food), 1);
			}	
		}
		if (target.classList.contains('counter-plus')) {
			food.count++;
		}
		renderCart();
	}
	saveCart();
}

function buttonClearCart() {
	cart.length = 0;
	localStorage.removeItem(login);
	renderCart();
}

// function START
function init() { 
	// create card
	cardsRestaurants.addEventListener('click', openListGoods);
	logo.addEventListener('click', openStartPage);
	
	// Search
	inputSearch.addEventListener('keydown', searchName);
	
	// WORK CART	
	cardsMenu.addEventListener('click', addToCart);

	cartButton.addEventListener("click", function() {
		renderCart();
		toggleModal();
	});
	modalBody.addEventListener('click', changeCount);

	closeBasket.addEventListener("click", toggleModal);

	clearCart.addEventListener('click', buttonClearCart);

	checkAuth();

	// подключение слайдера
	new Swiper('.swiper-container', {
		loop: true,
		autoplay: true
	});
}

init();
