const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/bank',
  {
    // all this is no longer supported since mongoose 6.0
    // docs - https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  },

  (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
  }
);

module.exports = mongoose.connection;
