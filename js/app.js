'use  strict';

//FUNCTIONS

//function that generates a random number between two numbers (including min and max values)
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//STORING STORES INFORMATION

// hours of operation
var operationHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

//stores information
var stores = [
  {
    name:'1st and Pike',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookiePerCustomer: 6.3,
    randomCustomers: function() {
      return random(this.minCustomers, this.maxCustomers);
    },
    cookiesSoldPerHour: function () {
      var cookiesSold =[];
      for (var i = 0; i < operationHours.length; i++) {
        cookiesSold[i] = Math.floor(this.randomCustomers() * this.avgCookiePerCustomer);
      }
      return cookiesSold;
    }
  },
  {
    name:'SeaTac Airport',
    minCustomers: 3,
    maxCustomers: 24,
    avgCookiePerCustomer: 1.2,
    randomCustomers: function() {
      return random(this.minCustomers, this.maxCustomers);
    },
    cookiesSoldPerHour: function () {
      var cookiesSold =[];
      for (var i = 0; i < operationHours.length; i++) {
        cookiesSold[i] = Math.floor(this.randomCustomers() * this.avgCookiePerCustomer);
      }
      return cookiesSold;
    }
  },
  {
    name:'Seattle Center',
    minCustomers: 11,
    maxCustomers: 38,
    avgCookiePerCustomer: 3.7,
    randomCustomers: function() {
      return random(this.minCustomers, this.maxCustomers);
    },
    cookiesSoldPerHour: function () {
      var cookiesSold =[];
      for (var i = 0; i < operationHours.length; i++) {
        cookiesSold[i] = Math.floor(this.randomCustomers() * this.avgCookiePerCustomer);
      }
      return cookiesSold;
    }
  },
  {
    name:'Capitol Hill',
    minCustomers: 20,
    maxCustomers: 38,
    avgCookiePerCustomer: 2.3,
    randomCustomers: function() {
      return random(this.minCustomers, this.maxCustomers);
    },
    cookiesSoldPerHour: function () {
      var cookiesSold =[];
      for (var i = 0; i < operationHours.length; i++) {
        cookiesSold[i] = Math.floor(this.randomCustomers() * this.avgCookiePerCustomer);
      }
      return cookiesSold;
    }
  },
  {
    name:'Alki',
    minCustomers: 2,
    maxCustomers: 16,
    avgCookiePerCustomer: 4.6,
    randomCustomers: function() {
      return random(this.minCustomers, this.maxCustomers);
    },
    cookiesSoldPerHour: function () {
      var cookiesSold =[];
      for (var i = 0; i < operationHours.length; i++) {
        cookiesSold[i] = Math.floor(this.randomCustomers() * this.avgCookiePerCustomer);
      }
      return cookiesSold;
    }
  }
];


//generating list of sold cookies for each location
for (var k = 0; k < stores.length; k++) {
  console.log(stores[k].name + ': \n');
  for (var i = 0; i < operationHours.length; i++) {
    console.log(operationHours[i] + ': ' + stores[k].cookiesSoldPerHour()[i] + ' cookies');
  }
}
