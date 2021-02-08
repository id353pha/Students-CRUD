module.exports = mongoose => {
    const Client = mongoose.model(
      "students",
      mongoose.Schema(
        {
          name: String,
          surname: String,
          class: String
        },
        { timestamps: true }
      )
    );
  
    return Client;
  };