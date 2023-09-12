import React, { useEffect, useRef, useState } from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
	Input,
	Alert,
} from "@material-tailwind/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import imageOptimizer, { OutputType } from "@src/libs/imageOptimizer";
import { useAppDispatch, useAppSelector } from "@src/libs/hooks";
import {
	UploadPicsDataApi,
	selectUploadPics,
	UploadPicsInitialState,
	uploadpicsApi,
} from "@src/store/slice/uploadPicsSlice";
import {
	UserData,
	getMe,
	getMeApi,
	selectMe,
} from "@src/store/slice/userDataSlice";
import { updateUserApi } from "@src/store/slice/updateUserSlice";
interface AppProps {
	open: boolean;
	handleOpen: () => void;
}
function UploadProfilePics({ open, handleOpen }: AppProps) {
	const imageRef = useRef(null);
	const [file, setFile] = useState(null);
	const dispatch = useAppDispatch();
	const userData: UserData = useAppSelector(selectMe).userData;
	const token = userData?.token;
	const uploadPicsData: UploadPicsInitialState =
		useAppSelector(selectUploadPics);
	const error = uploadPicsData?.error;
	const loading = uploadPicsData?.loading;
	// const uploadPics = uploadPicsData?.uploadPics;

	const handleClick = (ObjectRef: React.MutableRefObject<any>): void => {
		ObjectRef.current.click();
	};

	const handleFileChange = async (event) => {
		try {
			const file = event.target.files && event.target.files[0];
			if (!file) {
				return;
			}
			// reset file input
			event.target.value = null;
			const image = await imageOptimizer({
				file,
				width: 250,
				height: 250,
				compressionSize: 60,
				outputType: OutputType.file,
			});
			if (image) {
				setFile(image);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpload = async () => {
		const data: UploadPicsDataApi = {
			token,
			file,
		};

		const generateUploadUrl: any = await dispatch(uploadpicsApi(data));
		if (generateUploadUrl.type === "upload/picture/fulfilled") {
			const updateUser: any = await dispatch(
				updateUserApi({
					token,
					profilePics: generateUploadUrl.payload.key,
				})
			);
			if (updateUser.type === "updateUser/fulfilled") {
				dispatch(getMeApi(token));
				setFile(null);
				handleOpen();
			}
		}
	};

	return (
		<>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>Upload Image</DialogHeader>
				<DialogBody divider className="">
					<div>
						<div className="p-3 flex md:justify-around items-center gap-4 flex-wrap sm:justify-start">
							<input
								type="file"
								hidden
								ref={imageRef}
								accept="image/*"
								onChange={handleFileChange}
							/>
							<div className="flex justify-start items-center">
								<PhotoIcon
									className="w-6 h-6 text-red-500 cursor-pointer"
									onClick={() => handleClick(imageRef)}
								/>
								<Typography variant="lead" className="text-xs">
									Upload Image
								</Typography>
							</div>
							{file && (
								<Typography
									variant="paragraph"
									color="blue-gray"
								>
									{file.name} - {file.size / 1000}kb
								</Typography>
							)}
						</div>
						{error && (
							<Alert className="text-xs text-red-500 bg-red-50">
								{error}
							</Alert>
						)}
					</div>
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="red"
						onClick={handleOpen}
						className="mr-1"
					>
						<span>Cancel</span>
					</Button>
					{file && (
						<Button
							variant="gradient"
							color="blue"
							disabled={loading && !error}
							size="sm"
							onClick={handleUpload}
						>
							<span>upload</span>
						</Button>
					)}
				</DialogFooter>
			</Dialog>
		</>
	);
}

export default UploadProfilePics;
