//require library
const mongoose = require ('mongoose');
//connecting mongoose to db
mongoose.connect('mongodb://localhost/contact_list_db');
//acquire the connection(to check it's status)
const db= mongoose.connection;
//if error in connection
db.on('error',console.error.bind('console','error connecting to db'));
//if all good
db.once('open',function(){
    console.log("Successfully connected to db");
})