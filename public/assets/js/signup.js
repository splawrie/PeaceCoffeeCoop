$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var companyInput = $("#company");
  var lastNameInput = $("#lname");
  var firstNameInput = $("#fname");
  var phoneInput = $("#bphone");
  var faxInput = $("#fax");
  var addressInput = $("#address");
  var cityInput = $("#city");
  var stateInput = $("#state");
  var zipInput = $("#zip");
  var userTypeInput = $("#user_type");
  

  // When the signup button is clicked, we validate the email and password are not blank
  $("#signup-button").on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      company: companyInput.val().trim(),
      last_name: lastNameInput.val().trim(),
      first_name: firstNameInput.val().trim(),
      business_phone: phoneInput.val().trim(),
      fax_number: faxInput.val().trim(),
      address: addressInput.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val(),
      zip: zipInput.val().trim(),
      user_type: userTypeInput.val()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    companyInput.val(""),
    lastNameInput.val(""),
    firstNameInput.val(""),
    phoneInput.val(""),
    faxInput.val(""),
    addressInput.val(""),
    cityInput.val(""),
    stateInput.val(""),
    zipInput.val("")
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", userData)
    .then(function(data) {

      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
