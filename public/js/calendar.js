// const OrderFriend = require("../../library/OrderFriend.js");

$(document).ready(function () {
  // const orderFriend = new OrderFriend;

  const getCalendar = () => {

     $.get("/api/events", function (data) {

      // orderFriend.order(data);
      console.log(data);
      // logic within here to display the calendar?
    });
  }

  getCalendar()

  $(document).on("click", ".delete", (event) => {
    // get event id logic needed here
    $.delete("/api/events/:id", function (data) {
      // logic within here to display the calendar?
      // refresh calendar?
    });
  });
});
