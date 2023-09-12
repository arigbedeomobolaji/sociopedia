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
exports.deleteComment = exports.createComment = void 0;
const commentModel_1 = __importDefault(require("@models/commentModel"));
const postModel_1 = __importDefault(require("@models/postModel"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const postId = req.params.id;
        const comment = req.body.comment;
        const post = yield postModel_1.default.findById(postId);
        if (!(post === null || post === void 0 ? void 0 : post._id)) {
            throw { error: "No Post found with this id" };
        }
        const mewComment = new commentModel_1.default({
            comment,
            owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString(),
            postId,
        });
        post.commentsId = [...post.commentsId, mewComment._id.toString()];
        yield mewComment.save();
        yield post.save();
        res.status(201).send({ message: "comment succesfully saved.!" });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.createComment = createComment;
// export const readComments = async(req: IUserRequest, res: Response) => {
// 	try {
// 		if(!req.user?._id) {
// 			throw ({error: "Please AUthenticate"});
// 		}
// 		const postId = req.params.id;
// 		const post = await Post.findById(postId).populate({
// 			path: 'commentsId'
// 		});
// 	} catch (error) {
// 		res.status(500).send({message: error})
// 	}
// }
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const commentId = req.query.commentId;
        yield commentModel_1.default.findByIdAndDelete(commentId);
        const post = yield postModel_1.default.findById(postId);
        if (!(post === null || post === void 0 ? void 0 : post._id)) {
            throw { error: "Post not found." };
        }
        post.commentsId = post.commentsId.filter((id) => id.toString() !== commentId);
        yield post.save();
        res.status(201).send({ message: "Comment successfully removed.!" });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.deleteComment = deleteComment;
