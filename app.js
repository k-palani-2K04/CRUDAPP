require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

//Middlewares for handling form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('Frontend'));

//Connect the server to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("MongoDB Connected.")})
.catch((err)=>{console.log("Error Occured.")})

//Define the Structure of the Collection
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    age: Number
});

//Create a model(It is a interface for performing database operations like creating, querying, updating, and deleting records) on a specific MongoDB collection.
const User = mongoose.model('user',userSchema);

//To serve frontend
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'Frontend','index.html'));
});
//to retrieve data from the DB and send to the client
app.get('https://crudapp-9rul.onrender.com/users',async (req,res)=>{
    const users = await User.find();
    res.json(users);
})

//To retrieve data from client and save in Datase
app.post('https://crudapp-9rul.onrender.com/add',async (req,res)=>{
    await User.create(req.body);
    res.redirect('/');
});

//Delete the document in the Database
app.get('https://crudapp-9rul.onrender.com/delete/:id',async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

//Edit and Updatee the data
app.post('https://crudapp-9rul.onrender.com/update/:id',async (req,res)=>{
    let updatedData = req.body;
    let id = req.params.id;
    await User.findByIdAndUpdate(id,updatedData);
    res.redirect('/');
})

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
