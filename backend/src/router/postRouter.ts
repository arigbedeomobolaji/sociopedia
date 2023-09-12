import {
	createPost,
	deletePost,
	getAllPosts,
	getPost,
	likePost,
	unlikePost,
	updatePost,
} from "@controllers/postController";
import { Router } from "express";
import authMiddleware from "@middleware/auth";

const postRouter: Router = Router();

postRouter.post("", authMiddleware, createPost);
postRouter.get("/all", authMiddleware, getAllPosts);
postRouter.patch("/like/:id", authMiddleware, likePost);
postRouter.patch("/unlike/:id", authMiddleware, unlikePost);
postRouter.get("/:id", authMiddleware, getPost);
postRouter.patch("/:id", authMiddleware, updatePost);
postRouter.delete("/:id", authMiddleware, deletePost);

export default postRouter;
