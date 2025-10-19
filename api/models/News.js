import mongoose from "mongoose"
import { Schema } from "mongoose"

const NewsSchema =new Schema(
    {
        newsheadlines_en :{type:String},
        newsheadlines_ta :{type:String},
    }
    ,{timestamps:true}
)

export default mongoose.model("News",NewsSchema);