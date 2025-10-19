import mongoose from 'mongoose';
const { Schema } = mongoose;


const RegisterSchema = new Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    poojaid:{type: Schema.Types.ObjectId,ref:'Pooja',required:true},
    date:{type:Date,required:true},
    day:{type:String,required:true},
    tokennumber:{type:Number,required:true},

}, { timestamps: true });

export default mongoose.model("Register",RegisterSchema );