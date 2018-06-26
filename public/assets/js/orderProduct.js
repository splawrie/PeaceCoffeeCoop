$(function() {

  $("#order-button").on("click", function(event) {

    event.preventDefault();
    
    //get id associated with this member and assign to variable
    var UserId = $(this).data("id");

    //define order data object with UserId
    var orderData = {
      UserId: UserId
    };
  
    //define variables for product ID and Product Order Data
    var productId=[];
    var productOrderData = {};

    //loop through each row in the product table
    $('tr').each(function(product){

      //assign product id to variable
      var id = $(this).attr("data-pid");

      //ensure that id is not and empty string, null, or undefined
      if(id) {
        //push product ID to array
        productId.push(id);
      }
    });

    //loop through each product ID in array
    for(let i=0; i<productId.length; i++) {

      //define reference to product table row
      var ref="#" + i;

      //get product ID and assign to variable
      var pid = $(ref).attr('data-pid');

      //define reference to pound input field
      poundReference = "#p" + pid;
      //get pounds ordered
      var poundOrdered = $(poundReference).val();

      //define reference to price per pound field
      priceReference = "#price" + pid;
      //get price per pound
      var price = $(priceReference).text();

      //reset pound dropdown field
      $(poundReference).val(0);

      //confirm that a selection was made for pounds ordered
      if(poundOrdered != null) {

        //add data as an object to productOrderData object
        productOrderData[i] = {
          productId: pid, 
          price: price,
          pounds: poundOrdered    
        }
      }
    }

      //create productData key in orderData object and assign productOrderData object as value
      orderData.productData = productOrderData;
    
    //call function placeOrder with orderData
    placeOrder(orderData);

  })

  // Does a post to the api/order route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function placeOrder(orderData) {

    $.post("/api/order",orderData)
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
