import mongoose from 'mongoose';
const { Schema } = mongoose;

const VolunteerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    lastname:{type:String},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    dateOfBirth:{type:Date},
    email:{type:String},
    phone:{type:Number,required:true, unique: true},
    address:{type:String,required:true},
  },
  {timestamps:true});
  
  export default mongoose.model("Volunteer",VolunteerSchema)