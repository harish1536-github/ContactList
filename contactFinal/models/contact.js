//mongoose is used to create schema we will import mongoose library
//instance will be used here 
const mongoose=require('mongoose');

//creating schema
const contactSchema = new mongoose.Schema({
    //feild
    name: {
        type: String,
        //cannot put empty value
        required: true
    },
    //annother feild
    phone: {
        type: String,
        //cannot put empty value
        required: true
    }

})

//Collection name should be in capital 
//creating collection and collection is defined by contact by contactSchema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
