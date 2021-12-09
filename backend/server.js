const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');

// set up express
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

const ObjectId = require('mongoose').Types.ObjectId;

/////////////////////////////////////////////////////
// MONGOOSE MODELS 

// USER MODEL

const altUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String
  },
  balance: {
    type: Number,
    required: true
  }
});

const AltUser = mongoose.model('AltUser', altUserSchema);

// TRANSACTION MODEL

/////// SUPER SUPER NOT SURE ABOUT THIS ONE 

const TransactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  deposit: {
    id: String,
    amount: Number
  },

});

const Transaction = mongoose.model('transaction', TransactionSchema);

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Routes
app.post('/register', async (req, res) => {
  const { name, email, password, balance } = req.body;
  const altUser = await AltUser.findOne({ email }).exec();

  if (altUser) {
    res.status(500);
    res.json({
      message: 'user already exists',
    });
    return;
  }

  await AltUser.create({ name, email, password, balance: 0 });

  res.json({
    message: 'success',
  });
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const altUser = await AltUser.findOne({ email }).exec();
  if (!altUser || altUser.password !== password) {
    res.status(401);
    res.json({
      message: 'invalid login',
    });
    return;
  }
  await AltUser.create({ email, password });

  res.json({
    message: 'success',
  });
});



///////////////////////////
///// DEPOSIT //////////////

app.post('/deposit', async (req, res) => {

  // get the username and password with some JavaScript ninja skills :)
  // 1) grab what in authorization from the request's headers
  // console.log(req.headers);
  const { authorization } = req.headers;
  // console.log(authorization); // (will output this) Basic pip:123456
  // 2) split the items by the space and store the second part in the variable token
  const [, token] = authorization.split(' ');
  // 3) split into two items "username" and "password" based on ":"
  const [email, password] = token.split(':');

  // grab the balance sent over from the client
  const balanceUpdated = req.body;

  // find a user based on its unique email
  const altUser = await AltUser.findOne({ email }).exec();
  if (!AltUser || altUser.password !== password) {
    res.status(401);
    res.json({
      message: 'Invalid login',
    });
    return;
  }

  // grab a user based on its ID and go grab its balance 
  const balance = await Transaction.findOne({ userId: altUser._id }).exec();
  // SUPER NOT SURE ABOUT THIS PART  
  balance.balance = balanceUpdated;
  await balance.save();
  res.json(balanceUpdated);

});


app.get('/deposit', async (req, res) => {
  // console.log(req.headers);
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [email, password] = token.split(':');
  const altUser = await AltUser.findOne({ email }).exec();
  if (!altUser || altUser.password !== password) {
    res.status(401);
    res.json({
      message: 'invalid access',
    });
    return;
  }
  // can't destructure if null so we grab it first
  const balance = await Transaction.findOne({ userId: altUser._id }).exec();
  // then we make sure it exists
  if (balance)
    res.json(balance.balance);
  // and then we return it


});

// app.use('/users', require('./routes/users'));
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
  });
});
