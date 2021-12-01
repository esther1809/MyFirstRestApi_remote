/*
 * required external modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const peopleRouter = require('./routes/peopleRoute');

/*
 * connect to db
 */

mongoose.connect('mongodb://localhost:27017/people', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(console.log("connect to db people!!"))

/*
 * app variables
 */
const app = express();
const port = 3000;

/*
 * app configuration
 */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/people',peopleRouter);

/*
 * routes definitions
 */
app.get("/", (req, res) => {
    res.status(200).send("welcome");
  });

/*
 * Server Activation
 */
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });  


module.exports = app;
