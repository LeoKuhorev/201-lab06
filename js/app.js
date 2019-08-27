'use  strict';

//GLOBAL VARIABLES
var salesEl = document.getElementById('sales');
var dailyLocationsTotal;
var trEl;
var thEl;
var tdEl;

//FUNCTIONS
//function that generates a random number between two numbers (including min and max values)
function generateRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function to render <tr> element
function renderTr(parentElement) {
  trEl = document.createElement('tr');
  parentElement.appendChild(trEl);
}

//function to render <th> element
function renderTh(textContent, parentElement){
  thEl = document.createElement('th');
  thEl.textContent = textContent;
  parentElement.appendChild(thEl);
}

//function to render <td> element
function renderTd(textContent, parentElement) {
  tdEl = document.createElement('td');
  tdEl.textContent = textContent;
  parentElement.appendChild(tdEl);
}

//store object constructor function
function Store(name, minCustomers, maxCustomers, avgCookiePerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiePerCustomer = avgCookiePerCustomer;
  this.customersPerHourArr = [];
  this.cookiesSoldPerHourArr = [];
  this.totalPerLocation = 0;
  this.randomCustomers = function () {
    for (var i = 0; i < operationHoursArr.length; i++){
      var random = generateRandom(this.minCustomers, this.maxCustomers) * correctionArr[i];
      this.customersPerHourArr.push(random);
    }
  };
  this.randomCookies = function() {
    this.randomCustomers();
    for (var i = 0; i < operationHoursArr.length; i++){
      var cookiesSold = Math.floor(this.customersPerHourArr[i] * this.avgCookiePerCustomer);
      this.cookiesSoldPerHourArr.push(cookiesSold);
      this.totalPerLocation += cookiesSold;
    }
  };
  this.render = function() {
    this.randomCookies();
    renderTr(salesEl);
    renderTd(this.name, trEl);
    for (var i = 0; i < operationHoursArr.length; i++) {
      renderTd(this.cookiesSoldPerHourArr[i], trEl);
    }
    renderTd(this.totalPerLocation, trEl);
  };
  storesArr.push(this);
}

//function to render table header row
function renderHeader() {
  renderTr(salesEl);
  renderTh('LOCATON', trEl);
  for (var i = 0; i < operationHoursArr.length; i++) {
    renderTh(operationHoursArr[i], trEl);
  }
  renderTh('DAILY LOCATION TOTAL', trEl);
}

//founction for getting hourly total
function hourlyTotal() {
  for (var i = 0; i < operationHoursArr.length; i++) {
    var totalPerHour = 0;
    dailyLocationsTotal = 0;
    for (var k = 0; k < storesArr.length; k++) {
      totalPerHour += storesArr[k].cookiesSoldPerHourArr[i];
      dailyLocationsTotal += storesArr[k].totalPerLocation;
    }
    totalPerHourArr.push(totalPerHour);
  }
}

//function to render footer (hourly total) row
function renderFooter() {
  hourlyTotal();
  renderTr(salesEl);
  renderTd('TOTALS', trEl);
  for (var i = 0; i < operationHoursArr.length; i++) {
    renderTd(totalPerHourArr[i], trEl);
  }
  renderTd(dailyLocationsTotal, trEl);
}

//function to render the entire sales table
function renderSalesTable() {
  renderHeader();
  for (var i = 0; i < storesArr.length; i++) {
    storesArr[i].render();
  }
  renderFooter();
}

//STORES INFORMATION
// hours of operation
var operationHoursArr = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

// adjustments for foot traffic based on research
var correctionArr = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

//array with hourly total of cookies sold
var totalPerHourArr = [];

//array with store objects
var storesArr = [];

//creating stores using Store constructor function
new Store ('1st and Pike', 23, 65, 6.3);
new Store ('SeaTac Airport', 3, 24, 1.2);
new Store ('Seattle Center', 11, 38, 3.7);
new Store ('Capitol Hill', 20, 38, 2.3);
new Store ('Alki', 2, 16, 4.6);

//RENDERING
renderSalesTable();
