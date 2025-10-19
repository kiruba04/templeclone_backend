import mongoose from 'mongoose';
const { Schema } = mongoose;

const  TrusteeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    lastname:{type:String},
    password: { type: String, required: true },
    dateOfBirth:{type:Date},
    email:{type:String},
    isedit:{type:Boolean,default:false},
    phone:{type:Number,required:true, unique: true},
    address:{type:String,required:true},
  },
  {timestamps:true});
  
  export default mongoose.model("Trustee",TrusteeSchema )