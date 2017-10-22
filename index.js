const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

// import environmental variables from variables.env file
require('dotenv').config({ path: 'variables.env' });

// mongoose models
require('./models/User');
require('./models/Bar');

//services e.g. passport
require('./services/passport');

// Connect to our database and handle a bad connections
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🚫 ❗️🚫 ❗️🚫 ❗️🚫 ❗️→ ${err.message}`);
});

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')))

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

// initialize passport and enable persistent login sessions
app.use(passport.initialize());
app.use(passport.session());

// parses json where the content-type header matches the json type
app.use(bodyParser.json());

require('./routes/authRoutes')(app);
require('./routes/searchRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'));
  });
}

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () =>
  console.log(`express server listening on port ${server.address().port}`)
);
