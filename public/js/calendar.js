// const OrderFriend = require("../../library/OrderFriend.js");

$(document).ready(function () {
  // const orderFriend = new OrderFriend;

  const getCalendar = () => {

     $.get("/api/events", function (data) {

      // orderFriend.order(data);
      console.log(data);
      // logic within here to display the calendar?
      data.forEach(calendarObject => {
        //run a conditional to check what key you're on create the new div element then append it to card info in line 15 and 16
        let cardContent =  $("#cardinfo");
        let listingDiv = cardContent.append("<div></div>");
        listingDiv.addClass("card");
        Object.entries(calendarObject).forEach(([key,value]) => {
          if(key==="title"){
            console.log(value);
            let titleDiv = listingDiv.append("<div></div>");
            let title = titleDiv.append("<h3></h3>").text(value);
          }
          // if(key==="date"){
          //   console.log(value);
          //   let dateDiv = dateDiv.append("<div></div>");
          //   let date = dateDiv.append("<p></p>").text(value);
          // }
          // let imageDiv = listingDiv.append("<div></div>");
          // let image = imageDiv.append("<img></img>").attr("src", src1);
          // console.log(value);
        })
        });
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
