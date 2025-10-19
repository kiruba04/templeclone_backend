import mongoose from 'mongoose';

const { Schema } = mongoose;

const UthchavamSchema = new Schema({
    poojaname: { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    imageurls: { type: [String], required: true } // Changed this line to an array of strings
}, { timestamps: true });

export default mongoose.model("Uthchavam", UthchavamSchema);