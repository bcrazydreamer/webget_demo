const express               = require('express');
const router                = express.Router();
const bodyParser            = require('body-parser');
const webthief                = require('webthief');
const bvalid                = require("bvalid");

const timer_time = 15000;
const timeoutmsg = "Timeout! This site takes too much time, or may be server down";

router.get('/', function(req, res)
{   
  res.send("server is working");
});

router.post('/get_html', function(req, res)
{   
  var msg = "Invalid option";
  var tf = true;
  if(bvalid.isObject(req.body) && bvalid.isString(req.body.url)){

    var timer = setTimeout(function () {
        tf = false;
        return res.send({
          success : false,
          detail : timeoutmsg
        });
    }, timer_time);

    webthief.getHtml(req.body.url,(data)=>{
      clearTimeout(timer);
      if(tf)
        return res.send(data);
    });

  }else{
    return res.send({
      success : false,
      detail : msg
    });
  }
});

router.post('/get_meta', function(req, res)
{
  var msg = "Invalid option";
  var tf = true;
  var option = {
    fields: ["*"]
  };
  if(bvalid.isObject(req.body) && bvalid.isString(req.body.url)){
    var timer = setTimeout(function () {
        tf = false;
        return res.send({
          success : false,
          detail : timeoutmsg
        });
    }, timer_time);
    webthief.getMeta(req.body.url,option,(data)=>{
      clearTimeout(timer);
      if(tf)
        return res.send(data);
    })
  }else{
    return res.send({
      success : false,
      detail : msg
    });
  }
});


router.post('/get_images', function(req, res)
{
  var msg = "Invalid option";
  var tf = true;
  if(bvalid.isObject(req.body) && bvalid.isString(req.body.url)){
    var timer = setTimeout(function () {
        tf = false;
        return res.send({
          success : false,
          detail : timeoutmsg
        });
    }, timer_time);
    webthief.getSiteImages(req.body.url,(data)=>{
      clearTimeout(timer);
      if(tf)
        return res.send(data);
    })
  }else{
    return res.send({
      success : false,
      detail : msg
    });
  }
});

module.exports = router;