const express               = require('express');
const router                = express.Router();
const bodyParser            = require('body-parser');
const webget                = require('webget');
const bvalid                = require("bvalid");

router.get('/', function(req, res)
{   
  res.send("server is working");
});

router.post('/get_html', function(req, res)
{   
  var data = "please enter url firt";
  if(bvalid.isObject(req.body) && bvalid.isString(req.body.url)){
    webget.gethtml(req.body.url,(data)=>{
      res.send(data);
    })
  }else{
    res.send(data);
  }
});

router.post('/get_meta', function(req, res)
{
  var data = "please enter url firt";
  var option = {
    fields: ["*"]
  };
  if(bvalid.isObject(req.body) && bvalid.isString(req.body.url)){
    webget.getmeta(req.body.url,option,(data)=>{
      res.send(data);
    })
  }else{
    res.send(data);
  }
});

module.exports = router;