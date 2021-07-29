const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const recipesGroupController = require("./recipesGroup");

const userQuery ="_id username email type picture likedRecipes createdRecipes recipesGroups"; 
module.exports = {
  
  getUserById: async function (id) {
    try {
      const user = await User.findOne(
        { _id: new mongoose.Types.ObjectId(id) },
        userQuery
      );
      if (!user) return -1;
      else return user;
    } catch (error) {
      console.log(error);
      return -2;
    }
  },
  getUserByEmailAndPassword: async function (email, password) {
    try {
      const userRecord = await User.findOne({ email }); 
      if (!userRecord) return -1;
      else {
        if(bcrypt.compareSync(password, userRecord.password)){
          const user = await this.getUserById(userRecord._id);
          if (user === -1 || user === -2) return -2;
          else return user;      
        }
        return -1;
      }
    } catch (error) {
      console.log(error);
      return -3;
    }
  },
  addUser: async (data) => {
    try {
      data.type = 1;
      data.password = bcrypt.hashSync(data.password, 10);
      data.picture = "default user picture";
      let user = await new User(data).save();
      user = user.toJSON();
      user.userId = user._id;
      //user = await module.exports.getUserById(user._id);

      const likedRecipesObj = {
        groupName: "Liked Recipes", 
        type: 2,
        public: false,
        creator: user,
        picture: "default group picture",
        recipes: []
      };
      let likedGroup = await recipesGroupController.addRecipesGroup(likedRecipesObj);
      if(likedGroup === -2)return -2;

      const createdRecipesObj = {
        groupName: "Created Recipes", 
        type: 1,
        public: false,
        creator: user,
        picture: "default group picture",
        recipes: []
      };
      let createdGroup = await recipesGroupController.addRecipesGroup(createdRecipesObj);
      if(createdGroup === -2)return -2;

      createdGroup = createdGroup.toJSON();
      likedGroup = likedGroup.toJSON();

      createdGroup.groupId = createdGroup._id;
      likedGroup.groupId = likedGroup._id;

      user = await User.findByIdAndUpdate(user._id, 
            {createdRecipes:createdGroup, likedRecipes:likedGroup},
            {new:true, select: userQuery} ) 
      if(user === -2)return -2;

      return user;
    } catch (error) {
      console.log(error);
      return -2;
    }
  },
  updateUser: async (id, data) => {
    try {
      const user = await User.findByIdAndUpdate(id, {
        $set: {
          username: data.username,
          email: data.email,
          picture: data.picture,
        },
      }, {new:true, select: userQuery});
      if (!user) return -1;
      else return user;
    } catch (error) {
      console.log(error);
      return -2;
    }
  },
  updateUserPassword: async (id, data) => {
    try {
      var user = await module.exports.getUserByEmailAndPassword(data.email, data.password);
      if (!user._id) return -1;
      else {
        user = await User.findByIdAndUpdate(id, {
          $set: {
            password: data.newPassword
          },
        }, {new:true, select: userQuery});
        return user;
      }
    } catch (error) {
      console.log(error);
      return -2;
    }
  },
  deleteUser: async (id) => {
    try {
      const user = await User.findByIdAndDelete(id, {select: userQuery});
      if (!user) return -1;
      else return user;
    } catch (error) {
      console.log(error);
      return -2;
    }
  },
  updateRecipesGroupPicture: async (userId, type, recipeUrl) => {
    try {
      let user;
      if(type===1){
         user = await User.findByIdAndUpdate(userId, {
            $set: {
              'createdRecipes.picture': recipeUrl
            }
          }, {new:true, select: userQuery});
      }else{
         user = await User.findByIdAndUpdate(userId, {
            $set: {
              'likedRecipes.picture': recipeUrl
            }
          }, {new:true, select: userQuery});
      }
      if(!user) return -1;
      return user;
    } catch (error) {
      console.log(error);
      return -2;
    }
  }
};
