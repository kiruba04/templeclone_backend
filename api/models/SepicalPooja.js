import mongoose from 'mongoose';

const { Schema } = mongoose;

const SpecialPoojaSchema = new Schema({
    poojaname: { type: String, required: true },
    poojaname_ta:{type:String},
    poojacharges: { type: Number, required: true },
    noofperson: { type: Number, required: true },
    token: { type: Number, required: true },
    items: { type: [String] },
    date: { type: Date, required: true },
    starttime: { type: String, required: true },
    endtime: { type: String, required: true },
    imageurls: { type: [String] } // Changed this line to an array of strings
}, { timestamps: true });

export default mongoose.model("SpecialPooja", SpecialPoojaSchema);
