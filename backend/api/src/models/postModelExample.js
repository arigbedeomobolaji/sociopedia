"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
exports.postSchema = new mongoose_1.Schema({
    caption: {
        type: String,
        required: true,
        maxlength: 200,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    postUrl: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "modifiedAt",
    },
});
const Post = (0, mongoose_1.model)("post", exports.postSchema);
