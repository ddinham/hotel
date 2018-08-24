// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app)
{
    app.get("/api/availablerooms", function (req, res) {
        sequelize.query("SELECT roomid FROM bookings WHERE (CheckInDate BETWEEN DATE(:checkInDate) AND (DATE(:checkOutDate)-1) ) AND (checkOutDate BETWEEN DATE(:checkInDate) AND (DATE(:checkOutDate))) LIMIT 1;", {
            replacements: req.body,
            type: sequelize.QueryTypes.SELECT
        }).then(room => {
            console.log(room);
            res.json(room);
        });
    });
    // GET route for getting all of the bookings
    app.get("/api/bookings", function (req, res) {
        db.booking.findAll({
                include: [db.room,db.guest]
            })
            .then(function (dbBooking) {
                res.json(dbBooking);
            }).catch(function (err) {
                //DO Seomthing
                res.json('{"Error":"Coud not find stuff"}' + err);
            });
    });

    // Get route for retrieving a single booking
    app.get("/api/bookings/:id", function (req, res) {
        db.booking.findOne({
                where: {
                    id: req.params.id
                },
                include: [db.rooms]
            })
            .then(function (dbBooking) {
                res.json(dbBooking);
            });
    });

    // booking route for saving a new booking 
    //TODO: Write BOOKING POST SEQUELIZE
    app.post("/api/bookings", function (req, res) {
        console.log(req.body);
        db.booking.create(req.body)
            .then(function (dbBooking)
            {
                res.json(dbBooking);
            });
    });

    // DELETE route for deleting bookings
    app.delete("/api/bookings/:id", function (req, res) {
        db.booking.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbBooking) {
                res.json(dbBooking);
            });
    });

    // PUT route for updating bookings
    app.put("/api/bookings", function (req, res) {
        db.booking.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then(function (dbBooking) {
                res.json(dbBooking);
            });
    });

// Get route for retrieving a single booking
app.get("/api/availablerooms/:checkInDate/:checkOutDate/:room_type", function (req, res)
{
    console.log(req.body)

    db.sequelize.query("SELECT rooms.id FROM hotelexpress_db.rooms Left Outer Join bookings ON rooms.id = bookings.id WHERE room_type = :room_type AND rooms.id Not IN(SELECT roomid FROM bookings WHERE (CheckInDate BETWEEN DATE(:checkInDate) AND (DATE(:checkOutDate)-1) ) AND (checkOutDate BETWEEN DATE(:checkInDate) AND (DATE(:checkOutDate)))) LIMIT 1;",
        { replacements: {checkInDate: req.params.checkInDate, checkOutDate: req.params.checkOutDate, room_type: req.params.room_type}, type: db.sequelize.QueryTypes.SELECT }
    ).then(function(room)
    {
        console.log(room);
        res.json(room);
    });
});

};




