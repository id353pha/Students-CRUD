 
    const client = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    // save a new client
    router.post("/save", client.save);

    //create form
    router.get("/create", client.create);
  
    // Retrieve all client
    router.get("/index", client.findAll);
  
    // Retrieve a single client with codFiscale
    router.get("/show/:surname", client.findOne);

    //edit a client
    router.get("/edit/:surname", client.edit);
  
    // Update a client with codFiscale
    router.post("/update/:surname", client.update);
  
    // Delete a client with codFiscale
    router.post("/delete/:surname", client.delete);
  
    //delete all clients
    router.delete("/", client.deleteAll);
  
    //app.use('/api/client', router);
  
  module.exports = router 