console.log('hello, Node.js');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('welcome to my Node.js app!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
