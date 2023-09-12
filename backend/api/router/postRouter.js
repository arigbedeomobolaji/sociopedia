"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postController_1 = require("../controllers/postController");
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const postRouter = (0, express_1.Router)();
postRouter.post("", auth_1.default, postController_1.createPost);
postRouter.get("/all", auth_1.default, postController_1.getAllPosts);
postRouter.patch("/like/:id", auth_1.default, postController_1.likePost);
postRouter.patch("/unlike/:id", auth_1.default, postController_1.unlikePost);
postRouter.get("/:id", auth_1.default, postController_1.getPost);
postRouter.patch("/:id", auth_1.default, postController_1.updatePost);
postRouter.delete("/:id", auth_1.default, postController_1.deletePost);
exports.default = postRouter;
