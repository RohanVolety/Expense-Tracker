const mongoose=require('mongoose');
const {Schema,model}=mongoose;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});


const TransactionSchema=new Schema({
 
  name:{type:String,required:true,unique:true},
   price:{type:Number,required:true,unique:true},  
   description:{type:String,required:true,unique:true},
    datetime:{type:Date,required:true,unique:true},
});


const TransactionModel=model("Transaction",TransactionSchema);

module.exports=TransactionModel;

