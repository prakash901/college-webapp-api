const models = require("../models");
function save(req, res) {
  console.log("file path at image controller", req.file.path);

  const event = {
    title: req.body.title,
    datetime: req.body.datetime,
    description: req.body.description,
    imageUrl: req.file.path,
  };

  models.Event.create(event)
    .then((result) => {
      res.status(201).json({
        message: "Event created successfully",
        event: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        event: error,
      });
    });
}

function show(req, res) {
  //show object by id
  const id = req.params.id;
  models.Event.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Event not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}

function index(req, res) {
  //show all available posts
  models.Event.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}

function update(req, res) {
  const id = req.params.id;
  console.log("req.params.id", id);
  const updatedEvent = {
    title: req.body.title,
    imageUrl: req.file.path,
    content: req.body.content,
  };

  models.Event.update(updatedEvent, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Event updated successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong, can't update",
        error: error,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.Event.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Event Deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong, can't Delete",
        error: error,
      });
    });
}

module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  destroy: destroy,
};
