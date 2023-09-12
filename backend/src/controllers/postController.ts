/* 
1. create Post
2. get post
3. update post
4. delete post
5. get all post
*/

import Post from "@models/postModel";
import { Response } from "express";
import { IUserRequest } from "@middleware/auth";

export const createPost = async (req: IUserRequest, res: Response) => {
	try {
		if (!req.user) {
			throw { error: "Please Authenticate" };
		}

		const post = new Post({
			caption: req.body.caption,
			postImages: req.body.postImages,
			owner: req.user?._id,
		});
		req.user["posts"] = req.user?.posts.concat(post as any);
		await post.save();
		await req.user.save();
		res.status(201).send({ post, user: req.user });
	} catch (error) {
		res.status(500).send(error);
	}
};

export const getPost = async (req: IUserRequest, res: Response) => {
	try {
		const postId = req.params.id;
		const post = await Post.findById(postId)
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
	} catch (error) {
		res.status(500).send(error);
	}
};

export const getAllPosts = async (req: IUserRequest, res: Response) => {
	try {
		const { skip, limit } = req.query;
		const parsedSkip = Number(skip);
		const parsedLimit = Number(limit);
		const posts = await Post.find()
			.where("owner")
			.ne(req.user?._id)
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
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const updatePost = async (req: IUserRequest, res: Response) => {
	try {
		const postId = req.params.id;
		const post = (await Post.findById(postId)) as any;
		if (!post) {
			throw { error: "post doesn't exist" };
		}
		const fields = Object.keys(req.body);
		const allowedField = ["caption", "postImages", "likes", "commentsId"];
		const ValidOperation = fields.every((field) =>
			allowedField.includes(field)
		);

		if (!ValidOperation) {
			throw { error: "Operation isn't allowed!" };
		}
		fields.forEach((field) => {
			post[field] = req.body[field];
		});
		await post.save();
		res.status(201).send(post);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const deletePost = async (req: IUserRequest, res: Response) => {
	try {
		if (!req.user) throw { error: "Please Authenticate" };
		const postId = req.params.id;
		const deletedPost = await Post.findByIdAndRemove(postId);
		// const deletedComment = await Comment.deleteMany(deletedPost?.commentsId)
		req.user["posts"] = req.user?.posts.filter(
			(post) => post.toString() !== postId
		);
		await req.user.save();
		res.status(200).send({
			message: `${postId} successfully deleted.`,
			user: req.user,
			deletedPost,
		});
	} catch (error) {}
};

export const likePost = async (req: IUserRequest, res: Response) => {
	try {
		if (!req?.user) throw { error: "Please Authenticate" };
		const postId = req.params.id;
		const post = await Post.findById(postId);
		if (!post) {
			throw { error: "Post not found" };
		}
		if (post.likes.includes(req?.user?._id.toString())) {
			throw { error: "You have already liked" };
		}
		post.likes = [...post.likes, req?.user?._id.toString()];
		await post.save();
		res.status(203).send({ message: "post liked" });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const unlikePost = async (req: IUserRequest, res: Response) => {
	try {
		const postId = req.params.id;
		const post = await Post.findById(postId);
		if (!post) {
			throw { error: "Post not found" };
		}

		if (!post.likes.includes(req?.user?._id.toString())) {
			throw { error: "You haven't liked.!" };
		}

		post.likes = post.likes.filter(
			(like) => like !== req?.user?._id.toString()
		);
		await post.save();
		res.status(203).send({ message: "post unliked" });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};
