const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const closeBasket = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
closeBasket.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


// day 1 authorization
// console.dir();
//console.log();

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");

let login = localStorage.getItem('login_Delivery');


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


/*   function checkLogin(event) {

     if (loginInput.value.length > 0) {
      event.preventDefault(); // отключение перезагрузки страницы после отправки формы

      logIn();
    } else {
      event.preventDefault(); // отключение перезагрузки страницы после отправки формы
      alert('Введите логин и пароль!');

    } 
  } */

  function logIn(event) {
    event.preventDefault(); // отключение перезагрузки страницы после отправки формы

    login = loginInput.value;
    localStorage.setItem('login_Delivery', login);

    toggleModalAuth();
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset(); // очистить поле логин
    checkAuth();
  }



  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();
