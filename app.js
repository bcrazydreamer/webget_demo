const express                 = require("express");
const app                     = express();
const path                    = require('path');
const bvalid                  = require("bvalid");
const port                    = process.env.PORT || 3000;
const bodyParser              = require('body-parser');
const index                   = require('./routes/Index');

var originReg = /((?:https?:\/\/)nepsho.github.io(?:\/\S*)?)|((?:https?:\/\/)bcrazydreamer.github.io(?:\/\S*)?)/;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if(req && req.headers && bvalid.isString(req.headers["origin"])){
    if(!originReg.test(req.headers["origin"])){
      return res.status(404).end();
    }
  } else {
    return res.status(404).end();
  }
  res.setHeader('Access-Control-Allow-Origin', req.headers["origin"]);
  // res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(express.static(path.join(__dirname,"public")));
app.use('/', index);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send("Not found");
});


app.listen(port);