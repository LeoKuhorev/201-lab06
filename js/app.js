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
var thEl;
var tdEl;

// hours of operation
var operationHoursArr = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

// adjustments for foot traffic based on research
var correctionArr = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

//arrays with hourly totals of cookies sold and tossers needed
var totalCookiesPerHourArr = [];
var totalTossersPerHourArr = [];

//array with store objects
var storesArr = [];

//totals for location
var dailyLocationCookiesTotal;
var dailyLocationTossersTotal;

//FUNCTIONS
//function that generates a random number between two numbers (including min and max values)
function generateRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function that count avg array value
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

//function for rendering <th> element
function renderTh(textContent, parentElement){
  thEl = document.createElement('th');
  thEl.textContent = textContent;
  parentElement.appendChild(thEl);
}

//function for rendering <td> element
function renderTd(textContent, parentElement) {
  tdEl = document.createElement('td');
  tdEl.textContent = textContent;
  parentElement.appendChild(tdEl);
}

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
  this.randomCustomers = function () {
    for (var i = 0; i < operationHoursArr.length; i++){
      var randomCustomersPerHour = generateRandom(this.minCustomers, this.maxCustomers) * correctionArr[i];
      this.customersPerHourArr.push(randomCustomersPerHour);
      var tossersPerHour = Math.ceil(randomCustomersPerHour/20);
      if (tossersPerHour < 2) {
        this.tossersPerHourArr.push(2);
      } else {
        this.tossersPerHourArr.push(tossersPerHour);
      }
    }
    this.maxTossers = Math.max.apply(null, this.tossersPerHourArr);
  };
  this.randomCookies = function() {
    this.randomCustomers();
    for (var i = 0; i < operationHoursArr.length; i++){
      var cookiesSold = Math.floor(this.customersPerHourArr[i] * this.avgCookiesPerCustomer);
      this.cookiesSoldPerHourArr.push(cookiesSold);
      this.totalPerLocation += cookiesSold;
    }
  };
  this.renderSales = function() {
    this.randomCookies();
    renderTr(salesBodyEl);
    renderTd(this.name, trEl);
    for (var i = 0; i < operationHoursArr.length; i++) {
      if (this.cookiesSoldPerHourArr[i] > avg(this.cookiesSoldPerHourArr)) {
        renderTd(this.cookiesSoldPerHourArr[i], trEl);
        tdEl.className = 'red';
      } else {
        renderTd(this.cookiesSoldPerHourArr[i], trEl);
      }
    }
    renderTd(this.totalPerLocation, trEl);
  };
  this.renderTossers = function() {
    renderTr(staffBodyEl);
    renderTd(this.name, trEl);
    for (var i = 0; i < operationHoursArr.length; i++) {
      if (this.tossersPerHourArr[i] > avg(this.tossersPerHourArr)) {
        renderTd(this.tossersPerHourArr[i], trEl);
        tdEl.className = 'red';
      } else {
        renderTd(this.tossersPerHourArr[i], trEl);
      }
    }
    if (this.maxTossers > avg(this.tossersPerHourArr)) {
      renderTd(this.maxTossers, trEl);
      tdEl.className = 'red';
    } else {
      renderTd(this.maxTossers, trEl);
    }
  };
  storesArr.push(this);
}

//function for rendering table header row
function renderHeader(totalRowName, parentElement) {
  renderTr(parentElement);
  renderTh('LOCATON / TIME', trEl);
  for (var i = 0; i < operationHoursArr.length; i++) {
    renderTh(operationHoursArr[i], trEl);
  }
  renderTh(totalRowName, trEl);
}

//function for getting hourly total
function hourlyTotal() {
  console.log('hourlyTotal function runs');
  for (var i = 0; i < operationHoursArr.length; i++) {
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
  console.log('total cookies per hour', totalCookiesPerHour);
  console.log('total cookies per hour array', totalCookiesPerHourArr);
}

//function for rendering footer (hourly total) row
function renderFooter(hourlyValueArr, dailyValue, parentElement) {
  renderTr(parentElement);
  renderTd('TOTALS', trEl);
  for (var i = 0; i < operationHoursArr.length; i++) {
    if (hourlyValueArr[i] > avg(hourlyValueArr)) {
      renderTd(hourlyValueArr[i], trEl);
      tdEl.className = 'red';
    } else {
      renderTd(hourlyValueArr[i], trEl);
    }
  }
  renderTd(dailyValue, trEl);
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

//function for rendering staffing table
function renderStaffTable() {
  renderHeader('DAILY LOCATION MAX', staffHeadEl);
  for (var i = 0; i < storesArr.length; i++) {
    storesArr[i].renderTossers();
  }
  hourlyTotal();
  renderFooter(totalTossersPerHourArr, dailyLocationTossersTotal, staffFooterEl);
}

function addNewStore(e) {
  e.preventDefault();

  var storeName = e.target.storename.value;
  var minCustomers = parseInt(e.target.mincustomers.value);
  var maxCustomemrs = parseInt(e.target.maxcustomemrs.value);
  var cookiesPerCustomer = parseInt(e.target.cookiespercustomer.value);

  if (storeName !== '' && !isNaN(minCustomers) && !isNaN(maxCustomemrs) && !isNaN(cookiesPerCustomer) ) {
    new Store(storeName, minCustomers, maxCustomemrs, cookiesPerCustomer);
    salesFooterEl.innerHTML = '';
    for (var i = storesArr.length-1; i < storesArr.length; i++) {
      storesArr[i].renderSales();
    }
    hourlyTotal();
    renderFooter(totalCookiesPerHourArr, dailyLocationCookiesTotal, salesFooterEl);
    e.target.storename.value = '';
    e.target.mincustomers.value = '';
    e.target.maxcustomemrs.value = '';
    e.target.cookiespercustomer.value = '';
  }
}


//creating stores using Store constructor function
new Store ('1st and Pike', 23, 65, 6.3);
new Store ('SeaTac Airport', 3, 24, 1.2);
new Store ('Seattle Center', 11, 38, 3.7);
new Store ('Capitol Hill', 20, 38, 2.3);
new Store ('Alki', 2, 16, 4.6);

//EVENT LISTENERS
newStoreEl.addEventListener('submit', addNewStore);

//RENDERING
renderSalesTable();
renderStaffTable();
