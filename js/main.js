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

let login = localStorage.getItem('login_Delivery');

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
	 localStorage.removeItem('login_Delivery');
	 buttonAuth.style.display = '';
	 userName.style.display = '';
	 buttonOut.style.display = '';
	 buttonOut.removeEventListener('click', logOut);    
	 checkAuth();
	 openStartPage();
  }

  console.log("authorized");

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
  
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
	//cardRestaurant.addEventListener('click', toggleModalAuth);

}

function checkAuth() {
  if (login) {
	 authorized();
  } else {
	 notAuthorized();
  }
}

function init() { 
	cartButton.addEventListener("click", toggleModal);
	closeBasket.addEventListener("click", toggleModal);
	checkAuth();


	// подключение слайдера
	new Swiper('.swiper-container', {
		loop: true,
		autoplay: true
	});
}

 init();