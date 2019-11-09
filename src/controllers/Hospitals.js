var mongoose = require('mongoose');
var {Router} = require('express');
newhospSchema = require('../Schemas/hospitalSchema');



async function addNewHospital(req,res){

//add new hospital 

newHosp = new newhospSchema();
newHosp.name = req.body.name;
newHosp.latitude = req.body.latitude;
newHosp.longitude = req.body.longitude;
newHosp.description = req.body.description;


let checkHosp = await newhospSchema.findOne({name:req.body.name});

if(checkHosp){
return res.status(400).send("Hospital is already on the list");
    
}

let savedHosp = await newHosp.save();

res.status(200).send(savedHosp);

} //addNewHospital

async function getOneHospital(req,res){

let hospitalID = req.params.id;

let findHosp = await newhospSchema.findOne({_id:hospitalID});

if(!findHosp){
    return res.status(400).send("No hospital Found");
}

res.status(200).send(findHosp);


}//getOneHospital




async function getAllHospitals(req,res){

    let findHosp = await newhospSchema.find({});

    if(findHosp.length < 1){
        return res.status(400).send("No hospital Found");
    }
    
    res.status(200).send(findHosp);

}


module.exports = ({config,db}) => {

    let api = Router();
    
  api.post('/new',async(req,res) => {

    addNewHospital(req,res);


  })

  api.get('/getone/:id',async (req,res)=> {

    getOneHospital(req,res);

  })

  api.get('/getall',async (req,res) => {

    getAllHospitals(req,res);

  })
    
    
    return api;
    
    }//exporting