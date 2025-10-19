import mongoose from 'mongoose';

const { Schema } = mongoose;

const ImageSchema = new Schema ({
    url: String,    
},
{timestamps:true});

export default mongoose.model("Image",ImageSchema);