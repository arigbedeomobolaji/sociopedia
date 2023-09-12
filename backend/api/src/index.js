"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const uploadRouter_1 = __importDefault(require("./router/uploadRouter"));
const postRouter_1 = __importDefault(require("./router/postRouter"));
const commentRouter_1 = __importDefault(require("./router/commentRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
// Enable CORS
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
// Parse JSON request bodies
app.use(express_1.default.json());
// app.use(express.static("public"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to DB  ✔️");
        app.listen(port, () => console.log(`Server running on port ${port}`));
    }
    catch (error) {
        console.log("Failed to connect to the DB ❌");
        console.log(error);
    }
});
startServer();
// Define routes
app.get("/", (req, res) => {
    res.send("Hello!");
});
// Define other routes
app.use("/api/user", userRouter_1.default);
app.use("/api/upload", uploadRouter_1.default);
app.use("/api/posts", postRouter_1.default);
app.use("/api/comments", commentRouter_1.default);
if (process.env.NODE_ENV === "production") {
    app.use("/", express_1.default.static("../client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../client/build/index.html"));
    });
}
// error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});
exports.default = app;
