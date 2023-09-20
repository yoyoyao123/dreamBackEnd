const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://yoyo:yoyo123@cluster0.eywkviw.mongodb.net/Dream?retryWrites=true&w=majority')
.then(() =>{
    console.log('connect');
})
.catch ((error) =>{
    console.log(error);
})
