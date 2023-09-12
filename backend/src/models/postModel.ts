import { Document, Schema, Model, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export interface PostDocument extends Document {
	caption: string;
	postImages: string[];
	likes: string[];
	commentsId: Schema.Types.ObjectId[];
	owner: Schema.Types.ObjectId;
}

export interface PostModel extends Model<PostDocument> {}

export const postSchema: Schema = new Schema<PostDocument>(
	{
		caption: { type: String, required: true, maxlength: 200 },
		postImages: [{ type: String, required: true }],
		likes: [{ type: String }],
		commentsId: [{ type: Schema.Types.ObjectId, ref: "comment" }],
		owner: { type: Schema.Types.ObjectId, ref: "user" },
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
	}
);

const Post = model<PostDocument, PostModel>("post", postSchema);
export default Post;
