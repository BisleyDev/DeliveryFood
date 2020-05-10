'use strict';

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
			<!-- /.card-heading -->
			<div class="card-info">
				<div class="ingredients">${description}
				</div>
			</div>
			<!-- /.card-info -->
			<div class="card-buttons">
				<button class="button button-primary button-add-cart">
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


getData('./db/partners.json').then(function(data) {
   data.forEach(createCardsRestaurants);
});



cardsRestaurants.addEventListener('click', openListGoods);
logo.addEventListener('click', openStartPage);


