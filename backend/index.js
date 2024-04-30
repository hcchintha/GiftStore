const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json())
const data = require('./products.json')
app.use(cors());

// REST API to get all products details at once
// Add ons: We can add modify functions here
app.get("/api/products", (req, res) => {
    res.json(data)
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});