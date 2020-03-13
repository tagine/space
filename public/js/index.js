// const postEvent = event => {
//   // post route will need to be changed for heroku deployment??
//   $.post("/api/events", event, () => {
//     console.log("successfully posted")
//   })
// }

// function getEvent(event) {
//   event.preventDefault()
//   let targetId = event.target.id
//   EVDB.API.call(
//     "/events/get",
//     {
//       app_key: "x8RFCpSQ55HDvQCp",
//       id: targetId,
//     },
//     function(oData) {
//       console.log(oData)
//       const newEvent = {
//         title: oData.title,
//         date: oData.start_time,
//         description: oData.description,
//         time: oData.start_time,
//         location: oData.city,
//         link: oData.url,
//         imageLink: oData.images.image.thumb.url,
//       }
//       postEvent(newEvent)
//     }
//   )
// }

// $(document).ready(function() {
//   // $(function () {
//   $(document).on("click", ".add",
//   })
// })
