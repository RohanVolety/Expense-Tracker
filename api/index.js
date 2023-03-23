const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction')
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/test', (req, res) => {
    app.use(express.json())
    res.json('test ok');
});

app.post('/api/transaction', async (req, res) => {
    try {
        const { name, price, description, datetime } = req.body;
        const newtrans = await Transaction.create({ name, price, description, datetime });
        
        res.status(201).json({ newtrans, "success": true })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

app.get('/api/transactions', async (req, res) => {
    try {
        console.log('get transactions')
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(4000, () => console.log('server started on port 4000'));
    })
    .catch(err => console.log(err));


