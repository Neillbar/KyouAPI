var mongoose = require('mongoose');
var {Router} = require('express');
const image2base64 = require('image-to-base64');
var attachmentSchema = require('../Schemas/attachmentsSchema');
const fs = require('fs');

module.exports = ({config,db}) => {

    let api = Router();


    api.post('/viaFilesystem',async (req,res) => {
        let decodedFile = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');
        name = req.body.name;
        fs.writeFile(`./images/${name}`, decodedFile, function(err,written){
        if(err) console.log(err);
         else {
          console.log("Successfully written");
         }
     });

    })




api.post('/attachment',async (req,res) => {
//take base64 to Buffer
let decodedFile = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');
    

let checker = await attachmentSchema.findOne({name: req.body.name});

if(!checker){
    var newAtt = new attachmentSchema();
    newAtt.name = req.body.name;
    newAtt.image.push(decodedFile);
    let newentry = await newAtt.save();
    if(newentry){
        res.send(newentry);
    }
    
}else{

checker.image.push(decodedFile);

let updated = await checker.save();
if(updated){
    res.send(updated);
}


}



//take Buffer back to base64

//let text = decodedFile.toString('base64')

     //let subStr = req.body.image.indexOf('data/')
    // let newSubstr = req.body.image.indexOf('base64')
    // let tell = req.body.image;
    // let imageType = tell.substring(subStr+6, newSubstr)

   // console.log(subStr);
    // console.log(tell);
    // console.log(tell);
    // console.log(imageType);


//take base64 to a file! 
    // fs.writeFile('test.png', decodedFile, function(err,written){
    //     if(err) console.log(err);
    //      else {
    //       console.log("Successfully written");
    //      }
    //  });

    // take file back to base64
//let file = image2base64('./test.png');

//console.log(await file);

})

api.get('/getByName/:name', async (req,res) => {

    let findAttachment = await attachmentSchema.find({name:req.params.name});

    if(findAttachment.length < 1){

        return res.status(400).send("Could not find attachments");
    }



let allData = [];
var i = 0;
//console.log(findAttachment[0].image.length);
for(var items in  findAttachment[0].image){
    
    let name = findAttachment[0].name;
   
   let convertBase64ToString = await findAttachment[0].image[items].toString('base64');

let object = {name:name,image:convertBase64ToString };
allData.push(object);
}
//console.log(allData[0]);

//console.log(findAttachment[0].image[1].toString('base64'));

return res.send(allData);



})

    return api;

}