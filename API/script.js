function showSearch() {
  let city = document.getElementById("city").value

  EVDB.API.call(
    "/events/search",
    {
      app_key: "x8RFCpSQ55HDvQCp",
      location: city,
      // keywords: "books",
      date: "This Week",
    },
    function(oData) {
      console.log(oData)
      //   console.log(oData.events.event[i].url)
      //   let eventPicture = "https:" + oData.events.event[i].image.medium.url
      //   let cityLocation = oData.events.event[i].city_name
      //   let eventTitle = oData.events.event[i].title
      {
        /* <img src="${eventPicture}">  */
      }
      //   let eventUrl = oData.events.event[i].url

      //   let startTime = oData.events.event[i].start_time
      //   let momentStartTime = moment(startTime)
      //   let formattedDate = momentStartTime.format("MMMM Do YYYY")

      for (let i = 0; i < oData.events.event.length; i++) {
        let counter = 0
        console.log("here ya go" + oData.events.event[i])

        counter = counter + i + 1

        let eventUrl = oData.events.event[i].url
        let startTime = oData.events.event[i].start_time
        let momentStartTime = moment(startTime)
        let formattedDate = momentStartTime.format("MMMM Do YYYY")
        let cityLocation = oData.events.event[i].city_name
        let eventTitle = oData.events.event[i].title
        let eventDescription = oData.events.event[i].description

        $("#results").append(
          `
             <p><b>City:</b> ${cityLocation}</p>
             <p><b>Event Title:</b> ${eventTitle}<p>
             <p><b>Event Description: </b>${eventDescription}</p>
             <p><b>Date:</b> ${formattedDate}</p>
             <p><b>Event URL:</b> <a href="${eventUrl}" target="_blank">${eventUrl} </a></p>
             <button>Add Event</button>
             <hr>`
        )
      }
    }
  )
}

$("#button").on("click", function(event) {
  event.preventDefault()
  showSearch()
  $("#results").empty()
})
