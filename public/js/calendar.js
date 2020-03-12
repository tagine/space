$(document).ready(function () {

  const getCalendar = () => {

    $.get("/api/events", function (data) {
      orderEvents(data); // this will order the events saved in db

      // logic within here to display the events to the calendar?
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

  const orderEvents = (eventArray) => {
    console.log("poof")
    zeroRemover(eventArray);
    let orderedDates = orderByYear(eventArray);
    return orderedDates;
  }

  zeroRemover = (arr) => {
    for (const object of arr) {
      let date = object.date;
      if (date.charAt(8) === "0") {
        object.date = date.slice(0, 8) + date.slice(9);
      }
    }
    for (const object of arr) {
      let date = object.date;
      if (date.charAt(5) === "0") {
        object.date = date.slice(0, 5) + date.slice(6);
      }
    }
    return arr;
  }

  orderByYear = (dateObjectArray) => {
    let orderedDates = {};
    for (const dateObject of dateObjectArray) {
      let dateArray = dateObject.date.split("-");
      let year = dateArray[0];
      if (orderedDates.hasOwnProperty(year)) {
        orderedDates[year].push(dateObject);
      }
      else {
        orderedDates[year] = [dateObject];
      }
    }
    orderByMonth(orderedDates);
    return orderedDates;
  }

  orderByMonth = (orderedYearObject) => {
    let yearKeysArray = Object.keys(orderedYearObject);

    for (const yearKey of yearKeysArray) {
      let datesWithinYearArray = orderedYearObject[yearKey];
      if (datesWithinYearArray.length > 1) {
        orderedYearObject[yearKey] = {};
        for (const dateObject of datesWithinYearArray) {
          let dateArray = dateObject.date.split("-");
          let month = dateArray[1];
          if (orderedYearObject[yearKey].hasOwnProperty(month)) {
            orderedYearObject[yearKey][month].push(dateObject);
          }
          else {
            orderedYearObject[yearKey][month] = [dateObject];
          }
        }
      }

      orderedMonthObject = orderedYearObject[yearKey];
      orderByDay(orderedMonthObject);
    }
    return orderedYearObject;
  }

  orderByDay = (orderedMonthObject) => {
    let monthKeysArray = Object.keys(orderedMonthObject);

    for (const monthKey of monthKeysArray) {
      let datesWithinMonthArray = orderedMonthObject[monthKey];
      if (datesWithinMonthArray.length > 1) {
        orderedMonthObject[monthKey] = {};
        for (const dateObject of datesWithinMonthArray) {
          let dateArray = dateObject.date.split("-");
          let day = dateArray[2];
          if (orderedMonthObject[monthKey].hasOwnProperty(day)) {
            orderedMonthObject[monthKey][day].push(dateObject);
          }
          else {
            orderedMonthObject[monthKey][day] = [dateObject];
          }
        }
      }
    }
  }
});
