import { Schema, Model, Document, model, Types } from "mongoose";

export interface CommentDocument extends Document {
	comment: string;
	owner: Types.ObjectId;
	postId: string;
}

export interface CommentModel extends Model<CommentDocument> {}

export const commentSchema: Schema = new Schema<CommentDocument>({
	comment: {
		type: String,
		required: true,
		maxlength: 200,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	postId: {
		type: String,
		required: true,
	},
});

const Comment = model<CommentDocument, CommentModel>("comment", commentSchema);
export default Comment;
