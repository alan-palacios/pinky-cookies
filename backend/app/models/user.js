var mongoose = require('mongoose');

module.exports = mongoose.model('users', new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email invalido']
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    picture:{
	type:String
    },
    type:{
        type:Number,
        required:true,
        min:1,
        max:3
    },
    createdRecipes:{
        groupId:{ type: mongoose.Schema.Types.ObjectId, ref: 'recipesGroups'},
        groupName: {type: String},
        picture:{type: String}
    },
    likedRecipes:{
        groupId:{ type: mongoose.Schema.Types.ObjectId, ref: 'recipesGroups'},
        groupName: {type: String},
        picture:{type: String}
    },
    recipesGroups:[{ type: mongoose.Schema.Types.ObjectId, ref: 'recipesGroups'}]
}));