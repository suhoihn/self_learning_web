const mongoose = require('mongoose');

// Export a function for database connection
module.exports = () => {
  const connect = () => {
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