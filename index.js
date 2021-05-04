const { urlencoded } = require('express');
const express=require('express');
const path=require('path')
const port = 8000;
const db= require('./config/mongoose');
const { findByIdAndDelete } = require('./modals/contact');
const Contact=require('./modals/contact');
const app= express();
var contactList=[
    {
        name:"sanskar",
        phone:"2391281093"
    },
    {
        name:"bchbc",
        phone:"21271283"
    },
    {
        name:"dhgsbdj",
        phone:"216282380"
    }
]
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
        console.log("error!!!")
        }
        else{
        return res.render('contact_list',{ 
            title: "Contact List",
            contact_list:contacts
        });
    }
    });
   
});
app.get('/play',function(req,res){
    return res.render('play',{ title: "playground"});
 });
app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
if(err){
console.log("ERROR OCCURED");
}
console.log("***************",newContact);
return res.redirect('/');
    })
});
app.get('/delete-contact',function(req,res){
let id=req.query.id;
Contact.findByIdAndDelete(id,function(err){
    if(err){
        console.log("error");
        return;
    }
    console.log("DELETED!!!!")
    return res.redirect('back');
});
// let phone=req.params.phone;
// console.log(phone);
// let contactIndex= contactList.findIndex(contact=>contact.phone==phone);
// if(contactIndex!=-1){
//     contactList.splice(contactIndex,1);
//     console.log("deleted")
//     return res.redirect('back');
// }

});
app.listen(8000,function(err){
    if(err){
        console.log("oops error occured!!",err);
    }
    else{
        console.log("success!!",port);
    }
});