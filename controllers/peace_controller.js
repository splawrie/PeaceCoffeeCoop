//----------------------------------------------------------//
//                                                          //
//          USE THIS CONTROLLER FOR ALL HTML ROUTES          //
//                                                          //
//----------------------------------------------------------//

//define dependencies

var passport = require("../config/passport");
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", function(req, res) {
    // // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    //define object to render to view handlebars

    var hbsObject = req.user;

    //render the object to index.handlebars
    res.render("members", hbsObject);

    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    // req.logout();
    req.session.destroy(function(err) {
    res.redirect("/");
    }); 
  });

  app.get("/payments", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/payments.html"));
  });

  // app.get("/inventory", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/inventory.html"));
  // });

  // app.get("/signup", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  // app.get("*", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/homepage.html"));
  // });
};
