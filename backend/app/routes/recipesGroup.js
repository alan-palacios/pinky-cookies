const express = require('express');
const router = express.Router();
const RecipesGroupController = require('../controllers/recipesGroup');

//add recipesGroup
router.post('/', async (req, resp, next) => {

    if( req.session.user?._id){
        if(req.body != null ){
            const response = await RecipesGroupController.addCommonRecipesGroup(req.session.user, req.body);
            return manageResponse(response, resp);
        }else{
            return resp.status(400).json({status:"error", description:"Wrong parameters"});
        }
    }else{
        return resp.status(401).json({status:"error", description:"You must be logged and have the proper permissions"});
    }
});

//add recipes to group
router.post('/recipe', async (req, resp, next) => {

    if( req.session.user?._id){
        if(req.body != null ){
            const response = await RecipesGroupController.addRecipeToGroup(req.body.groupId, req.body.recipe.recipeId, req.body.recipe.picture);
            return manageResponse(response, resp);
        }else{
            return resp.status(400).json({status:"error", description:"Wrong parameters"});
        }
    }else{
        return resp.status(401).json({status:"error", description:"You must be logged and have the proper permissions"});
    }
});
const manageResponse = (response,resp) =>{
    if(response === -3 || response === -2)
        return resp.status(500).json({status: "error", description: "Database connection error"});
    else if(response === -1)
        return resp.status(401).json({status: "error", description:"User not found"});
    else
        return resp.status(200).send({status: "ok", data: response});
}


module.exports = router;