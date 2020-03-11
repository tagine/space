$(function () {
  $(document).on("click", ".add", function (event) {
    event.preventDefault();
    let targetDivId = $(this).parent().attr('id');
    EVDB.API.call(
      "/events/get",
      {
        app_key: "x8RFCpSQ55HDvQCp",
        id: targetDivId
      },
      function (oData) {
        const newEvent = {
          title: oData.title,
          date: oData.start_time,
          description: oData.description,
          time: oData.start_time,
          location: oData.city,
          link: oData.url
          // imgUrl: images.image.thumb.url
        }
        postEvent(newEvent);
      })
  });

  const postEvent = (event) => {
    // post route will need to be changed for heroku deployment
    $.post("http://localhost:8080/api/events", event, () => {
      console.log("successfully posted")
      // window redirect?
      // window.location.href = "/calendar";
    });
  }

  $(".search").on("click", (event) => {
    // ???
  });


});
