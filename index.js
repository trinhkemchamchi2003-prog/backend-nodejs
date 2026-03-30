const express = require('express');
const cors = require('cors');
const initRoutes = require('./src/routes/index.route');
const { configWriteLog } = require('./src/config/writeLog.config');
require('dotenv').config();
require('./src/database/connect_db');

const app = express();

// WRITE LOG
configWriteLog(app);

// CONFIG CORS
const allowOrigins = [process.env.CLIENT_URL1, process.env.CLIENT_URL2, process.env.CLIENT_URL3];
app.use(
  cors({
    origin: allowOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// CONFIG REQUEST DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTE
initRoutes(app);

// START SERVER
const PORT = process.env.PORT || 8080;

const listerner = app.listen(PORT, () => {
  console.log('Server is running on the port ' + listerner.address().port);
});
