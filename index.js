import express from 'express'
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';

import assistantRouter from './routes/assistant.js';


dotenv.config();
const app = express();

const port = process.env.PORT || 8000

app.get('/', (req,res) => {
    res.send('API is working!')
})

mongoose.set('strictQuery', false);
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB is connected successfully");
    }catch(e){
        console.log('Error at connecting MongoDB =>', e)
    }
}



app.use(express.json())
app.use(cors());

app.use('/api/v1/assistant', assistantRouter);

app.listen(port, () => {
    connectDB();
    console.log('Server running on port =>', port);
})