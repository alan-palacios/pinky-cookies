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
    },
    getHashtagByName: async(data) => {
        try {
            const hashtag = await Hashtag.findOne({ name: data });
            if (!hashtag) return -1;
            else return hashtag;
        } catch (error) {
            console.log(error);
            return -2;
        }
    },
    updateHashtagByName: async(data) => {
        try {
            const hashtag = await Hashtag.findOneAndUpdate({ name: data }, {$inc:{'count': 1}});
            if (!hashtag) return -1;
            else return hashtag;
        } catch (error) {
            console.log(error);
            return -2;
        }
    }
};