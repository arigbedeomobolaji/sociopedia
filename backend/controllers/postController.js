"use strict";
/*
1. create Post
2. get post
3. update post
4. delete post
5. get all post
*/
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
exports.unlikePost = exports.likePost = exports.deletePost = exports.updatePost = exports.getAllPosts = exports.getPost = exports.createPost = void 0;
const postModel_1 = __importDefault(require("@models/postModel"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!req.user) {
            throw { error: "Please Authenticate" };
        }
        const post = new postModel_1.default({
            caption: req.body.caption,
            postImages: req.body.postImages,
            owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        req.user["posts"] = (_b = req.user) === null || _b === void 0 ? void 0 : _b.posts.concat(post);
        yield post.save();
        yield req.user.save();
        res.status(201).send({ post, user: req.user });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createPost = createPost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield postModel_1.default.findById(postId)
            .populate({
            path: "owner",
        })
            .populate({
            path: "commentsId",
            populate: {
                path: "owner",
            },
        });
        res.status(200).send(post);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPost = getPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { skip, limit } = req.query;
        const parsedSkip = Number(skip);
        const parsedLimit = Number(limit);
        const posts = yield postModel_1.default.find()
            .where("owner")
            .ne((_c = req.user) === null || _c === void 0 ? void 0 : _c._id)
            .skip(parsedSkip)
            .limit(parsedLimit)
            .sort({ createdAt: "desc" })
            .populate([
            {
                path: "owner",
                select: "-gender -age -occupation -username -phoneNumber -dateOfBirth -profileViews -impressionCount -friends -posts -socialMedia",
            },
            {
                path: "commentsId",
                select: "comment owner",
                populate: {
                    path: "owner",
                    select: " -email -gender -age -occupation -city -country -state -username -phoneNumber -dateOfBirth -profileViews -impressionCount -friends -posts -socialMedia",
                },
            },
        ]);
        if (!posts.length) {
            throw { error: "No Posts yet" };
        }
        res.status(200).send(posts);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.getAllPosts = getAllPosts;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = (yield postModel_1.default.findById(postId));
        if (!post) {
            throw { error: "post doesn't exist" };
        }
        const fields = Object.keys(req.body);
        const allowedField = ["caption", "postImages", "likes", "commentsId"];
        const ValidOperation = fields.every((field) => allowedField.includes(field));
        if (!ValidOperation) {
            throw { error: "Operation isn't allowed!" };
        }
        fields.forEach((field) => {
            post[field] = req.body[field];
        });
        yield post.save();
        res.status(201).send(post);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        if (!req.user)
            throw { error: "Please Authenticate" };
        const postId = req.params.id;
        const deletedPost = yield postModel_1.default.findByIdAndRemove(postId);
        // const deletedComment = await Comment.deleteMany(deletedPost?.commentsId)
        req.user["posts"] = (_d = req.user) === null || _d === void 0 ? void 0 : _d.posts.filter((post) => post.toString() !== postId);
        yield req.user.save();
        res.status(200).send({
            message: `${postId} successfully deleted.`,
            user: req.user,
            deletedPost,
        });
    }
    catch (error) { }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        if (!(req === null || req === void 0 ? void 0 : req.user))
            throw { error: "Please Authenticate" };
        const postId = req.params.id;
        const post = yield postModel_1.default.findById(postId);
        if (!post) {
            throw { error: "Post not found" };
        }
        if (post.likes.includes((_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e._id.toString())) {
            throw { error: "You have already liked" };
        }
        post.likes = [...post.likes, (_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f._id.toString()];
        yield post.save();
        res.status(203).send({ message: "post liked" });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.likePost = likePost;
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const postId = req.params.id;
        const post = yield postModel_1.default.findById(postId);
        if (!post) {
            throw { error: "Post not found" };
        }
        if (!post.likes.includes((_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g._id.toString())) {
            throw { error: "You haven't liked.!" };
        }
        post.likes = post.likes.filter((like) => { var _a; return like !== ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id.toString()); });
        yield post.save();
        res.status(203).send({ message: "post unliked" });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.unlikePost = unlikePost;
