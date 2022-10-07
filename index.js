const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get("/", (req,res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})

app.get("/api", (req,res) => {
    let date_now = Date.now();
    let unix = new Number(date_now);
    let d = new Date()
    let utc = new Date(unix).toUTCString();

    res.json({
        unix:unix,
        utc:utc
    })
})


app.listen(80);