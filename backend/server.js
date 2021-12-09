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
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'AltUser',
    required: true
  },
  transType: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  preBalance: {
    type: Number,
    required: true
  },
  postBalance: {
    type: Number,
    required: true
  }

});
const Transaction = mongoose.model('transaction', TransactionSchema);

/////////////////////////////////////////////////

const getTrans = async (id) => {
  const transactions = await Transaction.find({ altUser: id });
  return transactions;
}

const addTrans = async ({ userId, transType, balance, amount, newBalance }) => {
  const newTrans = new Transaction({
    userId,
    transType,
    preBalance: Number(balance),
    amount: Number(amount),
    postBalance: Number(newBalance)
  });
  const res = await newTrans.save();
  return res;
}


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

/////////////// deposit get route
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
  try {
    // can't destructure if null so we grab it first
    const transactions = await Transaction.findOne({ userId: altUser._id }).exec();
    // sending transactions to the frontend
    
    res.send(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
}
);
//////////////////////////////////////////////
//////// POST DEPOSIT ////////////////////////


app.post('/deposit', async (req, res) => {
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
  const { transType, amount } = req.body;

  if (!transType) {
    return res.status(400).json({ msg: 'No transaction type' });

  }
  if (amount <= 0) {
    return res.status(400).json({ msg: "Incorrect amount " });
  }
  if (transType !== 'deposit' && transType !== 'withdraw') {
    return res.status(400).json({ msg: "Non existing transaction type" });
  }


  try {
    const { balance } = await Transaction.findOne({ userId: altUser._id }).exec();
    const newBalance = 0;
    if (transType = "deposit") {
      if (Number(amount) <= 0) {
        return res.status(400).json({ msg: 'Your deposit must be greater than zero' });
      }
      newBalance = Number(balance) + Number(amount);
    }
    else if (transType = "withdraw") {
      if (Number(amount) > Number(balance)) {
        return res.status(400).json({ msg: 'Withdrawal must be less than or equal to balance' });
      }
      newBalance = Number(balance) - Number(amount);
    }
    else return res.status(500).send("server error");

  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error')
  }
}
)



// app.use('/users', require('./routes/users'));
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
  });
});
