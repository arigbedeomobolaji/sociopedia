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
exports.uploadPostPics = exports.upload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const region = process.env.AWS_REGION;
aws_sdk_1.default.config.update({ region });
const S3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
});
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const contentType = "image/jpeg";
        const extension = "jpeg";
        const key = `${(_a = req.user) === null || _a === void 0 ? void 0 : _a._id}/${(0, uuid_1.v4)()}.${extension}`;
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        };
        const url = yield S3.getSignedUrlPromise("putObject", params);
        res.status(200).send({ url, key });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.upload = upload;
function getUrl(file, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const ContentType = file.type;
        const extension = ContentType.split("/")[1];
        const key = `${userId}/${(0, uuid_1.v4)()}.${extension}`;
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            ContentType,
        };
        const url = yield S3.getSignedUrlPromise("putObject", params);
        if (url) {
            return { url, key };
        }
    });
}
const uploadPostPics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.body.files;
        let counter = 0;
        let totalCount = files.length;
        if (!totalCount) {
            throw { error: "No file(s)" };
        }
        let postImageData = [];
        files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            const data = yield getUrl(file, (_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
            if (data) {
                postImageData = postImageData.concat(data);
                counter = counter + 1;
                if (counter === totalCount) {
                    res.status(200).send(postImageData);
                }
            }
        }));
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.uploadPostPics = uploadPostPics;
