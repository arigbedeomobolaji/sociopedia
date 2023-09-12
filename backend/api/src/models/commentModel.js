"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.commentSchema = new mongoose_1.Schema({
    comment: {
        type: String,
        required: true,
        maxlength: 200,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    postId: {
        type: String,
        required: true,
    },
});
const Comment = (0, mongoose_1.model)("comment", exports.commentSchema);
exports.default = Comment;
