const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');


router.post('/login', async (req, resp, next) => {
    if(!req.session.user){
        if(req.body.email == null || req.body.password == null){
		    return resp.status(400).json({status:"error", description:"Wrong parameters"});
        }else{
            const response = await UserController.getUserByEmailAndPassword(req.body.email, req.body.password);
            if(response === -3 || response === -2)
            	return resp.status(500).json({status: "error", description: "Database connection error"});
            else if(response === -1)
		        return resp.status(401).json({status: "error", description:"User not found"});
            else{
                req.session.user = response;
                try{
                    //const saveSession = await req.session.save();
                    req.session.save(err => {
                        if(err){
                            console.log(err);
                            return resp.status(500).json({status:"error",description:"Save session error"});
                        } else {
                            console.log(`login of user: ${req.session.user.username}`);
                            return resp.status(200).json({status: "ok", user: response});
                        }
                    });
                    
                }catch(error){
                    console.log(error);
                    return resp.status(500).json({status:"error",description:"Save session error"});
                }
            }
        }
    }else{
        resp.status(400).json({status:"error", description:"Previously logged in"});
    }   
});

router.all('/logout', async (req, resp, next) =>{
    console.log(req.session);
    if(req.session.user){
        try{
            req.session.destroy();
            return resp.status(200).json({status:"ok"});
        }catch(error){
            console.log(error);
            return resp.status(500).json({status:"error",description:"destroy session error"});
        }
    }else{
        resp.status(401).json({status:"error", description:"you must be logged"});
    }
});


module.exports = router;