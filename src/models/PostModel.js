const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    photo : {
        type: String,
        default: "No photo"
    },
    postedBy : {
        type: ObjectId,
        ref: "Users"
    }
});

mongoose.model("Posts", postSchema);