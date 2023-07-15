const mongoose = require('mongoose');
const config = require('../config/config')
 
const { MONGO_URI } = config;

module.exports = () => {
  function connect() {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('MongoDB connecting Success!!'))
      .catch((e) => console.log(e));
  }

  connect();

  mongoose.connection.on('disconnected', connect);

//   require('./user.js'); // user.js는 나중에 만듭니다.
};