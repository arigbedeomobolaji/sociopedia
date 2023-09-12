// 1. Create a new User ✔️
// 2. Let a User Logged in ✔️
// 3. Update a User✔️
// 4. get a User ✔️
// 6. delete a User✔️
// 7. Logout a user✔️

import { Request, Response } from "express";

import User, { Token, UserDocument } from "@models/userModel";
import { IUserRequest } from "@middleware/auth";

export const createUser = async (req: Request, res: Response) => {
	try {
		const newUser = new User(req.body);
		const user = await newUser.save();
		const token = await user.generateAuthToken();
		res.status(201).json({
			user,
			token,
		});
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		if (user && token) {
			res.status(200).send({ user, token });
		}
	} catch (error) {
		res.status(401).send({ message: "Please Authenticate" });
	}
};

export const me = async (req: IUserRequest, res: Response) => {
	try {
		res.status(200).send({ user: req.user, token: req.token });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const logoutUser = async (req: IUserRequest, res: Response) => {
	try {
		if (req.user)
			req.user.tokens = req.user?.tokens.filter((token) => {
				return token.token != req.token;
			});
		await req.user?.save();
		res.send({ message: "You're logged out." });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const logoutAll = async (req: IUserRequest, res: Response) => {
	try {
		if (req.user) req.user.tokens = [];
		req.user?.save();
		res.status(200).send("You've successfully logout from all devices.");
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const deleteUser = async (req: IUserRequest, res: Response) => {
	try {
		if (req.user) req.user.deleteOne();
		res.status(200).send({ message: "User successfully Deleted" });
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

export const updateUser = async (req: IUserRequest, res: Response) => {
	try {
		const updates = Object.keys(req.body);
		const allowedFields = [
			"email",
			"name",
			"password",
			"country",
			"state",
			"city",
			"username",
			"dateOfBirth",
			"socialMedia",
			"friends",
			"profilePics",
		];
		const isValidOperation =
			updates.every((update) => allowedFields.includes(update)) &&
			!!updates.length;
		if (!isValidOperation) {
			throw { error: "invalid Operation! ❌" };
		}
		const user = req.user as any;
		updates.forEach((update) => {
			if (update === "password") {
				user.tokens = user.tokens.filter(
					(tokenObj: Token) => tokenObj.token != req.token
				);
			}
			user[update] = req.body[update];
		});
		const updatedUser = await user.save();
		res.status(201).send({ user: updatedUser, token: req.token });
	} catch (error) {
		res.status(400).send({ message: "invalid Operation! ❌" });
	}
};

export const allUsers = async (req: IUserRequest, res: Response) => {
	try {
		let users = await User.find({})
			.where("_id")
			.ne(req.user?._id)
			.select(
				" -gender -age -username -phoneNumber -dateOfBirth -profileViews -impressionCount -friends -posts -socialMedia"
			);

		const potentialFriends: {
			name: string;
			_id: string;
			email: string;
			occupation: string;
			profilePics: string;
		}[] = [];

		users.forEach(
			({
				email,
				firstname,
				surname,
				_id,
				occupation,
				profilePics,
			}: UserDocument) => {
				potentialFriends.push({
					name: `${firstname} ${surname}`,
					email,
					_id: _id.toString(),
					occupation,
					profilePics: profilePics as string,
				});
			}
		);
		res.status(200).send({ potentialFriends });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const addFriend = async (req: IUserRequest, res: Response) => {
	try {
		if (!req.user) {
			throw { error: "Please Authenticate" };
		}

		if (req.user?.friends.includes(req.body.userId.toString())) {
			throw { error: "Already friends" };
		}

		let validFriend = await User.findById(req.body.userId);

		if (!validFriend?.email) {
			throw { error: "Not a valid friends" };
		}

		req.user["friends"] = req.user?.friends.concat(
			validFriend?._id.toString()
		);
		validFriend["friends"] = validFriend?.friends.concat(
			req.user._id.toString()
		);
		req.user = await req.user.save();
		const updatedValidFriend = await validFriend.save();
		if (!req.user?.email && !updatedValidFriend?.email) {
			throw { error: "Unable to update user!" };
		}
		res.status(201).send({ user: req.user, token: req.token });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const removeFriend = async (req: IUserRequest, res: Response) => {
	try {
		if (!req.user?.friends.includes(req.body.userId.toString())) {
			throw { error: "Not friends" };
		}
		const validFriend = await User.findById(req.body.userId);

		if (!validFriend) {
			throw { error: "Not Friends" };
		}
		req.user.friends = req.user?.friends.filter(
			(id) => id.toString() !== req.body.userId.toString()
		);

		validFriend.friends = validFriend.friends.filter(
			(id) => id.toString() !== req.user?._id.toString()
		);

		await req.user.save();
		await validFriend.save();
		res.status(200).send({ user: req.user, token: req.token });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const getAllFriends = async (req: IUserRequest, res: Response) => {
	try {
		const friends = await req.user?.populate(
			"friends",
			"-gender -age -occupation -username -phoneNumber -dateOfBirth -profileViews -impressionCount -friends -posts -socialMedia"
		);
		res.status(200).send({
			numberOfFriends: req.user?.numberOfFriends,
			friends: friends?.friends,
		});
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const uploadProfileImage = async (req: IUserRequest, res: Response) => {
	try {
		if (req.user) {
			req.user["profilePics"] = req.body.imageUrl;
			await req.user?.save();
			res.status(200).send({
				message: "profile pics saved successfully",
			});
		}
	} catch (error) {
		res.status(500).send({ message: error });
	}
};

export const increaseStat = async (req: IUserRequest, res: Response) => {
	try {
		// const user: any = await User.findById(req.body._id);
		// if (!user) throw { error: "Not a valid user" };
		// user.profileViews += 5;
		// user.impressionCount += 20;
		// await user.save();

		const user = await User.findByIdAndUpdate(req.body._id, {
			$inc: { profileViews: 5, impressionCount: 10 },
		});

		res.status(200).send({ user });
	} catch (error) {
		res.status(500).send({ message: error });
	}
};
