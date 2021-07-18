const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')

//add user
router.post('/', async (req, resp, next) => {
    if(req.body == null ){
        return resp.status(400).json({status:"error", description:"Wrong parameters"});
    }else{
        const response = await UserController.addUser(req.body);
        return manageResponse(response, resp);
    }   
});

//edit general user info
router.patch('/:id', async (req, resp, next) => {
    if( req.session.user?._id===req.params.id || req.session.user?.type===3){
        if(req.body != null ){
            const response = await UserController.updateUser(req.params.id, req.body);
            return manageResponse(response, resp);
        }else{
            return resp.status(400).json({status:"error", description:"Wrong parameters"});
        }
    }else{
        return resp.status(401).json({status:"error", description:"You must be logged and have the proper permissions"});
    }
});

//change user password
router.patch('/password/:id', async (req, resp, next) => {
    if( req.session.user?._id===req.params.id ){
        if(req.body?.newPassword === req.body?.confirmPassword){
            const response = await UserController.updateUserPassword(req.params.id, req.body);
            return manageResponse(response, resp);
        }else{
            return resp.status(400).json({status:"error", description:"Wrong parameters"});
        }
    }else{
        return resp.status(401).json({status:"error", description:"You must be logged and have the proper permissions"});
    }
});

//get user info
router.get('/:id', async (req, resp, next) => {
    if(req.params == null ){
        return resp.status(400).json({status:"error", description:"Wrong parameters"});
    }else{
        const response = await UserController.getUserById(req.params.id);
        return manageResponse(response, resp);
    }   
});

//delete user
router.delete('/:id', async (req, resp, next) => {
    if( req.session.user?._id===req.params.id || req.session.user?.type===3){
        const response = await UserController.deleteUser(req.params.id);
        return manageResponse(response, resp);
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