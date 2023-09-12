import Comment from "@models/commentModel";
import Post from "@models/postModel";
import { Response } from "express";
import { IUserRequest } from "src/middleware/auth";

export const createComment = async (req: IUserRequest, res: Response) => {
	try {
		const postId = req.params.id;
		const comment = req.body.comment;
		const post = await Post.findById(postId);
		if (!post?._id) {
			throw { error: "No Post found with this id" };
		}
		const mewComment = new Comment({
			comment,
			owner: req.user?._id.toString(),
			postId,
		});
		post.commentsId = [...post.commentsId, mewComment._id.toString()];
		await mewComment.save();
		await post.save();
		res.status(201).send({ message: "comment succesfully saved.!" });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

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

export const deleteComment = async (req: IUserRequest, res: Response) => {
	try {
		const postId = req.params.id;
		const commentId = req.query.commentId;
		await Comment.findByIdAndDelete(commentId);
		const post = await Post.findById(postId);
		if (!post?._id) {
			throw { error: "Post not found." };
		}
		post.commentsId = post.commentsId.filter(
			(id) => id.toString() !== commentId
		);
		await post.save();
		res.status(201).send({ message: "Comment successfully removed.!" });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};
