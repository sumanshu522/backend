const express = require("express")
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config()

const router = express.Router();


router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {

    const { prompt } = req.body;
    const options = {
        method: 'POST',
        url: 'https://ai-image-generator3.p.rapidapi.com/generate',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API,
            'X-RapidAPI-Host': 'ai-image-generator3.p.rapidapi.com'
        },  
        data: {
            prompt: prompt,
            page: 1
        }
    };


    try {
        const {data} = await axios.request(options);
        const imageList = data.results.images
        res.status(200).json(imageList);
    } catch (error) {
        console.error(error);
    }
});


module.exports = router