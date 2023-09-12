import { Response } from "express";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { IUserRequest } from "src/middleware/auth";
import dotenv from "dotenv";

dotenv.config();

const region = process.env.AWS_REGION;

AWS.config.update({ region });

const S3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY!,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	signatureVersion: "v4",
});

export const upload = async (req: IUserRequest, res: Response) => {
	try {
		const contentType: string = "image/jpeg";
		const extension = "jpeg";
		const key = `${req.user?._id}/${uuidv4()}.${extension}`;
		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: key,
			ContentType: contentType,
		};

		const url = await S3.getSignedUrlPromise("putObject", params);
		res.status(200).send({ url, key });
	} catch (error) {
		res.status(500).send(error);
	}
};
interface File {
	name: string;
	type: string;
	size: number;
}

async function getUrl(file: any, userId: string) {
	const ContentType: string = file.type;
	const extension = ContentType.split("/")[1];
	const key = `${userId}/${uuidv4()}.${extension}`;
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: key,
		ContentType,
	};
	const url = await S3.getSignedUrlPromise("putObject", params);

	if (url) {
		return { url, key };
	}
}

export const uploadPostPics = async (req: IUserRequest, res: Response) => {
	try {
		const files: any[] = req.body.files;
		let counter = 0;
		let totalCount = files.length;
		if (!totalCount) {
			throw { error: "No file(s)" };
		}

		let postImageData: any[] = [];
		files.forEach(async (file) => {
			const data = await getUrl(file, req.user?._id);
			if (data) {
				postImageData = postImageData.concat(data);
				counter = counter + 1;
				if (counter === totalCount) {
					res.status(200).send(postImageData);
				}
			}
		});
	} catch (error) {
		res.status(500).send(error);
	}
};
