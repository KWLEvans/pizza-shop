/////////////////////////////////////////////
//Back-end
/////////////////////////////////////////////

var prices = {
  small: 6,
  medium: 10,
  large: 14,
  pizzilla: 32
}

function Pizza(size) {
  this.size = size;
}

Pizza.prototype.price = function() {
  var price = prices[this.size];
  return price;
}




/////////////////////////////////////////////
//Front-end
/////////////////////////////////////////////

$(function() {
  $("#order-form").submit(function(event) {
    event.preventDefault();

    var pizzaSize = $("#sizes input:checked").val();
    var newPizza = new Pizza(pizzaSize);

    $("#order-display").text("Yous gotta " + newPizza.size + " pizza! And it'll cost you $" + newPizza.price() + ".");
  });
});
