const db = require("../models");
const Client = db.clients;

// Create and Save a new Client
exports.create = (req, res) => {
  res.render("../views/pages/create.ejs");
}; 

exports.save = (req, res) => {

    // check validity of client info
    if (!req.body.name) {
      res.render("../views/pages/create.ejs");
      console.log({ message: "Content can not be empty!" });
      return;
     }
      
     // Create a Client
     const client = new Client({
      name: req.body.name,
      surname: req.body.surname,
      class: req.body.class
     })

     //Save Client
     client
        .save(client)
        .then(data => {
          res.render('../views/pages/show.ejs', {students: data});
        })  
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    
    const surname = req.query.surname;
    var condition = surname ? { surname: { $regex: new RegExp(surname), $options: "i" } } : {};
  
    Client.find(condition)
      .then(data => {
        res.render('../views/pages/index.ejs', {students: data});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "error during the clients search"
        });
      });
};

// Find a single Client by codFiscale
exports.findOne = (req, res) => {

  const surname = req.params.surname;

  Client.findOne({surname: surname})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Client with surname " + surname });
      else res.render('../views/pages/show.ejs', {students: data});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Client with surname=" + surname });
    });
  
};


//edit form
exports.edit = (req,res) =>{
  const surname = req.params.surname;

  Client.findOne({surname: surname})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Client with surname " + surname });
      else res.render('../views/pages/edit.ejs', {students: data});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Client with surname=" + surname });
    });
}



// Update a Client by the codFiscale in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const surname = req.params.surname;
    
      Client.findOneAndUpdate({surname: surname}, req.body, { new: true })
        .then(data => {
          if (!data) {
            res.render("../views/edit", {students: data});
            res.status(404).send({
              message: `Cannot update Client with surname=${surname}. Maybe Client was not found!`
            });
          } else res.redirect("/show/"+ data.surname);
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Client with codFiscale=" + surname
          });
        });
  
};

// Delete a Client with the specified codFiscale in the request
exports.delete = (req, res) => {
    const surname = req.params.surname;

  Client.findOneAndDelete({surname: surname})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Client with surname=${surname}. Maybe Client was not found!`
        });
      } else {
        res.redirect("/index");
        console.log({
          message: "Client was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Client with surname=" + surname
      });
    });
  
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Client.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Clients were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Clients."
      });
    });
  
};

