const models = require("../models");
function save(req, res) {
  const message = {
    subject: req.body.subject,
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  };
  models.Message.create(message)
    .then((result) => {
      res.status(201).json({
        message: "Message sent successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function index(req, res) {
  //show all available posts
  models.Message.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.Message.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Message Deleted successfully",
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
  index: index,
  destroy: destroy,
};
