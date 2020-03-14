const orderEvents = eventArray => {
  zeroRemover(eventArray)
  let orderedDates = orderByYear(eventArray)
  return orderedDates
}

zeroRemover = arr => {
  for (const object of arr) {
    let date = object.date
    if (date.charAt(8) === "0") {
      object.date = date.slice(0, 8) + date.slice(9)
    }
  }
  for (const object of arr) {
    let date = object.date
    if (date.charAt(5) === "0") {
      object.date = date.slice(0, 5) + date.slice(6)
    }
  }
  return arr
}

orderByYear = dateObjectArray => {
  let orderedDates = {}
  for (const dateObject of dateObjectArray) {
    let dateArray = dateObject.date.split("-")
    let year = dateArray[0]
    if (orderedDates.hasOwnProperty(year)) {
      orderedDates[year].push(dateObject)
    } else {
      orderedDates[year] = [dateObject]
    }
  }
  orderByMonth(orderedDates)
  return orderedDates
}

orderByMonth = orderedYearObject => {
  let yearKeysArray = Object.keys(orderedYearObject)

  for (const yearKey of yearKeysArray) {
    let datesWithinYearArray = orderedYearObject[yearKey]
    if (datesWithinYearArray.length > 1) {
      orderedYearObject[yearKey] = {}
      for (const dateObject of datesWithinYearArray) {
        let dateArray = dateObject.date.split("-")
        let month = dateArray[1]
        if (orderedYearObject[yearKey].hasOwnProperty(month)) {
          orderedYearObject[yearKey][month].push(dateObject)
        } else {
          orderedYearObject[yearKey][month] = [dateObject]
        }
      }
    }

    orderedMonthObject = orderedYearObject[yearKey]
    orderByDay(orderedMonthObject)
  }
  return orderedYearObject
}

orderByDay = orderedMonthObject => {
  let monthKeysArray = Object.keys(orderedMonthObject)

  for (const monthKey of monthKeysArray) {
    let datesWithinMonthArray = orderedMonthObject[monthKey]
    if (datesWithinMonthArray.length > 1) {
      orderedMonthObject[monthKey] = {}
      for (const dateObject of datesWithinMonthArray) {
        let dateArray = dateObject.date.split("-")
        let day = dateArray[2]
        if (orderedMonthObject[monthKey].hasOwnProperty(day)) {
          orderedMonthObject[monthKey][day].push(dateObject)
        } else {
          orderedMonthObject[monthKey][day] = [dateObject]
        }
      }
    }
  }
}

const getCalendar = () => {
  $.get("/api/events", function(data) {
    orderEvents(data) // this will order the events saved in db
    console.log(data)
    $("#cardinfo").empty()
    for (const event of data) {
      let id = event.id
      let title = event.title
      $("#cardinfo").append(`<div class="card" id="card${id}"><h4><b>${title}</b></h4></div>`)
      $(`#card${id}`).append(`<img src="${event.imageLink}">`)
      $(`#card${id}`).append(`<p>${event.description}</p>`)
      $(`#card${id}`).append(`
      <button class="btn btn-primary" onclick="deleteEvent(${id})" type="search">
      <i class="fa fa-search"></i><h8> Remove Event from Calendar</h8></button>
      `)
    }
  })
}

function deleteEvent(id) {
  $.ajax({
    url: `/api/events/${id}`,
    method: "DELETE",
    success: function(data) {
      getCalendar()
    },
  })
}

$(document).ready(function() {
  getCalendar()
})
