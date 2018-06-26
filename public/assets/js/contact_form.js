$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("#name"); 
  var emailInput = $("input#email"); 
  var phoneInput = $("#phone");
  var messageInput = $("#message");  


  // When the signup button is clicked, we validate the email and password are not blank
  $("#sendMessageButton").on("click", function(event) {
    event.preventDefault();
    var contactInput = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      phone: phoneInput.val().trim(),
      message: messageInput.val().trim()
    };

    console.log("contact_form line 20 contactInput object", contactInput);
    
    // If we have an email and password, run the signUpUser function
    addContact(contactInput);

    
    nameInput.val("");
    emailInput.val("");
    phoneInput.val("");
    messageInput.val("");
    
  });

  // Does a post to the contact gnup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function addContact(contactInput) {
    $.post("/api/contact", contactInput)
    .then(function(data) {

      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch("thanks for contacting us");
  }

});