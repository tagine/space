// Requiring path to so we can use relative routes to our HTML files
var path = require("path")

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
  })

  // search page
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
  })

  // calendar page
  app.get("/calendar", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/calendar.html"))
  })
}
