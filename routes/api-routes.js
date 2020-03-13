// Requiring our models as we've configured it
var db = require("../models")

module.exports = function(app) {
  // events routes
  app.get("/api/events", (req, res) => {
    db.Event.findAll({}).then(dbEvent => {
      res.json(dbEvent)
    })
  })

  // get by ID
  app.get("/api/events/:id", (req, res) => {
    db.Event.findOne({
      where: {
        id: req.params.id,
      },
    }).then(dbEvent => {
      res.json(dbEvent)
    })
  })

  // get by title
  app.get("/api/events/:title", (req, res) => {
    db.Event.findOne({
      where: {
        title: req.params.title,
      },
    }).then(dbEvent => {
      res.json(dbEvent)
    })
  })

  // get by category
  app.get("/api/events/:category", (req, res) => {
    db.Event.findOne({
      where: {
        category: req.params.category,
      },
    }).then(dbEvent => {
      res.json(dbEvent)
    })
  })

  // get by location
  app.get("/api/events/:location", (req, res) => {
    db.Event.findOne({
      where: {
        location: req.params.location,
      },
    }).then(dbEvent => {
      res.json(dbEvent)
    })
  })

  app.post("/api/events", (req, res) => {
    console.log("hit post route")
    db.Event.create(req.body).then(dbEvent => {
      res.json(dbEvent)
    })
  })

  app.delete("/api/events/:id", (req, res) => {
    db.Event.destroy({
      where: {
        id: req.params.id,
      },
    }).then(dbEvent => {
      res.json(dbEvent)
    })
  })
}
