const Recipe = require("../models/recipe");
const HashtagController = require ("../controllers/hashtag");
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
  addRecipe: async (user, data) => {
    try {
      data.likes = 0;
      data.creationDate = Date.now();
      data.creator = {
        userId: user._id,
        username: user.username,
        picture: user.picture || "default picture url"
      };
      data.hashtags.forEach( hashtag => {
        
      });
      let recipe = await new Recipe(data).save();
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
