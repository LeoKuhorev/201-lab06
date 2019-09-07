'use  strict';

//GLOBAL VARIABLES
//DOM elements
var salesHeadEl = document.getElementById('sales-head');
var salesBodyEl = document.getElementById('sales-body');
var salesFooterEl = document.getElementById('sales-foot');
var staffHeadEl = document.getElementById('staff-head');
var staffBodyEl = document.getElementById('staff-body');
var staffFooterEl = document.getElementById('staff-foot');
var newStoreEl = document.getElementById('new-store');
var trEl;
var element;

//hours of operation
var OPERATION_HOURS_ARR = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

//control curve array showing adjustments for customers per hour
var CONTROL_CURVE_ARR = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

//how many customers 1 tosser can serve
var CUSTOMERS_PER_TOSSER = 10;

//array with store objects
var storesArr = [];

//arrays with hourly totals of cookies sold, tossers needed, and dynamically assigned values of daily total/ tossers max
var totalCookiesPerHourArr = [];
var totalTossersPerHourArr = [];
var totalArr = [];

//totals for location
var dailyLocationCookiesTotal, dailyLocationTossersTotal;

//FUNCTIONS
//store object constructor function
function Store(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.customersPerHourArr = [];
  this.tossersPerHourArr = [];
  this.cookiesSoldPerHourArr = [];
  this.totalPerLocation = 0;
  this.maxTossers = 0;

  storesArr.push(this);
}

//object prototype for generating random number of customers between min and max, and counting how many tossers needed to serve them
Store.prototype.randomCustomers = function () {
  this.tossersPerHourArr.length = 0;
  for (var i = 0; i < OPERATION_HOURS_ARR.length; i++){
    this.customersPerHourArr[i] = generateRandom(this.minCustomers, this.maxCustomers) * CONTROL_CURVE_ARR[i];
    var tossersPerHour = Math.ceil( this.customersPerHourArr[i]/CUSTOMERS_PER_TOSSER);
    if (tossersPerHour < 2) {
      this.tossersPerHourArr.push(2);
    } else {
      this.tossersPerHourArr.push(tossersPerHour);
    }
  }
  this.maxTossers = Math.max.apply(null, this.tossersPerHourArr);
};

//object prototype for generating number of cookies sold
Store.prototype.randomCookies = function() {
  this.randomCustomers();
  for (var i = 0; i < OPERATION_HOURS_ARR.length; i++){
    this.cookiesSoldPerHourArr[i] = Math.ceil(this.customersPerHourArr[i] * this.avgCookiesPerCustomer);
    this.totalPerLocation += this.cookiesSoldPerHourArr[i];
  }
};

//object prototype for rendering sales table
Store.prototype.renderSales = function() {
  this.randomCookies();
  renderTr(salesBodyEl);
  renderEl('td', this.name);
  element.className = 'grey';
  for (var i = 0; i < OPERATION_HOURS_ARR.length; i++) {
    colorHighlightAvg(this.cookiesSoldPerHourArr[i], this.cookiesSoldPerHourArr);
  }
  for (i = 0; i < storesArr.length; i++){
    totalArr[i] = storesArr[i].totalPerLocation;
  }
  colorHighlightAvg(this.totalPerLocation, totalArr);
};

//object prototype for rendering tossers table
Store.prototype.renderTossers = function() {
  renderTr(staffBodyEl);
  renderEl('td', this.name);
  element.className = 'grey';
  for (var i = 0; i < OPERATION_HOURS_ARR.length; i++) {
    colorHighlightAvg(this.tossersPerHourArr[i], this.tossersPerHourArr);
  }
  for (i = 0; i < storesArr.length; i++){
    totalArr[i] = storesArr[i].maxTossers;
  }
  colorHighlightAvg(this.maxTossers, totalArr);
};

//function that generates a random number between two numbers (including min and max values)
function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function that counts avg array value
function avg(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return(sum / array.length);
}

//function for rendering <tr> element
function renderTr(parentElement) {
  trEl = document.createElement('tr');
  parentElement.appendChild(trEl);
}

//function for rendering table elements
function renderEl(elementType, textContent){
  element = document.createElement(elementType);
  element.textContent = textContent;
  trEl.appendChild(element);
}

//function for adding className depending on value to avg ratio
function colorHighlightAvg(currentValue, arrayOfValues) {
  if (currentValue > 1.2 * avg(arrayOfValues)) {
    renderEl('td', currentValue);
    element.className = 'red';
  } else if (currentValue < 0.8 * avg(arrayOfValues)){
    renderEl('td', currentValue);
    element.className = 'green';
  } else {
    renderEl('td', currentValue);
    element.className = 'yellow';
  }
}

//function for rendering table header row
function renderHeader(totalRowName, parentElement) {
  renderTr(parentElement);
  renderEl('th', 'LOCATON / TIME');
  for (var i = 0; i < OPERATION_HOURS_ARR.length; i++) {
    renderEl('th', OPERATION_HOURS_ARR[i]);
  }
  renderEl('th', totalRowName);
}

//function for getting hourly total
function hourlyTotal() {
  for (var i = 0; i < OPERATION_HOURS_ARR.length; i++) {
    var totalCookiesPerHour = 0;
    var totalTossersPerHour = 0;
    dailyLocationCookiesTotal = 0;
    dailyLocationTossersTotal = 0;
    for (var k = 0; k < storesArr.length; k++) {
      totalCookiesPerHour += storesArr[k].cookiesSoldPerHourArr[i];
      totalTossersPerHour += storesArr[k].tossersPerHourArr[i];
      dailyLocationCookiesTotal += storesArr[k].totalPerLocation;
      dailyLocationTossersTotal += storesArr[k].maxTossers;
    }
    totalCookiesPerHourArr[i] = totalCookiesPerHour;
    totalTossersPerHourArr[i] = totalTossersPerHour;
  }
}

//function for rendering footer (hourly total) row
function renderFooter(hourlyValueArr, dailyValue, parentElement) {
  renderTr(parentElement);
  renderEl('td', 'TOTALS');
  element.className = 'grey';
  for (var i = 0; i < OPERATION_HOURS_ARR.length; i++) {
    colorHighlightAvg(hourlyValueArr[i], hourlyValueArr);
  }
  renderEl('td', dailyValue);
  element.className = 'grey';
}

//function for rendering the entire sales table
function renderSalesTable() {
  renderHeader('DAILY LOCATION TOTAL', salesHeadEl);
  for (var i = 0; i < storesArr.length; i++) {
    storesArr[i].renderSales();
  }
  hourlyTotal();
  renderFooter(totalCookiesPerHourArr, dailyLocationCookiesTotal, salesFooterEl);
}

//function for rendering the entire staffing table
function renderStaffTable() {
  renderHeader('DAILY LOCATION MAX', staffHeadEl);
  for (var i = 0; i < storesArr.length; i++) {
    storesArr[i].renderTossers();
  }
  hourlyTotal();
  renderFooter(totalTossersPerHourArr, dailyLocationTossersTotal, staffFooterEl);
}

//function for resetting values of the input form elements and resetting their class to 'white'
function reset(element) {
  element.value = '';
  element.className = 'white';
}

//function for adding new stores
function addNewStore(e) {
  e.preventDefault();

  var storeName = e.target.storename.value;
  var minCustomers = parseInt(e.target.mincustomers.value);
  var maxCustomemrs = parseInt(e.target.maxcustomemrs.value);
  var cookiesPerCustomer = parseFloat(e.target.cookiespercustomer.value);
  var storeNotFound = true;

  //if store already exist in storesArr - update its values
  for (var i = 0; i < storesArr.length; i++) {
    if (storeName === storesArr[i].name) {
      storeNotFound = false;
      storesArr[i].name = storeName;
      storesArr[i].minCustomers = minCustomers;
      storesArr[i].maxCustomers = maxCustomemrs;
      storesArr[i].avgCookiesPerCustomer = cookiesPerCustomer;
    }
  }
  if (storeNotFound) {
    new Store(storeName, minCustomers, maxCustomemrs, cookiesPerCustomer);
  }

  //clearing table bodies and footers from both tables
  while(salesBodyEl.firstChild) {
    salesBodyEl.removeChild(salesBodyEl.firstChild);
  }
  while(staffBodyEl.firstChild) {
    staffBodyEl.removeChild(staffBodyEl.firstChild);
  }
  salesFooterEl.removeChild(salesFooterEl.firstChild);
  staffFooterEl.removeChild(staffFooterEl.firstChild);

  //render the tables
  for (i = 0; i < storesArr.length; i++) {
    storesArr[i].renderSales();
    storesArr[i].renderTossers();
  }

  //recalculate totals and append new footers for both tables
  hourlyTotal();
  renderFooter(totalCookiesPerHourArr, dailyLocationCookiesTotal, salesFooterEl);
  renderFooter(totalTossersPerHourArr, dailyLocationTossersTotal, staffFooterEl);

  //clear input forms and reset their class to 'white'
  reset(e.target.storename);
  reset(e.target.mincustomers);
  reset(e.target.maxcustomemrs);
  reset(e.target.cookiespercustomer);
}

//founction for pulling current store info when clicked on the table
function changeValue(e) {
  var currentName = e.target.parentElement.firstChild.textContent;
  for (var i = 0; i < storesArr.length; i++) {
    if (storesArr[i].name === currentName) {
      newStoreEl.elements.item(1).value = currentName;
      newStoreEl.elements.item(2).value = storesArr[i].minCustomers;
      newStoreEl.elements.item(3).value = storesArr[i].maxCustomers;
      newStoreEl.elements.item(4).value = storesArr[i].avgCookiesPerCustomer;
    }
  }
}

//function for changing input form color to red if user didn't enter anything and switched to the next one
function changeClassRed(e) {
  if(e.target.value === '') {
    e.target.className = 'red';
  } else {
    e.target.className = 'white';
  }
}

//creating stores using Store constructor function
new Store ('1st and Pike', 23, 65, 6.3);
new Store ('SeaTac Airport', 3, 24, 1.2);
new Store ('Seattle Center', 11, 38, 3.7);
new Store ('Capitol Hill', 20, 38, 2.3);
new Store ('Alki', 2, 16, 4.6);

//RENDERING
renderSalesTable();
renderStaffTable();

//EVENT LISTENERS
newStoreEl.addEventListener('submit', addNewStore);
newStoreEl.addEventListener('focusout', changeClassRed);
salesBodyEl.addEventListener('click', changeValue);
