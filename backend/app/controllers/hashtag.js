const mongoose = require("mongoose");
const Hashtag = require("../models/hashtag");
module.exports = {

    addHashtag: async(data) => {
        try {
            let hashtag = await new Hashtag(data).save();
            return hashtag;
        } catch (error) {
            console.log(error);
            return -2;
        }
    }
};