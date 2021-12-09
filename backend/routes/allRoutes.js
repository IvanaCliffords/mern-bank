const router = require('express').Router();

const AltUser = require('../models/user.model');
const Transaction = require('../models/transaction.model')





/////////// REGISTER POST ROUTE  /////////////////////////

router.post('/register', async (req, res) => {
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

/////////// LOGIN POST ROUTE  /////////////////////////

router.post('/login', async (req, res) => {
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



/////////////// DEPOSIT GET ROUTE ///////////////////////////


router.get('/deposit', async (req, res) => {
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

//////////////////////////////////////////////////////
////////  DEPOSIT POST ROUTE  ////////////////////////


router.post('/deposit', async (req, res) => {
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



        // const addTrans = async ({ userId, transType, balance, amount, newBalance }) => {
        //   const newTrans = new Transaction({
        //     userId,
        //     transType,
        //     preBalance: Number(balance),
        //     amount: Number(amount),
        //     postBalance: Number(newBalance)
        //   });
        //   const res = await newTrans.save();
        //   return res;
        // }
    }

    catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
}
)
