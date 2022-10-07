const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')));

const dateIsValid = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateStr.match(regex) === null) return false;
    const date = new Date(dateStr);
    const timestamp = date.getTime();
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return false;
    return date.toISOString().startsWith(dateStr);
}

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})

app.get("/api", (req, res) => {
    let date_now = Date.now();
    let unix = new Number(date_now);
    let d = new Date()
    let utc = new Date(unix).toUTCString();

    res.json({
        unix: unix,
        utc: utc
    })
})

app.get("/api/:date", (req, res) => {
    var date = new Number(req.params.date);
    console.log(req.params.date);
    if (!isNaN(date)) {

        let unix = date;
        let utc = new Date(unix).toUTCString();
        res.json({
            unix: unix,
            utc: utc
        })
    } else if (dateIsValid(req.params.date)) {

        date = new Date(req.params.date)
        let unix = date.getTime();
        let utc = date.toUTCString();
        res.json({
            unix: unix,
            utc: utc
        })
    } else {

        res.json({
            error: 'Invalid Date'
        })
    }
})




app.listen(80);