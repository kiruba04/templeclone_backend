import express  from "express"
import mongoose  from "mongoose"
import bodyParser from 'body-parser';
import { sendOTP, verifyOTP } from './controller/otp.js';
import dotenv  from "dotenv"
import cookie from 'cookie-parser';
import cors from 'cors';
import authRoutes from './Router/authRouter.js';
import poojaRoutes from './Router/poojaRouter.js';
import registerRoutes from './Router/registerRoutes.js'
import userRoutes from './Router/userRouter.js'
import specialPoojaRoutes from './Router/specialPoojaRoutes.js';
import ThirukalayanamRoutes from "./Router/thirukalayanamRoutes.js";
import specialregister from "./Router/specialregisterRoutes.js"
import volunteer from "./Router/volunteerRouter.js";
import specialdevotee from "./Router/specialdevoteeroute.js"
import uthchavamRoutes from './Router/uthchavamRoutes.js'; 
import sendRoutes from './Router/sendRoutes.js';
import imageRoutes from './Router/imageRoutes.js';
import newsRoutes from './Router/newsRouter.js';
import categoryRoutes from './Router/categoryRoutes.js';
import subCategoryRoutes from './Router/subCategoryRoutes.js';
import itemRoutes from './Router/itemRoutes.js';
import managementRoutes from './Router/managementRoutes.js';
import TrusteeRoutes from './Router/trusteeRouter.js';
import feedbackRoutes from './Router/feedbackRoutes.js';
import responseRoutes from './Router/responseRoutes.js';

const app = express()
dotenv.config();

/* middle ware*/
app.use(express.json())
app.use(cors({
    origin: process.env.React,
    credentials: true
  }));

app.use(cookie());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.React); // Replace with your actual frontend URL
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });



//router 
app.use('/api/auth', authRoutes);
app.use('/api/poojas', poojaRoutes);
app.use('/api', registerRoutes);
app.use('/api/users',userRoutes);
app.use('/api/specialPoojas',specialPoojaRoutes);
app.use('/api/thirukalayanam',ThirukalayanamRoutes);
app.use('/api/specialregister', specialregister );

//Register
app.use('/api/volunteer',volunteer);
app.use('/api/specialdevotee',specialdevotee);
app.use('/api/trustee',TrusteeRoutes);

app.use('/api/uthchavams', uthchavamRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/news',newsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/response', responseRoutes);

// Inventory
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/items', itemRoutes); 
app.use('/api/management', managementRoutes); 

// Send images
app.use('/api', sendRoutes);
app.post('/api/auth/send-otp', sendOTP);
app.post('/api/auth/verify-otp', verifyOTP);

/*mongose port*/

const connect =async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
      } catch (error) {
        throw error;
      }
    };
    mongoose.connection.on("disconnected",()=>{
      console.log("mongoDB disconnected")
    })

    app.listen(8800, async () => {
      try {
        await connect();
        console.log("Server running on port 8800");
      } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1); // Exit if MongoDB connection fails
      }
    });
    
