$(document).ready(function() {

  $(document).on("click",".delete-item-button",function() {
 
    var id = $(this).attr("id");

    $('#delete-modal').on('click','.yes-delete-button', function(event) {
      
    $.ajax("/api/bookings/" + id, {
        type: "DELETE"
    }).then(
        function () {
            window.location.reload();
        }
    );
  })});

  var bookingsList = $("tbody");
  getBookings();

  function createBookingRow(bookingData) {
    var newTr = $("<tr>");
    var deleteButton = $("<input>").addClass('btn btn-primary delete-item-button').attr("type",'delete').attr("value",'Delete').attr("id",bookingData.id).attr("data-toggle","modal").attr("data-target","#delete-modal");
    var updateButton = $("<input>").addClass('btn btn-primary update-item-button').attr("type",'update').attr("value",'Update').attr("id",bookingData.id);

    newTr.data("booking", bookingData);
    newTr.append("<td>" + bookingData.id + "</td>");
    newTr.append("<td>" + bookingData.checkInDate + "</td>");
    newTr.append("<td>" + bookingData.checkOutDate + "</td>");
    newTr.append("<td>" + bookingData.roomId + "</td>");
    newTr.append("<td>" + bookingData.room.room_type + "</td>");
    newTr.append("<td>" + bookingData.guest.lastName + "</td>");
    newTr.append("<td>" + bookingData.guest.firstName + "</td>");
    newTr.append("<td>" + bookingData.specialRequests + "</td>");
    newTr.append(updateButton);
    newTr.append(deleteButton);
    return newTr;
  }

  function getBookings() {
    $.get("/api/bookings/", function (data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createBookingRow(data[i]));
      }
      renderBookingsList(rowsToAdd);
    });
  };

  function renderBookingsList(rows) {
    if (rows.length) {
      bookingsList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no bookings
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.text("No bookings in the database.");
    bookingsList.append(alertDiv);
  }});