var db = require("../models");
module.exports = function(app) {
  // start get
  app.get("/api/guests/", function(req, res) {
    if (req.params.id) {
      db.guest.findById(req.params.id).then(function(guest) {
        res.json(guest);
      });
    } else {
      db.guest.findAll({}).then(function(guest) {
        res.json(guest);
      });
    }
  });
  // end get

  // start post
  app.post("/api/guests", function(req, res) {
    db.guest.create(req.body).then(function(guest) {
      res.json(guest);
    });
  });
  // end post

  // start put
  app.put("/api/guests", function(req, res) {
    db.guest.update({
      text: req.body.text,
      complete: req.body.complete
    },
    {
      where: {
        id: req.body.id
      }
    }
    ).then(function(guest) {
      res.json(guest);
    });
  });
  // end put
  
  // start delete
  app.delete("/api/guests/:id", function(req, res) {
    db.guest.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(guest) {
      res.json(guest);
    });
  });
  // end delete
};

