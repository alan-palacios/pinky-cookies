const express = require('express');
const router = express.Router();
const HashtagController = require('../controllers/hashtag');

router.post('/', async(req, resp, next) => {
    if (req.session.user.type === 2 || req.session.user.type === 3) {
        if (req.body == null) {
            return resp.status(400).json({ status: "error", description: "Wrong parameters" });
        } else {
            const response = await HashtagController.addHashtag(req.body);
            return manageResponse(response, resp);
        }
    } else {
        resp.status(401).json({ status: "error", description: "you must be logged" });
    }
});

const manageResponse = (response, resp) => {
    if (response === -3 || response === -2)
        return resp.status(500).json({ status: "error", description: "Database connection error" });
    else if (response === -1)
        return resp.status(401).json({ status: "error", description: "User not found" });
    else
        return resp.header('Access-Control-Allow-Origin', '*').status(200).send({ status: "ok", data: response });
}

module.exports = router;