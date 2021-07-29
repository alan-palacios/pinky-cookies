const Recipe = require("../models/recipe");
const HashtagController = require ("../controllers/hashtag");
const UserController = require ("../controllers/user");
const RecipesGroup = require("../controllers/recipesGroup");
module.exports = {
  
  /*getRecipeById: async function (id) {
    try {
      const user = await User.findOne(
        { _id: new mongoose.Types.ObjectId(id) },
        "createdRecipes _id username email type"
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
  },*/
  addRecipeCreated: async (user, data) => {
    try {
      data.likes = 0;
      data.creationDate = new Date();
      data.creator = {
        userId: user._id,
        username: user.username,
        picture: user.picture || "default picture url"
      };

      if(data.hashtags){
        data.hashtags = data.hashtags.map( hashtag => hashtag.toLowerCase());
        data.hashtags.forEach( async hashtag => {
          let query = await HashtagController.getHashtagByName(hashtag);
          if(query ===-1){
            query = await HashtagController.addHashtag({name: hashtag});
          }else if(query ===-2){
            console.log(error);
            return -2;
          }else{
            query = await HashtagController.updateHashtagByName(hashtag);
          }
        });
      }

      const recipe = await new Recipe(data).save();
      const recipeGroup = await RecipesGroup.addRecipeToGroup(user.createdRecipes.groupId, recipe._id, recipe.picture);
      if(recipeGroup.recipes.length===1){//change groupPicture
        await UserController.updateRecipesGroupPicture(user._id, 1, recipe.picture);
      }
      return recipe;
    } catch (error) {
      console.log(error);
      return -2;
    }
  } /*,
  updateUser: async (id, data) => {
    try {
      const user = await User.findByIdAndUpdate(id, {
        $set: {
          username: data.username,
          email: data.email,
          picture: data.picture,
        },
      }, {new:true, select: "createdRecipes _id username email type"});
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
        }, {new:true, select: "createdRecipes _id username email type"});
        return user;
      }
    } catch (error) {
      console.log(error);
      return -2;
    }
  },
  deleteUser: async (id) => {
    try {
      const user = await User.findByIdAndDelete(id, {select: "createdRecipes _id username email type"});
      if (!user) return -1;
      else return user;
    } catch (error) {
      console.log(error);
      return -2;
    }
  }*/
};
