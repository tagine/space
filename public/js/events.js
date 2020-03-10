$(function () {
  $(document).on("click", ".add", function (event) {
    console.log("clicked add!")
    event.preventDefault();
    let targetDivId = $(this).parent().attr('id');
    EVDB.API.call(
      "/events/get",
      {
        app_key: "x8RFCpSQ55HDvQCp",
        id: targetDivId
      },
      function (oData) {
        console.log("called addEvent")
        // console.log(oData);
        const newEvent = {
          title: oData.title,
          date: oData.start_time,
          description: oData.description,
          time: oData.start_time,
          location: oData.city,
          link: oData.url
          // imgUrl: images.image.thumb.url
        }
        console.log(newEvent);
        postEvent(newEvent);
      })
  });

  function postEvent(event) {
    console.log("entered postEvent");
    // post route will need to be changed for heroku deployment
    $.post("http://localhost:8080/api/events", event, function() {
      // window.location.href = "/blog";
      console.log("successfully posted")
      // window redirect
    });
  }


  $(".clear").on("click", (event) => {
    // get event id

    // DESTROY

  });

  $(".search").on("click", (event) => {
    // ???

  });

});