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
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = Number(process.env.SALT_ROUNDS);
const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
exports.userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator_1.default.isEmail(value);
            },
            message: (props) => `${props.value} is not a valid Email Address!`,
        },
    },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    gender: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
// Hash Password before saving to DB
exports.userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield bcrypt_1.default.hash(user.password, saltRounds);
        }
        next();
    });
});
// Generate Auth token for user
exports.userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = this;
            const token = yield jsonwebtoken_1.default.sign({ _id: user._id.toString(), email: user.email }, tokenSecretKey, { expiresIn: "7 days" });
            user.tokens = user.tokens.concat({ token });
            const savedUser = yield user.save();
            return token;
        }
        catch (error) {
            return error;
        }
    });
};
// Find a user by email and password ==> Login user
exports.userSchema.statics.findByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email });
    if (!user) {
        throw new Error("Please Authenticate");
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Please Authenticate");
    }
    return user;
});
exports.userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    userObject.createdAt = userObject.createdAt.getTime();
    userObject.updatedAt = userObject.updatedAt.getTime();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
exports.userSchema.virtual("numberOfFriends").get(function () {
    return this.friends.length;
});
const User = (0, mongoose_1.model)("user", exports.userSchema);
exports.default = User;
