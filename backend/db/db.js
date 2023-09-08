const mongoose = require('mongoose');
const config = require('../config/config')
 
const { MONGO_URI } = config;

module.exports = () => {
  function connect() {
    mongoose.connect("mongodb://localhost:27017/Test1?retryWrites=true", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('MongoDB connecting Success!!'))
      .catch((e) => console.log(e));
  }

  connect();

  mongoose.connection.on('disconnected', connect);
};