import { Schema, model, Document, Model } from "mongoose";

export interface PostDocument extends Document {
	caption: string;
	imageUrl: string;
	likes: number;
	commentsId: Schema.Types.ObjectId;
	postUrl: string;
}

export interface PostModel extends Model<PostDocument> {}

export const postSchema: Schema = new Schema<PostDocument>(
	{
		caption: {
			type: String,
			required: true,
			maxlength: 200,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		postUrl: {
			type: String,
		},
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "modifiedAt",
		},
	}
);

const Post = model<PostDocument, PostModel>("post", postSchema);
