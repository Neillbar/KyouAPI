var mongoose = require('mongoose');
var {Router} = require('express');
var newUser = require('../Schemas/UsersSchema');
var md5 = require('md5');



async function  registerUserFunction(req,res){

    let password = md5(req.body.password);

    let newuser = new newUser();
    newuser.name = req.body.name;
    newuser.phoneNumber = req.body.phoneNumber;
    newuser.language = req.body.language;
    newuser.idNumber = req.body.idNumber;
    newuser.email = req.body.email;
    newuser.password = password;
    
    
    
    let findUser = await newUser.find({idNumber:req.body.idNumber});
    console.log(findUser);
    if(findUser.length > 0){
    return res.status(400).send("user already exists");
    
    }
    
    
    
    let savedUser = await newuser.save();
    
    res.send(savedUser);
    
    
    


}//registerUserFunction

async function LoginUser(req,res){

let User = await  newUser.findOne({idNumber: req.body.idNumber});

if(!User){
    return res.status(400).send("user does not exist");
}

if(User.email !== req.body.email){
return res.status(400).send("Email does not exists in the database");

}

if(User.password !== md5(req.body.password)){

    return res.status(400).send("Password is incorrect");

}

res.send(User);



}//LoginUser

module.exports = ({config,db}) => {

let api = Router();

api.post('/register',async (req,res) => {
    registerUserFunction(req,res);

})

api.post('/login',async (req,res) => {

    LoginUser(req,res);
});






return api;









}//exporting