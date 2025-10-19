import mongoose from 'mongoose';

const { Schema } = mongoose;

const ThirukalayanamSchema = new Schema({
    poojaname: { type: String, required: true },
    poojacharges: { type: Number, required: true },
    noofperson: { type: Number, required: true },
    items: { type: [String] },
    date: { type: Date, required: true, unique: true },
    starttime: { type: String, required: true },
    endtime: { type: String, required: true },
    devotename: { type: String, required: true },
    phone: { type: Number, required: true }
});

const Thirukalayanam = mongoose.model('Thirukalayanam', ThirukalayanamSchema);

export default Thirukalayanam;
