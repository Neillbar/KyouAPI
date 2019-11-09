var mongoose = require('mongoose');
var {Router} = require('express');


module.exports = ({config,db}) => {

    let api = Router();

api.post('/attachment',async (req,res) => {

    let decodedFile = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');

    let subStr = req.body.image.indexOf('image/')
    let newSubstr = req.body.image.indexOf('base64')
    let tell = req.body.image;
    let imageType = tell.substring(subStr+6, newSubstr)

console.log(decodedFile);

})



    return api;

}