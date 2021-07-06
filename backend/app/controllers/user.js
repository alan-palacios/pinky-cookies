const mongoose = require('mongoose');
const User = require('../models/user');
module.exports = {
    addUser:async (data) =>{
        try{   
            data.type=1;
            let user = await new User(data).save();
            return user;
        }catch(error){
            console.log(error);
            return -2;
        }
    },
    getUserById:async function(id){
        try{
            const user = await User.findOne({_id: new mongoose.Types.ObjectId(id)}, 'createdRecipes _id username email type');
            if(!user) return -1;
            else return user;
        }catch(error){
            console.log(error);
            return -2;
        }
    },
    getUserByEmailAndPassword:async function(email, password){
        try{
            const userId = await User.findOne({email, password}, '_id');
            console.log(userId);
            if(!userId) return -1;
            else{
                const user = await this.getUserById(userId._id);
                if(user === -1 || user === -2)
                    return -2;
                else
                    return user;
            }
        }catch(error){
            console.log(error);
            return -3;
        }
    },
};