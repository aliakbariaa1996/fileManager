const express = require('express');
const app = express();
const cors = require('cors');
const nocache = require('nocache');
const useragent = require('express-useragent');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
global.configApp = require('./modules/config/app');

//database connection
mongoose.connect(`${process.env.DB_PROTOCOL_MONGODB + process.env.DB_USER_NAME_MONGODB + ':' + process.env.DB_PASSWORD_MONGODB + '@' + process.env.DB_HOST_NAME_MONGODB + process.env.DB_PORT_MONGODB}/${process.env.DB_DATA_BASE_NAME_MONGODB}?authSource=admin`, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

app.use(cors());
app.use(nocache());
app.use(useragent.express());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ defaultCharset: 'utf-8' }));

app.use(expressValidator());
app.use('/public', express.static('public'));

// require router
const { api: routeApiPath } = configApp.paths.routes;
const apiRouter = require(`${routeApiPath}/router`);

app.use('/api', apiRouter);

var server = app.listen(process.env.PORT_SERVER, () => {
    console.log(`Server running at port ${process.env.PORT_SERVER}`);
});
server.timeout = 100000;