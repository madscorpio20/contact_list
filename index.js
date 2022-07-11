const express = require('express');
const path = require('path');
const port = 8000;
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));

var contactList = [
    {
        name: 'Madhav kumar',
        phone: '766397306'
    },
    {
        name: 'Padhi',
        phone: '7389804793'
    },
    {
        name: 'Jayesh',
        phone: '7470475727'
    }
]
app.get('/', (req,res)=>{
    Contact.find({},(err,contacts)=>{
        if(err){
            console.log('Error in fetching contacts from DB');
            return;
        }

    return res.render('home', {
         title: "My contct list",
         contact_list : contacts
        });
    });
});
app.get('/practice', (req,res)=>{
    return res.render('practice', {
        title:"let's play with ejs"
    });
});

app.post('/create-contact',(req,res)=>{
   // contactList.push(req.body);
   Contact.create({
       name: req.body.name,
       phone: req.body.phone
   },(err,newContact)=>{
       if(err){
           console.log('error in creating contact')
           return;
       }
       console.log('******',newContact);
   })
    return res.redirect('back');
})

app.get('/delete-contact',(req,res)=>{
    let id = req.query.id;
    Contact.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log('error in deleting an object from DB');
            return;
        }
        return res.redirect('back');
    })
})

app.listen(port, (err)=>{
    if(err)
    {
        console.log('error in running the server', err);
    }
    console.log('express server is running on port:', port);
});