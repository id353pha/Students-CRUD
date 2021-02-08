 
    const client = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    // save a new student
    router.post("/save", client.save);

    //create form
    router.get("/create", client.create);
  
    // Retrieve all student
    router.get("/index", client.findAll);
  
    // Retrieve a single student with surname
    router.get("/show/:surname", client.findOne);

    //edit a student
    router.get("/edit/:surname", client.edit);
  
    // Update a student with surname
    router.post("/update/:surname", client.update);
  
    // Delete a student with surname
    router.post("/delete/:surname", client.delete);
  
    //delete all student
    router.delete("/", client.deleteAll);
  
    //app.use('/api/client', router);
  
  module.exports = router 