import {
	createUser,
	loginUser,
	logoutUser,
	me,
	allUsers,
	logoutAll,
	deleteUser,
	updateUser,
	getAllFriends,
	increaseStat,
	addFriend,
	removeFriend,
} from "@controllers/userController";
import { Router } from "express";
import authMiddleware from "@middleware/auth";

const userRouter: Router = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authMiddleware, me);
userRouter.get("/allusers", authMiddleware, allUsers);
userRouter.post("/logout", authMiddleware, logoutUser);
userRouter.post("/logoutAll", authMiddleware, logoutAll);
userRouter.delete("/me", authMiddleware, deleteUser);
userRouter.patch("/me", authMiddleware, updateUser);
userRouter.patch("/friends/add", authMiddleware, addFriend);
userRouter.patch("/friends/remove", authMiddleware, removeFriend);
userRouter.get("/friendlist", authMiddleware, getAllFriends);
userRouter.patch("/increaseprofilestat", authMiddleware, increaseStat);
export default userRouter;
