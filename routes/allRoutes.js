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
            message: 'User already exists',
        });
        return;
    }

    const newUser = await AltUser.create({ name, email, password, balance: 0 });

    res.json({
        message: 'success',
        userInfo: newUser
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

    res.json({
        message: 'success',
        userInfo: altUser
    });
});



/////////////// DEPOSIT GET ROUTE ///////////////////////////


router.get('/transactions', async (req, res) => {
    // console.log(req.headers);
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    const [email, password] = token.split(':');
    const altUser = await AltUser.findOne({ email }).exec();
    if (!altUser || altUser.password !== password) {
        res.status(401);
        res.json({
            message: 'Invalid access',
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
        res.status(500).send('Server error: not getitng deposit info from the server');
    }
}
);

//////////////////////////////////////////////////////
////////  DEPOSIT POST ROUTE  ////////////////////////


router.post('/transactions', async (req, res) => {
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
    console.count();
    console.log(req.body);

    if (!transType) {
        res.status(400).json({ msg: 'No transaction type' });
    }
    if (amount <= 0) {
        res.status(400).json({ msg: "Incorrect amount " });
    }
    if (transType !== 'deposit' && transType !== 'withdraw') {
        res.status(400).json({ msg: "Non existing transaction type" });
    }



    console.count();
    try {
        const { balance } = altUser;
        let newBalance = 0;
        if (transType === "deposit") {
            newBalance = Number(balance) + Number(amount);
        }


        else if (transType === "withdraw") {
            if (Number(amount) > Number(balance)) {
                res.status(400).json({ msg: 'Withdrawal must be less than or equal to balance' });
            }
            newBalance = Number(balance) - Number(amount);
        }
        console.count();
        console.log(newBalance);
        await AltUser.findOneAndUpdate({ email }, { balance: newBalance });
        const updatedUser = await AltUser.findOne({email})
        console.count();
        console.log(updatedUser);



        const newTrans = new Transaction({
            userId: altUser._id,
            transType,
            amount: Number(amount),
        });
        const createdTransaction = await newTrans.save();
        console.count();
        console.log(createdTransaction);
        res.status(201).json({ message: "Transaction added and user's balance updated!", userInfo: updatedUser });


    }

    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error: deposit is not working')
    }
}
)

module.exports = router;