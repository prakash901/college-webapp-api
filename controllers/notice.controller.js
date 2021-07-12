const models = require("../models");
function save(req, res) {
  const notice = {
    title: req.body.title,
    description: req.body.description,
  };

  models.Notice.create(notice)
    .then((result) => {
      res.status(201).json({
        message: "Notice created successfully",
        notice: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        notice: error,
      });
    });
}

function show(req, res) {
  //show object by id
  const id = req.params.id;
  models.Notice.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Notice not found!",
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
  models.Notice.findAll()
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
  const updatedNotice = {
    title: req.body.title,
    description: req.body.description,
  };

  models.Notice.update(updatedNotice, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Notice updated successfully",
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

  models.Notice.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Notice Deleted successfully",
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
