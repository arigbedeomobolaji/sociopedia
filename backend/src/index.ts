import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import userRouter from "@router/userRouter";
import uploadRouter from "@router/uploadRouter";
import postRouter from "@router/postRouter";
import commentRouter from "@router/commentRouter";

dotenv.config();
const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL!;

// Enable CORS
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', '*')
	res.setHeader('Access-Control-Allow-Headers', '*')
	next()
 })
// Parse JSON request bodies
app.use(express.json());
// app.use(express.static("public"));

const startServer = async () => {
	try {
		await mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions);
		console.log("connected to DB  ✔️");
		app.listen(port, () => console.log(`Server running on port ${port}`));
	} catch (error) {
		console.log("Failed to connect to the DB ❌");
		console.log(error);
	}
};

startServer();

// Define routes
app.get("/", (req: Request, res: Response) => {
	res.send("Hello!");
});

// Define other routes
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

if (process.env.NODE_ENV === "production") {
	app.use("/", express.static("../client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
	});
}

// error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(500).send({ message: err.message });
});

export default app;
