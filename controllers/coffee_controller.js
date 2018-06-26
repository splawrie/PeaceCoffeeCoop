//----------------------------------------------------------//
//                                                          //
//          USE THIS CONTROLLER FOR ALL API ROUTES          //
//                                                          //
//----------------------------------------------------------//
//define dependencies
var passport = require("../config/passport");
var path = require("path");

var db = require("../models");

//Getting current date:
var moment = require("moment");
var currentDate = moment().format("YYYY-MM-DD");
var nextYear = moment()
  .add(1, "years")
  .format("YYYY-MM-DD");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      company: req.body.company,
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      business_phone: req.body.business_phone,
      fax_number: req.body.fax_number,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      membership_start_date: currentDate,
      membership_paid_date: currentDate,
      membership_renewal_date: nextYear,
      membership_end_date: nextYear,
      user_type: req.body.user_type
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //route for getting product data specific to the user and rendering data to 
  //handlebars order product page
  app.get("/api/products/:id", function(req, res) {
    var id = req.params.id;

    db.products
      .findAll({
        include: [db.User],
        where: [
          {
            userId: id
          }
        ]
      })
      .then(function(productdata) {
        //define object to render to view handlebars
        var hbsObject = {
          products: productdata
        };

        //render the object to orderProduct.handlebars
        res.render("orderProduct", hbsObject);
      });
  });

  //route for getting order data specific to the user and rendering data to 
  //handlebars payments page
  app.get("/api/payments/:id", function(req, res) {
    var id = req.params.id;

    db.order_summary.findAll({ include: [db.User, db.products], where: [{ userId: id }] }).then(function(orderData) {
      //define object to render to view handlebars
      var hbsObject = { order: orderData };

      //render the object to index.handlebars
      res.render("payments.handlebars", hbsObject);
    });
  });

  //route for rendering  user id to handlebars add product page
  app.get("/api/addProduct/:id", function(req, res) {
    var id = req.params.id;

    //define object to render to view handlebars
    var hbsObject = { id: id };

    //render the object to index.handlebars
    res.render("addProduct.handlebars", hbsObject);
  });

  //route for posting order data to the order_summary table
  //If successful, user is redirected to the members page
  app.post("/api/products/:id", function(req, res) {
    var id = req.params.id;
    
    db.order_summary.create({
      product_name: req.body.product_name,
      pounds: req.body.pounds,
      price_per_pount: req.body.price_per_pound,
      scheduled_reorder_date: req.body.scheduled_reorder_date,
      UserId: id
    })
      .then(function() {
        res.redirect("../../members");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  //route for posting new product data to the products table
  app.post("/api/addProduct", function(req, res) {

    UserId = req.body.UserId
    db.products.create({
      product_name: req.body.product_name,
      pounds: req.body.pounds,
      price_per_pound: req.body.price_per_pound,
      scheduled_reorder_date: nextYear,
      UserId: UserId
    })
      .then(function() {
        res.redirect("../../members");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  app.post("/api/order", function(req, res) {

    var UserId = req.body.UserId;

    var productData = req.body.productData;

    for (i = 0; i < productData.length; i++) {

      var pounds = productData[i].pounds;
      var productId = productData[i].productId;
      var price = productData[i].price;
      var total_price = parseFloat((parseFloat(price) * parseInt(pounds)).toFixed(2));
      var tax = parseFloat((total_price * 0.07).toFixed(2));
      var coop_fee = parseFloat((total_price * 0.01).toFixed(2));
      var sales_total = (total_price + tax + coop_fee).toFixed(2);

      db.order_summary
        .create({
          pounds: pounds,
          price: price,
          coop_fee: coop_fee,
          tax: tax,
          sales_total: sales_total,
          productId: productId,
          UserId: UserId
        })
        .then(function() {})
        .catch(function(err) {
          console.log(err);
          res.json(err);
          // res.status(422).json(err.errors[0].message);
        });
    }
    res.redirect("../../members");
  });

  app.post("/api/member", function(req, res) {
    db.members
      .create({
        user_id: req.user_id,
        company: req.company,
        last_name: req.last_name,
        first_name: req.first_name,
        business_phone: req.business_phone,
        fax_number: req.fax_number,
        address: req.address,
        city: req.city,
        state: req.state,
        zip: req.zip
      })
      .then(function(member) {
        res.json(member);
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  app.post("/api/contact", function(req, res) {

    db.contacts
      .create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
      })
      .then(function() {

      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  app.post("/api/customer", function(req, res) {});

  app.put("/api/member/:id", function(req, res) {});

  app.delete("api/member/:id", function(req, res) {});
};
