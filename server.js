const express = require('express');
//const requestIp = require('request-ip');
const PORT = process.env.PORT || 3000; //used for heroku

var app = express();
app.use(express.static('./public'));
//app.use(requestIp.mw());
//app.use((req, res)=> {
//    var ip = req.clientIp;
//    res.end(ip);
//});

app.listen(PORT, () => console.log('Express server is up on port', PORT));

app.get('/headers', (req, res) => {
    //console.log(req.headers);
    let ipaddress = req.headers['X-Client-IP'] || req.connection.remoteAddress;
    res.send({
        ipaddress,
        language: req.headers['accept-language'],
        software: req.headers['user-agent']        
    });
});
