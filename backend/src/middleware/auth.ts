import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User, { UserDocument } from "@models/userModel";
dotenv.config();

const tokenSecretKey = process.env.TOKEN_SECRET_KEY!;

export interface IUserRequest extends Request {
	user?: UserDocument;
	token?: string;
}

interface JwtPayload {
	_id: string;
	email: string;
}
const authMiddleware = async (
	req: IUserRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		// Check if token exist
		const token = req.headers.authorization?.replace("Bearer", "").trim()!;

		if (!token) {
			throw new Error("Please Authenticate");
		}

		const { _id, email } = (await jwt.verify(
			token,
			tokenSecretKey
		)) as JwtPayload;

		// Check if User is in db
		const user = await User.findOne({ _id, email, "tokens.token": token });
		if (!user) {
			throw new Error("Please Authenticate");
		}

		req.user = user;
		req.token = token;

		next();
	} catch (error) {
		res.status(401).send({ error: "Please Authenticate!" });
	}
};

export default authMiddleware;
