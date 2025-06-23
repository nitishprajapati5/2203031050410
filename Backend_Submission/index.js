import express from "express";
import Logging_Middleware from "./middleware/Logging_Middleware.js";

const app = express();
const PORT = 3000;

// Middleware to log requests
app.use(Logging_Middleware);

// Middleware to parse JSON request bodies
app.use(express.json());

const userdata = [];

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Route to create a new short URL
app.post("/url",Logging_Middleware, (req, res) => {
    try {
        const { url, validity, shortcode } = req.body;

        const code = shortcode || generateRandomString(6);

        const exists = userdata.find(item => item.shortcode === code);
        if (exists) {
            return res.status(409).json({ message: "Shortcode already exists" });
        }

        const creationTimestamp = Date.now();
        const expiryTimestamp = creationTimestamp + (validity || 30) * 10000;

        const shortLink = `http://localhost:${PORT}/${code}`;

        const data = {
            shortcode: code,
            originalURL: url,
            shortLink,
            creationTimestamp,
            expiryTimestamp,
            clicks: 0
        };

        userdata.push(data);

        console.log("Current Data:", userdata);

        return res.status(201).json({
            shortLink,
            expiry: new Date(expiryTimestamp).toISOString()
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/url/:shortcode",Logging_Middleware, (req, res) => {
    try {
        const { shortcode } = req.params;

        const data = userdata.find(item => item.shortcode === shortcode);
        if (!data) {
            return res.status(404).json({ message: "Shortcode not found" });
        }

        const currentTime = Date.now();
        if (currentTime > data.expiryTimestamp) {
            return res.status(410).json({ message: "Shortcode has expired" });
        }

       
        data.clicks += 1;

        // {
        //     "data": {
        //         "shortcode": "abcd1",
        //         "originalURL": "https://excalidraw.com/",
        //         "shortLink": "http://localhost:3000/abcd1",
        //         "creationTimestamp": 1750666768422,
        //         "expiryTimestamp": 1750666798422,
        //         "clicks": 1
        //     }
        // }

        return res.json({
            shortcode:data.shortcode,
            originalURL:data.originalURL,
            shortLink:data.shortLink,
            creationTimestamp:new Date(data.creationTimestamp).toISOString(),
            expiryTimestamp:new Date(data.expiryTimestamp).toISOString(),
            clicks:data.clicks

        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
