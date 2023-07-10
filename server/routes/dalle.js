import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
const router = express.Router();
router.route('/').get((req,res) => {
    res.send("Hello from DALL-E")
})

router.route('/').post(async (req,res) => {
    try {
        const { prompt } = req.body;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': 'a7e2ee501dmshef83cd9f420c277p1df453jsn6aede9d6a06a',
                'X-RapidAPI-Host': 'ai-image-generator3.p.rapidapi.com'
            },
            body: `{"prompt":"${prompt}","page":1}`
        };
        const result =  await fetch("https://ai-image-generator3.p.rapidapi.com/generate",options);
        const data = await result.json();
        res.send(data);
    } catch (error) {
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
        console.log(error?.response.data.error.message)
    }
})
    
export default router;