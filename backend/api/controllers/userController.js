"use strict";
// 1. Create a new User ✔️
// 2. Let a User Logged in ✔️
// 3. Update a User✔️
// 4. get a User ✔️
// 6. delete a User✔️
// 7. Logout a user✔️
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
exports.increaseStat = exports.uploadProfileImage = exports.getAllFriends = exports.removeFriend = exports.addFriend = exports.allUsers = exports.updateUser = exports.deleteUser = exports.logoutAll = exports.logoutUser = exports.me = exports.loginUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new userModel_1.default(req.body);
        const user = yield newUser.save();
        const token = yield user.generateAuthToken();
        res.status(201).json({
            user,
            token,
        });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findByCredentials(req.body.email, req.body.password);
        const token = yield user.generateAuthToken();
        if (user && token) {
            res.status(200).send({ user, token });
        }
    }
    catch (error) {
        res.status(401).send({ message: "Please Authenticate" });
    }
});
exports.loginUser = loginUser;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send({ user: req.user, token: req.token });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.me = me;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (req.user)
            req.user.tokens = (_a = req.user) === null || _a === void 0 ? void 0 : _a.tokens.filter((token) => {
                return token.token != req.token;
            });
        yield ((_b = req.user) === null || _b === void 0 ? void 0 : _b.save());
        res.send({ message: "You're logged out." });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.logoutUser = logoutUser;
const logoutAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        if (req.user)
            req.user.tokens = [];
        (_c = req.user) === null || _c === void 0 ? void 0 : _c.save();
        res.status(200).send("You've successfully logout from all devices.");
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.logoutAll = logoutAll;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user)
            req.user.deleteOne();
        res.status(200).send({ message: "User successfully Deleted" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const isValidOperation = updates.every((update) => allowedFields.includes(update)) &&
            !!updates.length;
        if (!isValidOperation) {
            throw { error: "invalid Operation! ❌" };
        }
        const user = req.user;
        updates.forEach((update) => {
            if (update === "password") {
                user.tokens = user.tokens.filter((tokenObj) => tokenObj.token != req.token);
            }
            user[update] = req.body[update];
        });
        const updatedUser = yield user.save();
        res.status(201).send({ user: updatedUser, token: req.token });
    }
    catch (error) {
        res.status(400).send({ message: "invalid Operation! ❌" });
    }
});
exports.updateUser = updateUser;
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        let users = yield userModel_1.default.find({})
            .where("_id")
            .ne((_d = req.user) === null || _d === void 0 ? void 0 : _d._id)
            .select(" -gender -age -username -phoneNumber -dateOfBirth -profileViews -impressionCount -friends -posts -socialMedia");
        const potentialFriends = [];
        users.forEach(({ email, firstname, surname, _id, occupation, profilePics, }) => {
            potentialFriends.push({
                name: `${firstname} ${surname}`,
                email,
                _id: _id.toString(),
                occupation,
                profilePics: profilePics,
            });
        });
        res.status(200).send({ potentialFriends });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.allUsers = allUsers;
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    try {
        if (!req.user) {
            throw { error: "Please Authenticate" };
        }
        if ((_e = req.user) === null || _e === void 0 ? void 0 : _e.friends.includes(req.body.userId.toString())) {
            throw { error: "Already friends" };
        }
        let validFriend = yield userModel_1.default.findById(req.body.userId);
        if (!(validFriend === null || validFriend === void 0 ? void 0 : validFriend.email)) {
            throw { error: "Not a valid friends" };
        }
        req.user["friends"] = (_f = req.user) === null || _f === void 0 ? void 0 : _f.friends.concat(validFriend === null || validFriend === void 0 ? void 0 : validFriend._id.toString());
        validFriend["friends"] = validFriend === null || validFriend === void 0 ? void 0 : validFriend.friends.concat(req.user._id.toString());
        req.user = yield req.user.save();
        const updatedValidFriend = yield validFriend.save();
        if (!((_g = req.user) === null || _g === void 0 ? void 0 : _g.email) && !(updatedValidFriend === null || updatedValidFriend === void 0 ? void 0 : updatedValidFriend.email)) {
            throw { error: "Unable to update user!" };
        }
        res.status(201).send({ user: req.user, token: req.token });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.addFriend = addFriend;
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    try {
        if (!((_h = req.user) === null || _h === void 0 ? void 0 : _h.friends.includes(req.body.userId.toString()))) {
            throw { error: "Not friends" };
        }
        const validFriend = yield userModel_1.default.findById(req.body.userId);
        if (!validFriend) {
            throw { error: "Not Friends" };
        }
        req.user.friends = (_j = req.user) === null || _j === void 0 ? void 0 : _j.friends.filter((id) => id.toString() !== req.body.userId.toString());
        validFriend.friends = validFriend.friends.filter((id) => { var _a; return id.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString()); });
        yield req.user.save();
        yield validFriend.save();
        res.status(200).send({ user: req.user, token: req.token });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.removeFriend = removeFriend;
const getAllFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l;
    try {
        const friends = yield ((_k = req.user) === null || _k === void 0 ? void 0 : _k.populate("friends", "-gender -age -occupation -username -phoneNumber -dateOfBirth -profileViews -impressionCount -friends -posts -socialMedia"));
        res.status(200).send({
            numberOfFriends: (_l = req.user) === null || _l === void 0 ? void 0 : _l.numberOfFriends,
            friends: friends === null || friends === void 0 ? void 0 : friends.friends,
        });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.getAllFriends = getAllFriends;
const uploadProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    try {
        if (req.user) {
            req.user["profilePics"] = req.body.imageUrl;
            yield ((_m = req.user) === null || _m === void 0 ? void 0 : _m.save());
            res.status(200).send({
                message: "profile pics saved successfully",
            });
        }
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.uploadProfileImage = uploadProfileImage;
const increaseStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user: any = await User.findById(req.body._id);
        // if (!user) throw { error: "Not a valid user" };
        // user.profileViews += 5;
        // user.impressionCount += 20;
        // await user.save();
        const user = yield userModel_1.default.findByIdAndUpdate(req.body._id, {
            $inc: { profileViews: 5, impressionCount: 10 },
        });
        res.status(200).send({ user });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
exports.increaseStat = increaseStat;
