import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectdb from './mongodb/connect.js';
import dalleRoutes from './routes/dalle.js';
import postRoutes from './routes/post.js';
dotenv.config();
const app = express();
const startserver = () =>{
    try{
        app.listen(5000, ()=> console.log("App is listening on 5000!"));
        connectdb(process.env.MONGODB_URL);
    }catch(err){
        console.log(err);
    }
}
startserver();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/post', postRoutes);
app.get('/', (req,res) => {
    res.send("Hello from DALL-E AI")
})

