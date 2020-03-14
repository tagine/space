const postEvent = event => {
  console.log("posting")
  // post route will need to be changed for heroku deployment??
  $.post("/api/events", event, () => {
    console.log("successfully posted")
  })
}

function getEvent(apiId) {
  console.log("in here buddy")
  event.preventDefault()
  let targetId = apiId
  EVDB.API.call(
    "/events/get",
    {
      app_key: "x8RFCpSQ55HDvQCp",
      id: targetId,
    },
    function(oData) {
      console.log(oData)
      const newEvent = {
        title: oData.title,
        date: oData.start_time,
        description: oData.description,
        time: oData.start_time,
        location: oData.city,
        link: oData.url,
        imageLink: 
          oData.images &&
          oData.images.image &&
          oData.images.image.thumb &&
          oData.images.image.thumb.url,
      }
      postEvent(newEvent)
    }
  )
}

$(function() {
  function showSearch() {
    let city = document.getElementById("city").value
    let keyword = document.getElementById("keyword").value
    let startDate = document.getElementById("startDate").value
    let momentStart = moment(startDate)
    let momentStartDate = momentStart.format("YYYYMMDD") + "00-"
    let endDate = document.getElementById("endDate").value
    let momentEnd = moment(endDate)
    let momentEndDate = momentEnd.format("YYYYMMDD") + "00"
    let dateRange = momentStartDate + momentEndDate

    EVDB.API.call(
      "/events/search",
      {
        app_key: "x8RFCpSQ55HDvQCp",
        location: city,
        keywords: keyword,
        date: dateRange,
      },

      function(oData) {
        let listOfEvents = oData.events.event
        listOfEvents.sort((a, b) => {
          if (moment(a.start_time) < moment(b.start_time)) {
            return -1
          }
          if (moment(a.start_time) > moment(b.start_time)) {
            return 1
          }
          return 0
        })

        for (let i = 0; i < listOfEvents.length; i++) {
          let eventUrl = listOfEvents[i].url
          let startTime = listOfEvents[i].start_time
          let momentStartTime = moment(startTime)
          let formattedDate = momentStartTime.format("MMMM Do, YYYY.")
          let formattedTime = momentStartTime.format(" h:mm a.")
          let cityLocation = listOfEvents[i].city_name
          let eventTitle = listOfEvents[i].title
          let imgTemplate = ""
          let apiId = listOfEvents[i].id
          console.log("apiId", apiId)

          if (listOfEvents[i].image && listOfEvents[i].image.medium.url) {
            let image = listOfEvents[i].image.medium.url
            let eventPicture = ""
            if (image.includes("http")) {
              eventPicture = image
            } else {
              eventPicture = "https:" + image
            }

            imgTemplate = `<p><img src="${eventPicture}"></p>`
          }

          let description = listOfEvents[i].description
          let eventDescription = ""

          if (description !== null) {
            eventDescription = description
          } else {
            eventDescription = "No Description Available"
          }

          $("#results").append(
            `<div class="row" id=${apiId}>
          <div class="col s6 offset-s3">
            <div class="card">
              <div class="card-image">
              ${imgTemplate} 
                
               
              </div>
              <span class="card-title">${eventTitle}</span>
              <div class="card-content">
                <p>${eventDescription}</p>
                <br>
                <p><b>City:</b> ${cityLocation}</p>
          <p><b>Date:</b> ${formattedDate}</p>
          <p><b>Time:</b> ${formattedTime}</p>
          <br>
          <a class="waves-effect waves-light btn" href="${eventUrl}" target="_blank">Event Site</a>
          <a class="waves-effect waves-light btn add" onclick="getEvent('${apiId}')" id="${apiId}" style="margin-left: 25px">Add to My Events!</a>

              </div>
            </div>
          </div>
        </div>
           `
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
})

$(document).ready(function() {
  $(".datepicker").datepicker()
})
