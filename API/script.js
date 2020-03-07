function showSearch() {
  let city = document.getElementById("city").value
  let keyword = document.getElementById("keyword").value

  EVDB.API.call(
    "/events/search",
    {
      app_key: "x8RFCpSQ55HDvQCp",
      location: city,
      keywords: keyword,
      date: "This Week",
    },
    function(oData) {
      console.log(oData)

      for (let i = 0; i < oData.events.event.length; i++) {
        console.log(oData.events.event[i])

        let eventUrl = oData.events.event[i].url
        let startTime = oData.events.event[i].start_time
        let momentStartTime = moment(startTime)
        let formattedDate = momentStartTime.format("MMMM Do, YYYY. h:mm a.")
        let cityLocation = oData.events.event[i].city_name
        let eventTitle = oData.events.event[i].title
        let imgTemplate = ""

        if (
          oData.events.event[i].image &&
          oData.events.event[i].image.medium.url
        ) {
          let image = oData.events.event[i].image.medium.url
          let eventPicture = ""
          if (image.includes("http")) {
            eventPicture = image
          } else {
            eventPicture = "https:" + image
          }

          imgTemplate = `<p><img src="${eventPicture}"></p>`
        }

        let description = oData.events.event[i].description
        let eventDescription = ""

        if (description !== null) {
          eventDescription = description
        } else {
          eventDescription = "No Description Available"
        }

        $("#results").append(
          `

             ${imgTemplate}            
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
