const express               = require('express');
const router                = express.Router();
const bodyParser            = require('body-parser');
const webthief                = require('webthief');
const bvalid                = require("bvalid");

router.get('/', function(req, res)
{   
  res.send("server is working");
});

router.post('/get_html', function(req, res)
{   
  var msg = "Invalid option";
  if(bvalid.isObject(req.body) && bvalid.isString(req.body.url)){
    webthief.getHtml(req.body.url,(data)=>{
      res.send(data);
    })
  }else{
    res.send({
      success : false,
      detail : msg
    });
  }
});

router.post('/get_meta', function(req, res)
{
  var msg = "Invalid option";
  var option = {
    fields: ["*"]
  };
  if(bvalid.isObject(req.body) && bvalid.isString(req.body.url)){
    webthief.getMeta(req.body.url,option,(data)=>{
      res.send(data);
    })
  }else{
    res.send({
      success : false,
      detail : msg
    });
  }
});


router.post('/get_images', function(req, res)
{
  var msg = "Invalid option";
  if(bvalid.isObject(req.body) && bvalid.isString(req.body.url)){
    webthief.getSiteImages(req.body.url,(data)=>{
      res.send(data);
    })
  }else{
    res.send({
      success : false,
      detail : msg
    });
  }
});

module.exports = router;