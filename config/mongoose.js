//require the library 
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1/contacts_list_db');

//aquire the connection(to check if it's working properly)
const db = mongoose.connection;

//if error
db.on('error',console.error.bind(console,'error connecting to db'));

//if up and running then print the msg
db.once('open',()=>{
    console.log('successfully connected to database');
});