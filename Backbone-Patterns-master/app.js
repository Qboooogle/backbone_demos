var express = require('express');
var app = express();

require('./enviroment.js')(app, express);
require('./server/config/routes.js')(app);

app.listen( process.env.VCAP_APP_PORT || 8888 );