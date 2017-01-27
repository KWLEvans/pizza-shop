/////////////////////////////////////////////
//Back-end
/////////////////////////////////////////////

var prices = {
  small: 6,
  medium: 10,
  large: 14,
  pizzilla: 32,
}

function Pizza(size, toppingsArray) {
  this.size = size;
  this.toppings = toppingsArray;
}

Pizza.prototype.price = function() {
  var price = prices[this.size];
  this.toppings.forEach(function(topping) {
    price += topping.cost;
  });
  return price;
}

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping);
}

function Topping(name, type, cost) {
  this.name = name;
  this.type = type;
  this.cost = cost;
}

Topping.prototype.priceLookup = function() {
  var price = prices[this.type];
  return price;
}

var Store = {
  toppingsAvailable: [],

  open: function() {
    console.log("store open")
    this.toppingsAvailable.push (
      new Topping("pepperoni", "meat", 2),
      new Topping("sausage", "meat", 2),
      new Topping("bacon", "meat", 3),
      new Topping("chicken", "meat", 3),
      new Topping("tempeh", "meat", 4),
      new Topping("onion", "veggie", 2),
      new Topping("green peppers", "veggie", 2),
      new Topping("olives", "veggie", 2),
      new Topping("tomato", "veggie", 2),
      new Topping("pineapple", "veggie", 2)
    );
    console.log(this.toppingsAvailable);
    populateOptions(this.toppingsAvailable);
  },

  findTopping: function(toppingToFind) {
    console.log("finding topping " + toppingToFind);
    var desiredTopping;
    this.toppingsAvailable.forEach(function(topping) {
      if (toppingToFind === topping.name) {
        desiredTopping = topping;
        console.log(desiredTopping);
      }
    });
    return desiredTopping;
  }
}

function populateOptions(toppingsAvailable) {
  toppingsAvailable.forEach(function(topping) {
    $("#" + topping.type).append(
      "<label class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input' value='" + topping.name + "'><span class='custom-control-indicator'></span><span class='custom-control-description'>" + capitalize(topping.name) + "</span></label>"
    );
  });
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function stringifyToppingsArray(toppingsArray) {
  var toppingsString = "";
  for (i = 0; i < toppingsArray.length; i++) {
    if (i === 0) {
      toppingsString += toppingsArray[i].name;
    } else if (i === toppingsArray.length - 1) {
      toppingsString += ", and " + toppingsArray[i].name;
    } else {
      toppingsString += ", " + toppingsArray[i].name;
    }
  }
  return toppingsString;
}

/////////////////////////////////////////////
//Front-end
/////////////////////////////////////////////

$(function() {
  Store.open();


  $("#order-form").submit(function(event) {
    event.preventDefault();

    var pizzaSize = $("#sizes input[type=radio]:checked").val();
    var toppings = $("#toppings input[type=checkbox]:checked").map(function() {
      return Store.findTopping($(this).val());
    }).get();
    console.log(toppings);

    var newPizza = new Pizza(pizzaSize, toppings);
    console.log(newPizza);

    $("#order-display").text("Yous gotta " + newPizza.size + " pizza with " + stringifyToppingsArray(newPizza.toppings) + "! And it'll cost you $" + newPizza.price() + ".");
  });
});
