const express = require('express');
const PORT = process.env.PORT || 3000; //used for heroku

var app = express();
app.use(express.static('./public'));
app.listen(PORT, () => console.log('Express server is up on port', PORT));

app.get('/headers', (req, res) => {
    //console.log(req.headers);
    let ipaddress = req.headers['x-real-ip'] || req.connection.remoteAddress;
    res.send({
        ipaddress,
        language: req.headers['accept-language'],
        software: req.headers['user-agent']        
    });
});