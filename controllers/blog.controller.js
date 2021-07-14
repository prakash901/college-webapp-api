const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const blog = {
    title: req.body.title,
    imageUrl: req.file.path,
    content: req.body.content,
  };

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    imageUrl: { type: "string", optional: false, max: "500" },
    content: { type: "string", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(blog, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  }

  models.Blog.create(blog)
    .then((result) => {
      res.status(201).json({
        message: "Blog created successfully",
        blog: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        blog: error,
      });
    });
}

function show(req, res) {
  //show object by id
  const id = req.params.id;
  models.Blog.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Blog not found!",
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
  //show all available Blogs
  models.Blog.findAll()
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
  const updatedBlog = {
    title: req.body.title,
    imageUrl: req.file.path,
    content: req.body.content,
  };

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    imageUrl: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
  };

  const v = new Validator();
  const validationResponse = v.validate(updatedBlog, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  }

  models.Blog.update(updatedBlog, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Blog updated successfully",
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

  models.Blog.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Blog Deleted successfully",
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
