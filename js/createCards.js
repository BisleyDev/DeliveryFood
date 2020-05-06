'use strict';

const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const cardsMenu = document.querySelector('.cards-menu');
const logo = document.querySelector('.logo');

function createCardsRestaurants() {
   const card = `
		<a class="card card-restaurant">
			<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">Пицца плюс</h3>
					<span class="card-tag tag">50 мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						4.5
					</div>
					<div class="price">От 900 ₽</div>
					<div class="category">Пицца</div>
				</div>
			</div>
		</a>
   `;

   cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}

//Alternative
/* function createCardsGoods() {
   const cardGoods = `
      <div class="card">
         <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
         <div class="card-text">
            <div class="card-heading">
               <h3 class="card-title card-title-reg">Пицца Везувий</h3>
            </div>
            <div class="card-info">
               <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
                  «Халапенье», соус «Тобаско», томаты.
               </div>
            </div>
            <div class="card-buttons">
               <button class="button button-primary button-add-cart">
                  <span class="button-card-text">В корзину</span>
                  <span class="button-cart-svg"></span>
               </button>
               <strong class="card-price-bold">545 ₽</strong>
            </div>
         </div>
      </div>
   `;

   cardsMenu.insertAdjacentHTML('afterbegin', cardGoods);
} */

function createCardGood() {
   const card = document.createElement('div');
   card.className = 'card';

   card.insertAdjacentHTML('beforeend', `
      <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title card-title-reg">Пицца Везувий</h3>
			</div>
			<!-- /.card-heading -->
			<div class="card-info">
				<div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
					«Халапенье», соус «Тобаско», томаты.
				</div>
			</div>
			<!-- /.card-info -->
			<div class="card-buttons">
				<button class="button button-primary button-add-cart">
					<span class="button-card-text">В корзину</span>
					<span class="button-cart-svg"></span>
				</button>
				<strong class="card-price-bold">545 ₽</strong>
			</div>
		</div>
   `);



   
   cardsMenu.insertAdjacentElement('beforeend', card);
}

function openListGoods(event) {
   const target =  event.target;
   let clickPlace = target.closest('.card-restaurant');
   
   if (clickPlace) {

      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      cardsMenu.textContent = '';

      //createCardsGoods();
      createCardGood();

   } 
   
}

function openStartPage() {
   containerPromo.classList.remove('hide');
   restaurants.classList.remove('hide');
   menu.classList.add('hide');
  }


createCardsRestaurants();
createCardsRestaurants();
createCardsRestaurants();

cardsRestaurants.addEventListener('click', openListGoods);
logo.addEventListener('click', openStartPage);


