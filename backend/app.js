const express = require('express');
const app = express();
const path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');    //Extract data from Express

const port = 8000;

app.use(cors())


let test_api = require('./routes/test_api');


app.get('/', (req, res) => res.send('Response from Route of the Express Server!!'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/test_api', test_api);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


app.use(express.static('./public/index.html'));

module.exports = app;