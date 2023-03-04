const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const Transaction=require('./models/Transaction.js')
const mongoose=require('mongoose');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/test',(req,res)=>{

app.use(express.json())
res.json('test ok');
});

app.post('/api/transaction',async (req,res)=>{
   //console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    const {name,price,description,datetime}=req.body;
    const trans=new trans({ name,price,description,datetime })
    const transaction= await Transaction.create(trans);
   
res.json(transaction);
});

app.get('/api/transactions',async (req,res)=>{  
     await mongoose.connect(process.env.MONGO_URL);
    const transactions=await Transaction.find();
    res.json(transactions);
});

app.listen(4000,()=>console.log('server started on port 4000'));