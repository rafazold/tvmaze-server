const express = require('express');
const bodyParser = require('body-parser');
const showsRoutes = require('./routes/shows');
const castRoutes = require('./routes/cast');
const seasonsRoutes = require('./routes/seasons');

const app = express();

app.use(bodyParser.json());



app.use((req, res, next) => {
    console.log(`CALL: ${req.method} - ${req.url}`);
    next();
});

showsRoutes(app);
castRoutes(app);
seasonsRoutes(app);

app.listen(3000, () => {
    console.log('server is up')
});