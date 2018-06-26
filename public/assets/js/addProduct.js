$(document).ready(function() {
  // Getting references to our form and input
  var addProductForm = $("form.addProduct");
  var productNameInput = $("#pname");
  var poundsInput = $("#pounds");
  var priceInput = $("#pppound");
  var UserId = $("form").attr("data-id");
  

  // When the add product button is clicked,
  $("#addProduct-button").on("click", function(event) {
    event.preventDefault();

    //create product data object from form input fields
    var productData = {
      UserId: UserId,
      product_name: productNameInput.val().trim(),
      pounds: poundsInput.val().trim(),
      price_per_pound: priceInput.val().trim()
    };

    //ensure there are no blank input fields
    if (!productData.product_name || !productData.pounds || !productData.price_per_pound) {
      return;
    }
    // call addProduct function with productData object
    addProduct(productData);

    //reset product order input fields
    productNameInput.val("");
    poundsInput.val("");
    priceInput.val("");
  });

  // Does a post to the /api/addProduct route. If successful, user id redirect to members page.
  // Otherwise we log any errors
  function addProduct(productData) {
    $.post("/api/addProduct", productData)
    .then(function(data) {

      window.location.replace("/members");
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
