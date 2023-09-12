import { upload, uploadPostPics } from "@controllers/uploadController";
import { Router } from "express";
import authMiddleware from "@middleware/auth";

const uploadRouter = Router();

uploadRouter.get("/", authMiddleware, upload);
uploadRouter.post("/", authMiddleware, uploadPostPics);

export default uploadRouter;
