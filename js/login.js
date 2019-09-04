'use strict';
var loginButtonEl = document.getElementById('submit');
var loginFormEl = document.getElementById('login-form');
var loginSalesEl = document.getElementById('login');
var showMessage = true;

function showSales () {
  var userNameEl = document.getElementById('username');
  var passwordEl = document.getElementById('password');
  if (userNameEl.value.toLowerCase() === 'pat') {
    if (passwordEl.value === 'Salmon') {
      loginSalesEl.href = 'sales.html';
      loginFormEl.innerHTML = '<p id="welcome">Welcome Pat! Sales page is available now<p>';
      showMessage = false;
    } else {
      alert('incorrect password!');
    }
  } else {
    alert(`there's no no registred user with name ${userNameEl.value}`);
  }
}

function showMessageFunction() {
  if(showMessage) {
    alert('Please login to see this page');
  }
}
loginButtonEl.addEventListener('click', showSales);
loginSalesEl.addEventListener('click', showMessageFunction);
