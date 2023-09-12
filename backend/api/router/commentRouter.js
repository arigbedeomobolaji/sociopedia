"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentController_1 = require("../controllers/commentController");
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const commentRouter = (0, express_1.Router)();
commentRouter.post("/:id", auth_1.default, commentController_1.createComment);
commentRouter.delete("/:id", auth_1.default, commentController_1.deleteComment);
exports.default = commentRouter;
