const models = require("../models");
function save(req, res) {
  const data = {
    imageUrl: req.file.path,
  };
  console.log("file path at image controller", req.path);
  if (req.file.filename) {
    models.Gallery.create(data).then((result) => {
      res.status(201).json({
        message: "Image uploaded successfully",
        url: result,
      });
    });
  } else {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
}

function show(req, res) {
  //show object by id

  const id = req.params.id;
  models.Gallery.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Post not found!",
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
  models.Gallery.findAll()
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
  const updatedGallery = {
    imageUrl: req.body.imageUrl,
  };

  models.Gallery.update(updatedGallery, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Gallery updated successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Gallery went wrong, can't update",
        error: error,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.Gallery.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Image Deleted successfully",
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
