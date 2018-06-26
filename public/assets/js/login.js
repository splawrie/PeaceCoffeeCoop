$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email");
  var passwordInput = $("input#password");

  // When the form is submitted, we validate there's an email and password entered
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    //USER DATA LOGS OUT CORRECTLY

    //Make sure email and password fields are not empty
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace("/members");
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

});