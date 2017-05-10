var express = require('express');
var path = require('path');

//set constants for express
const port = process.env.PORT || 3000; //port used for Heroku, otherwise 3000
const publicPath = path.join(__dirname, './public');

//configure express and start listening
var app = express();
app.use(express.static(publicPath));
if (!module.parent) { app.listen(port, () => console.log(`Started up on port ${port}`)) }; //conditional statement prevents EADDRINUSE error when running mocha/supertest

//pull headers from req and send JSON object to client
app.get('/myinfo', (req, res) => {
    //line below sourced from http://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node/19524949#19524949
    let IpAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    let language = req.headers['accept-language'].split(',')[0];
    let software = req.headers['user-agent'];
    res.send({ IpAddress, language, software });
});
