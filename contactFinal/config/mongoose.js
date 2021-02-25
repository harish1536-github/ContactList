//require the library
//importing packages mongoose
const mongoose = require('mongoose');

//connect to the database
//contact_list_db is database name
//uses connect fundtion to connect to db
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection(to check if it's successful)
//connection gives us action to db
const db = mongoose.connection;

//error
//console.error.bind is same as console.log just it will print error
//to check error as javascript is event driven language
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
//if connection  is succesfull
//once is defined function in db means this connection 
//is open to interact withh db 
db.once('open', function() {
    
    console.log("Successfully connected to the database");
    
});