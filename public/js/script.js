$(function() {
  function showSearch() {
    let city = document.getElementById("city").value
    let keyword = document.getElementById("keyword").value
    // let date = document.getElementById("dates").value
    let startDate = document.getElementById("startDate").value
    let startYear = startDate.substring(0, 4)
    let startMonth = startDate.substring(5, 7)
    let startDay = startDate.slice(8)
    startDate = startYear + startMonth + startDay + "00-"

    let endDate = document.getElementById("endDate").value
    let endYear = endDate.substring(0, 4)
    let endMonth = endDate.substring(5, 7)
    let endDay = endDate.slice(8)
    endDate = endYear + endMonth + endDay + "00"

    let dateRange = startDate + endDate

    EVDB.API.call(
      "/events/search",
      {
        app_key: "x8RFCpSQ55HDvQCp",
        location: city,
        keywords: keyword,
        date: dateRange,
      },

      function(oData) {
        // console.log(oData)

        for (let i = 0; i < oData.events.event.length; i++) {
          // console.log(oData.events.event[i])

          let eventUrl = oData.events.event[i].url
          let startTime = oData.events.event[i].start_time
          let momentStartTime = moment(startTime)
          let formattedDate = momentStartTime.format("MMMM Do, YYYY.")
          let formattedTime = momentStartTime.format(" h:mm a.")
          let cityLocation = oData.events.event[i].city_name
          let eventTitle = oData.events.event[i].title
          let imgTemplate = ""
          let apiId = oData.events.event[i].id

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
          <a class="waves-effect waves-light btn add" id="${apiId}" style="margin-left: 25px">Add to My Events!</a>

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
