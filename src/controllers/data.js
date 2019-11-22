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
        //let decodedImage = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');
        // newAtt.image.push.path(req.body.image);
        // newAtt.image.push.imageID(req.body.imageID);

        newAtt.image.path.push(req.body.image);
        newAtt.image.imageID.push(req.body.imageID);
    }
    
    if(req.body.type == "recording"){
    
       // let decodedRecording = Buffer.from(req.body.recording.indexOf('base64') !== -1 ? req.body.recording.split('base64,')[1] : req.body.recording, 'base64');
        newAtt.recording = req.body.recording;
        newAtt.recordingID = req.body.recordingID;
    }
    if(req.body.type == "video"){
    
        //let decodedVideo = Buffer.from(req.body.video.indexOf('base64') !== -1 ? req.body.video.split('base64,')[1] : req.body.video, 'base64');
        newAtt.video = req.body.video;
        newAtt.videoID = req.body.videoID;
    }
    
    
    let newentry = await newAtt.save();
    if(newentry){
        res.send(newentry);
    }
    
}else{

    if (req.body.type == "image"){
       // let decodedImage = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');
        checker.image.path.push(req.body.image);
        checker.image.imageID.push(req.body.imageID);

       
    }
    
    if(req.body.type == "recording"){
    
        //let decodedRecording = Buffer.from(req.body.recording.indexOf('base64') !== -1 ? req.body.recording.split('base64,')[1] : req.body.recording, 'base64');
        checker.recording = req.body.recording;
        checker.recordingID = req.body.recordingID;
    }
    if(req.body.type == "video"){
    
       // let decodedVideo = Buffer.from(req.body.video.indexOf('base64') !== -1 ? req.body.video.split('base64,')[1] : req.body.video, 'base64');
        checker.video = req.body.video;
        checker.videoID = req.body.videoID;
    }

let updated = await checker.save();
if(updated){
    res.send(updated);
}


}


})

api.get('/getByName/:complaintID', async (req,res) => {

    let findAttachment = await attachmentSchema.find({complaintsID:req.params.complaintID});

    if(findAttachment.length < 1){

        return res.status(400).send("Could not find attachments");
    }



let allData = [];
var i = 0;
//console.log(findAttachment[0].image.length);
if(findAttachment[0].image){

for(var items in  findAttachment[0].image){
    let name = findAttachment[0].complaintsID;
   let convertBase64ToString = await findAttachment[0].image[items].toString('base64');

let object = {complaintsID:name,image:convertBase64ToString };
allData.push(object);
}
}

if(findAttachment[0].video){
    let name = findAttachment[0].complaintsID;

    let VideoconvertBase64ToString = await findAttachment[0].video.toString('base64');
    let object = {complaintsID:name,video:VideoconvertBase64ToString};
    allData.push(object);
}

if(findAttachment[0].recording){
    let name = findAttachment[0].complaintsID;

    let RecordingconvertBase64ToString = await findAttachment[0].video.toString('base64');
    let object = {complaintsID:name,recording:RecordingconvertBase64ToString};
    allData.push(object);

}


//console.log(allData[0]);

//console.log(findAttachment[0].image[1].toString('base64'));

return res.send(allData);



})

    return api;

}