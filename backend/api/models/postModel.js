"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.postSchema = new mongoose_1.Schema({
    caption: { type: String, required: true, maxlength: 200 },
    postImages: [{ type: String, required: true }],
    likes: [{ type: String }],
    commentsId: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "comment" }],
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
const Post = (0, mongoose_1.model)("post", exports.postSchema);
exports.default = Post;
