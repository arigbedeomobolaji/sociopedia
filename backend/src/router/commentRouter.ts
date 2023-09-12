import { createComment, deleteComment } from "@controllers/commentController";
import { Router } from "express";
import authMiddleware from "@middleware/auth";

const commentRouter = Router();

commentRouter.post("/:id", authMiddleware, createComment);
commentRouter.delete("/:id", authMiddleware, deleteComment);

export default commentRouter;
