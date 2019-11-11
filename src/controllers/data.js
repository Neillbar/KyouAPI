var mongoose = require('mongoose');
var {Router} = require('express');
const image2base64 = require('image-to-base64');
var attachmentSchema = require('../Schemas/attachmentsSchema');
var complaintSchema = require('../Schemas/complaintsSchema');
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

let FindComplaint = await complaintSchema.findOne({complaintID: req.body.complaintID});

if(!FindComplaint){
    return res.status(400).send("No complaints found can't add attachments");
}



// //take base64 to Buffer



    

let checker = await attachmentSchema.findOne({complaintsID: req.body.complaintID});

if(!checker){
    var newAtt = new attachmentSchema();
    newAtt.complaintsID = req.body.complaintID;
    
    if (req.body.type == "image"){
        let decodedImage = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');
        newAtt.image.push(decodedImage);
    }
    
    if(req.body.type == "recording"){
    
        let decodedRecording = Buffer.from(req.body.recording.indexOf('base64') !== -1 ? req.body.recording.split('base64,')[1] : req.body.recording, 'base64');
        newAtt.recording = decodedRecording;
    }
    
    
    let newentry = await newAtt.save();
    if(newentry){
        res.send(newentry);
    }
    
}else{

    if (req.body.type == "image"){
        let decodedImage = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');
        checker.image.push(decodedImage);
    }
    
    if(req.body.type == "recording"){
    
        let decodedRecording = Buffer.from(req.body.recording.indexOf('base64') !== -1 ? req.body.recording.split('base64,')[1] : req.body.recording, 'base64');
        checker.recording = decodedRecording;
    }

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