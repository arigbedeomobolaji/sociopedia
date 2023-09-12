import { Document, Schema, Types, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = Number(process.env.SALT_ROUNDS!);
const tokenSecretKey = process.env.TOKEN_SECRET_KEY!;

export type SocialMedium = {
	name?: string;
	platform?: string;
	url?: string;
};

export type Token = {
	token: string;
	_id: Schema.Types.ObjectId;
};

export interface UserDocument extends Document {
	email: string;
	firstname: string;
	surname: string;
	password: string;
	profilePics?: string;
	country: string;
	state: string;
	city: string;
	username: string;
	phoneNumber: string;
	dateOfBirth: string;
	gender: string;
	age: number;
	occupation: string;
	profileViews?: number;
	numberOfFriends: number;
	impressionCount?: number;
	friends: Schema.Types.ObjectId[];
	posts: Schema.Types.ObjectId[];
	socialMedia?: SocialMedium[];
	tokens: Token[];
	generateAuthToken(): { token: string };
}

export interface UserModel extends Model<UserDocument> {
	findByCredentials(email: string, password: string): UserDocument;
}

export const userSchema: Schema = new Schema<UserDocument>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			validate: {
				validator: function (value: string) {
					return validator.isEmail(value);
				},
				message: (props) =>
					`${props.value} is not a valid Email Address!`,
			},
		},
		firstname: { type: String, required: true },
		surname: { type: String, required: true },
		gender: {
			type: String,
			required: true,
			validate: {
				validator: function (value: string) {
					return value === "male" || value === "female";
				},
				message: (props) => `${props.value} is not a known gender`,
			},
		},
		password: {
			type: String,
			required: true,
			minlength: [4, "password must be greater than 8"],
		},
		age: {
			type: Number,
			required: true,
			min: [0, "age cannot be negative"],
		},
		occupation: {
			type: String,
			required: true,
			maxlength: [20, "Occupation must not exceed 20 chars"],
		},
		country: { type: String, required: true },
		state: { type: String, required: true },
		city: { type: String, required: true },
		username: { type: String, unique: true, required: true },
		phoneNumber: { type: String, unique: true, required: true },
		dateOfBirth: { type: String, required: true },
		profileViews: { type: Number, default: 0, min: 0 },
		impressionCount: { type: Number, default: 0, min: 0 },
		profilePics: { type: String, default: "" },
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "user",
			},
		],
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: "post",
			},
		],
		socialMedia: [
			{
				name: String,
				platform: String,
				url: String,
			},
		],
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
	}
);

// Hash Password before saving to DB
userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, saltRounds);
	}

	next();
});

// Generate Auth token for user
userSchema.methods.generateAuthToken = async function () {
	try {
		const user = this;

		const token = await jwt.sign(
			{ _id: user._id.toString(), email: user.email },
			tokenSecretKey,
			{ expiresIn: "7 days" }
		);
		user.tokens = user.tokens.concat({ token });
		const savedUser = await user.save();
		return token;
	} catch (error) {
		return error;
	}
};

// Find a user by email and password ==> Login user
userSchema.statics.findByCredentials = async (
	email: string,
	password: string
) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Please Authenticate");
	}
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Please Authenticate");
	}

	return user;
};

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	userObject.createdAt = userObject.createdAt.getTime();
	userObject.updatedAt = userObject.updatedAt.getTime();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.virtual("numberOfFriends").get(function () {
	return this.friends.length;
});

const User = model<UserDocument, UserModel>("user", userSchema);
export default User;
