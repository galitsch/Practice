const express = require('express');
const cloudinary = require('cloudinary').v2;
const formData = require('express-form-data');
const cors = require('cors');

const app = express();
const port = 3000;

// Replace with your Cloudinary details
cloudinary.config({
    cloud_name: 'newsch',
    api_key: '594518288126297',
    api_secret: '7ZPMSPz1giL6ZyxN1I1s3DNoI7Y'
});

app.use(cors());
app.use(formData.parse());

app.post('/upload', (req, res) => {
    const values = Object.values(req.files);
    const promises = values.map(image =>
        cloudinary.uploader.upload(image.path)
    );

    Promise
        .all(promises)
        .then(results => res.json(results))
        .catch((err) => res.status(400).send(err));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
