const express = require('express');
// importing path module
const path = require('path');
const port = 8000;

//use express router
//putting a middleware
//



//./means all the parellel folders are there in the same path 
const db = require('./config/mongoose');
const Contact =require('./models/contact');
//app has all functions of express 
const app = express();


//will set up  engine and created property 
//view engine and give it a value ejs 
//we need to tell where are we going to place vies 

//here i am setting value with a property ejs



//meaning of this is that we are using ejs template and it 
// will load it internally
app.set('view engine', 'ejs');




//__dirname global variable makes it dynamic we dont have to change it again and again
//it will automatically pick it.
//whenever need to refence  VIEW FILE it will look out in folder view
//inside dirname name which is Users\Harish\Desktop\0000000000001539\contactFinal\views 


//set the path where we are placing views in folder in dirname
//assing dirname to folder in which view is placed
app.set('views', path.join(__dirname, './views'));//joining two paths  path.join is a function will make this dynamic
//this use signifies middleware because parser is put 
//in the middle of before controller acess it
app.use(express.urlencoded());
//static files use middleware
//go and find out in my directory find out folder called assets 
//and have multiple folder for css,js,images
app.use(express.static('assets'));
// middleware1

//next passes on whatever changes has done and calls 
//next middleware if present else 
//than it goes on to the controller
// app.use(function(req, res, next){
//     req.myName = "Arpan";
//     console.log('middleware 1 called');
//    //
//     next();
// });

// // // middleware2
// app.use(function(req, res, next){
    
//     console.log('My name called from MW2', req.myName);
//     console.log('middleware 2 called');
//     next();
// });


var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]
//get return a page extract html from a file
// whenever request comes in we have to send it back
//route we are hitting on and a call back function taking parameters req,res
//at last do res.send html tag are automatically detected in res.send()
//app.get('/profile',) means we are rendering profile page so 
//('/put the name of the page we want to render')
app.get('/practice', function(req, res){
    console.log(req) ;
    // console.log(__dirname);

    //rendering practice file in views folder
    //as we make html in views folder
    return res.render('practice', {
        //setting up the title
     
        title: "Let us play with ejs"
    });
});

//we can handle different types of request by just 
//app.delete if it is a delete request
//app.post if it is a post request and so on.........
app.get('/', function(req, res){
    // console.log('from the get route controller', req.myName);

//as we are rendering home file and sending return to broowser 
//then we have to return it 
//So what ever file we are putting in return res.render('home')
//it will find it in vies folder and send it to browser
//by filling necessary details

    // return res.render('home',{
    //     title: "Contact List",
    //     //passing contact list as locals
    //     contact_list: contactList
    // });

//function to fetch the contact
    Contact.find({},function(err,cons){
         if(err){
            console.log('Error in fetching contacts');
            return;
    }
    return res.render('home',{
        title: "Contact List",
        //passing contact list as locals
        contact_list: cons
    });
});
})
//Method used at form side is post soe we are using 
// app.post

//SO UNDERSTANDING URL '/ABCD' MEANS we are putting
//url after localhost:8000/abcd

app.post('/create-contact', function(req, res){
 

    //added parsed data to contact list

    // contactList.push({
        
    //     name: req.body.name,
    //     phone: req.body.phone,
    // })
    // console.log(req.body.name);

        


    // contactList.push(req.body);

    Contact.create({
        //takes parameter name and phone
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err)
        {
            console.log("Error in creating a contact");
            return;
        }
        console.log('*******',newContact);
        return res.redirect('back');
    });
    //we are redirect to practice page
    // redirect means goto this route 

    //redirect to homepage itself 
    // return res.redirect('/');

});

//for deleting the contact
app.get('/delete-contact/', function(req, res){
    // console.log(req.query);
    //get query from url
    // let phone = req.query.phone;
    // //find index in contact list usinf findIndex which is 
    // //javascript function
    // //find a contact which matches with 
    // let contactindex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactindex != -1){
    //     //will delete the contact we need to splice one position 
    //     contactList.splice(contactindex, 1);
    // }
    // //go back to same page or redirecct to same page 
    // return res.redirect('back');


    //get the id from query in the url
    let id=req.query.id;
    //No second argumet as we are deleting something we are 
    //not creating sommething
    //deleting by a function called findByIdAndDelete if there is error we handled it else we delte it
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("error in deleting an object from database");
            return;
        }

        return res.redirect('back');

    });
});

// as server is running it will listening request andd sending response semantic fundton will listen on port and there will be callback
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})