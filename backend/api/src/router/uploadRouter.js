"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadController_1 = require("../controllers/uploadController");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../src/middleware/auth"));
const uploadRouter = (0, express_1.Router)();
uploadRouter.get("/", auth_1.default, uploadController_1.upload);
uploadRouter.post("/", auth_1.default, uploadController_1.uploadPostPics);
exports.default = uploadRouter;
