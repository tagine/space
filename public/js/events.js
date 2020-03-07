$(function () {
  $(".add").on("click", function (event) {
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
        console.log(oData);
        const newEvent = {
          title: oData.title,
          date: oData.start_time,
          description: oData.description,
          time: oData.start_time,
          location: oData.city,
          link: oData.url,
          imgUrl: images.image.thumb.url
        }
        console.log(newEvent);
      })
  });


  $(".clear").on("click", (event) => {
    // get event id

    // DESTROY

  });

  $(".search").on("click", (event) => {
    // ???

  });

});