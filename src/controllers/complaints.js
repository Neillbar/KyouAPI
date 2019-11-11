var mongoose = require('mongoose');
var { Router } = require('express');
var complaintScheme = require('../Schemas/complaintsSchema');
var users = require('../Schemas/UsersSchema');
var uniqid = require('uniqid');
//var attachments = require('../Schemas/attachmentsSchema');


async function addComplaint(req,res){

let findUser = await users.findOne({idNumber: req.body.loggedBy});
    let randomID = uniqid();
    var newComplaint = new complaintScheme();
    newComplaint.complaintID = randomID;
    newComplaint.loggedBy = req.body.loggedBy;
    newComplaint.hospID = req.body.hospID;
    newComplaint.type = req.body.type;
    newComplaint.complaintText = req.body.complaintText;
    newComplaint.progress = req.body.progress;
    findUser.complaints.push(randomID);
    newComplaint.attachments = req.body.attachments;
    let savedComplaint = await newComplaint.save();  
    let SaveComplaintToUser = await findUser.save();

    if(savedComplaint && SaveComplaintToUser ){
        return res.status(200).json({message:"Success",ComplaintID: randomID});

    }else{
        return res.status(400).send({message:"Failure Saving Data"});

    }


}

async function getComplaintByID(req,res){

let findSpeseficComplaint = await complaintScheme.findOne({complaintID:req.params.compid});

if(!findSpeseficComplaint){
    return res.status(400).send("No Complaint found");
}

res.status(200).json(findSpeseficComplaint);

}

async function getallComplaintsForUser(req,res){
userID = req.params.userID;

let findComplaints = await complaintScheme.find({loggedBy: userID});

if(findComplaints.length < 1){
    return res.status(400).send("No complaints found for this user");
}

res.status(200).json(findComplaints);


}




module.exports = ({ config, db }) => {

    let api = Router();

    api.post('/add',(req,res) => {
        addComplaint(req,res);
    })

api.get('/getOneByID/:compid',(req,res) => {
    getComplaintByID(req,res)
})

api.get('/getAllComplaintsPerUser/:userID',(req,res) => {

    getallComplaintsForUser(req,res);


})

    return api;

}