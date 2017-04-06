const express = require('express');
const PORT = process.env.PORT || 3000; //used for heroku

//configure express app and start listening
var app = express();
app.use(express.static('./public'));
app.listen(PORT, () => console.log('Express server is up on port', PORT));

//pull headers from req and send JSON object to client
app.get('/myinfo', (req, res) => {
    //line below sourced from http://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node/19524949#19524949
    let IpAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    let language = req.headers['accept-language'].split(',')[0];
    let software = req.headers['user-agent'];
    res.send({ IpAddress, language, software });
});
