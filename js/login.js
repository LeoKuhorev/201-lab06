'use strict';
var loginButtonEl = document.getElementById('submit');
var loginFormEl = document.getElementById('login-form');
var loginSalesEl = document.getElementById('login');
var showMessage = true;

function showSales () {
  var userNameEl = document.getElementById('username');
  var passwordEl = document.getElementById('password');
  if (userNameEl.value.toLowerCase() === 'pat' && passwordEl.value === 'Salmon') {
    loginSalesEl.href = 'sales.html';
    loginSalesEl.innerHTML = '<li>SALES</li>';
    loginFormEl.innerHTML = '<p id="welcome">Welcome Pat! Sales page is available now<p>';
    showMessage = false;
  } else {
    alert('incorrect name/password!');
    console.log(`username is: ${userNameEl.value} password is: ${passwordEl.value}`);

  }
}

function showMessageFunction() {
  if(showMessage) {
    alert('Please login to see this page');
  }
}
loginButtonEl.addEventListener('click', showSales);
loginSalesEl.addEventListener('click', showMessageFunction);
