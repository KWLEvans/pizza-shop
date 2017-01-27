/////////////////////////////////////////////
//Back-end
/////////////////////////////////////////////

//Base prices for each size of pizza
var prices = {
  small: 6,
  medium: 10,
  large: 14,
  pizzilla: 32,
}

//constructor for pizza object which contains the pizza size and array of its toppings objects
function Pizza(size, toppingsArray) {
  this.size = size;
  this.toppings = toppingsArray;
}

//function which allows pizzas to calculate their price
Pizza.prototype.price = function() {
  var price = prices[this.size];
  this.toppings.forEach(function(topping) {
    price += topping.cost;
  });
  return price;
}

//Topping constructor containing topping name, variety (meat or veggie for placing in the DOM), and cost
function Topping(name, type, cost) {
  this.name = name;
  this.type = type;
  this.cost = cost;
}

//Store object which initializes available toppings objects and stores them in an array
var Store = {
  toppingsAvailable: [],

  open: function() {
    console.log("store open")
    this.toppingsAvailable.push (
      new Topping("pepperoni", "meat", 2),
      new Topping("sausage", "meat", 2),
      new Topping("bacon", "meat", 3),
      new Topping("chicken", "meat", 3),
      new Topping("prosciutto crudo", "meat", 5),
      new Topping("tempeh", "meat", 4),
      new Topping("onion", "veggie", 2),
      new Topping("green peppers", "veggie", 2),
      new Topping("olives", "veggie", 2),
      new Topping("tomato", "veggie", 2),
      new Topping("pineapple", "veggie", 2),
      new Topping("nutritional yeast", "veggie", 1)
    );
    console.log(this.toppingsAvailable);
    this.toppingsAvailable.forEach(function(topping) {
      appendNewTopping(topping);
    });
  },

  //Method to find a topping by name within the toppingsAvailable array
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

//Order object which tracks all pizza objects created and allows for calculating total order price
var Order = {
  pizzasArray: [],
  totalPrice: 0,

  updatePizzas: function(pizza) {
    this.pizzasArray.push(pizza);
    this.calculatePrice();
    console.log(this.totalPrice);
    appendPizzaToOrder(pizza);
  },

  findPizza: function(clickedPizza) {
    return this.pizzasArray[clickedPizza - 1];
  },

  calculatePrice: function() {
    this.totalPrice = 0;
    this.pizzasArray.forEach(function(pizza) {
      Order.totalPrice += pizza.price();
    });
  }
}

//Function for appending new toppings to the DOM toppings list
function appendNewTopping(topping) {
  $("#" + topping.type).append(
    "<label class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input' value='" + topping.name + "'><span class='custom-control-indicator'></span><span class='custom-control-description'>" + capitalize(topping.name) + "<em class='text-right'>$" + topping.cost + "</em></span></label>"
  );
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Adding pizza to order div and updating total in order div
function appendPizzaToOrder(pizza) {
  $("#order-display").append(
    "<div class='order-summary'><h5>" + capitalize(pizza.size) + " Pizza<em>$" + prices[pizza.size] + "</em></h5><ul></ul></div>"
  );
  pizza.toppings.forEach(function(topping) {
    $(".order-summary:last-of-type ul").append("<li>" + topping.name + "<em>$" + topping.cost + "</em></li>")
  });
  updateOrderTotal();
}

function updateOrderTotal() {
  $("#order-total").text("$" + Order.totalPrice);
}

function clearFields() {
  $("#order-form input").prop("checked", false);
}

/////////////////////////////////////////////
//Front-end
/////////////////////////////////////////////

$(function() {
  Store.open();


  $("#order-pizza-button").click(function(event) {
    event.preventDefault();

    var pizzaSize = $("#sizes input[type=radio]:checked").val();
    var toppings = $("#toppings input[type=checkbox]:checked").map(function() {
      return Store.findTopping($(this).val());
    }).get();

    var newPizza = new Pizza(pizzaSize, toppings);
    Order.updatePizzas(newPizza);
    clearFields();
  });
});
