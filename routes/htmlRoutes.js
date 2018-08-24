var path = require("path");

module.exports = function(app) {
  // Load index page
  // Start hamad
  app.get("/", function(req, res) {
    res.render(path.join(__dirname, "../views/index.handlebars"));
  });

  app.get("/home", function(req, res) {
    res.render(path.join(__dirname, "../views/index.handlebars"));
  });
  //end hamad

  //start Daryll - Route for booking page/form
  app.get("/book", function(req, res) {
    res.render(path.join(__dirname, "../views/forms"));
  });

  app.get("/guests", function(req, res) {
    res.render(path.join(__dirname, "../views/guests"));
  });

  app.get("/bookings", function(req, res) {
    res.render(path.join(__dirname, "../views/bookings"));
  });

  //end Daryll




  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  //-----------------DARYLL-------------------------
  app.get("/*", function(req, res) {
    res.render(path.join(__dirname, "../views/404.handlebars"));
  });
  //-----END of DARYLL---------------------------

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
