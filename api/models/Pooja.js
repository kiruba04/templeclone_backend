import mongoose from 'mongoose';
const { Schema } = mongoose;

const AppointmentSlotSchema = new Schema({
  Day: { type: String, required: true }, // e.g., 'Friday'
  available: { type: Boolean, default: false },
  startTime: { type: String }, // e.g., '09:00 AM'
  endTime: { type: String }, // e.g., '05:00 PM'
  availaableslots: { type: Number }
}, { timestamps: true });

const PoojaSchema = new Schema({
  poojaname: { type: String, required: true },
  poojacharges: { type: Number, required: true },
  noofperson:{type:Number,required:true},
  items:{type:[String]},
  availableAppointments: [AppointmentSlotSchema]
}, { timestamps: true });

export default mongoose.model("Pooja", PoojaSchema);
