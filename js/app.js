'use  strict';

//DECLARING GLOBAL VARIABLES
var salesEl = document.getElementById('sales');

//FUNCTIONS
//function that generates a random number between two numbers (including min and max values)
function generateRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//store object constructor function
function Store(name, minCustomers, maxCustomers, avgCookiePerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiePerCustomer = avgCookiePerCustomer;
  this.customersPerHourArr = [];
  this.cookiesSoldPerHourArr = [];
  this.total = 0;
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
      this.total += cookiesSold;
    }
  };
  this.randomCookies();
  storesArr.push(this);
}

//STORES INFORMATION
// hours of operation
var operationHoursArr = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// adjustments for foot traffic based on research
var correctionArr = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

//array with hourly total of cookies sold
var totalHrArr = [];

//array with store objects
var storesArr = [];


//creating stores using Store constructor function
new Store ('1st and Pike', 23, 65, 6.3);
new Store ('SeaTac Airport', 3, 24, 1.2);
new Store ('Seattle Center', 11, 38, 3.7);
new Store ('Capitol Hill', 20, 38, 2.3);
new Store ('Alki', 2, 16, 4.6);

//getting hourly total
for (var i = 0; i < operationHoursArr.length; i++) {
  var totalHr = 0;
  for (var k = 0; k < storesArr.length; k++) {
    totalHr += storesArr[k].cookiesSoldPerHourArr[i];
  }
  totalHrArr.push(totalHr);
}
console.log(totalHrArr);

//RENDERING
//generating list of sold cookies for each location
for (k = 0; k < storesArr.length; k++) {
  var ulEl = document.createElement('ul');
  ulEl.id = storesArr[k].name;
  ulEl.textContent = storesArr[k].name;
  salesEl.appendChild(ulEl);
  ulEl = document.getElementById(storesArr[k].name);
  // console.log(storesArr[k].name + ': \n');
  for (i = 0; i < operationHoursArr.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${operationHoursArr[i]}: ${storesArr[k].cookiesSoldPerHourArr[i]} cookies`;
    ulEl.appendChild(liEl);
    // console.log(operationHoursArr[i] + ': ' + storesArr[k].cookiesSoldPerHourArr[i] + ' cookies');
  }
  liEl = document.createElement('li');
  liEl.id = 'total';
  liEl.textContent = `Total: ${storesArr[k].total} cookies`;
  ulEl.appendChild(liEl);
}
