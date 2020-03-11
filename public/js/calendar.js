$(document).ready(function () {
  const OrderFriend = require("../../library/OrderFriend.js");
  const orderFriend = new OrderFriend;

  const getCalendar = () => {
    // should hit api-route get to access db?
    // ajax
     $.get("/api/events", function (data) {
      orderFriend.order(data);
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
