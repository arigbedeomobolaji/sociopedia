import React, { FC, useEffect, useRef, useState } from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
	Textarea,
} from "@material-tailwind/react";
import {
	PencilIcon,
	PhotoIcon,
	PlusCircleIcon,
	UserCircleIcon,
	VideoCameraIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import { UserData, selectMe } from "@src/store/slice/userDataSlice";
import { useAppDispatch, useAppSelector } from "@src/libs/hooks";
import { UserInfo } from "@src/store/slice/authSlice";
import Image from "next/image";
import imagePrependUrl from "@src/libs/imageUrl";
import imageOptimizer, { OutputType } from "@src/libs/imageOptimizer";
import { size } from "@material-tailwind/react/types/components/dialog";
import { createPostApi } from "@src/store/slice/createPostSlice";
import EditMedia from "./EditMedia";

interface AppProps {
	tweet: string;
	createPostSize: size;
	handleCreatePostOpen: (value: size) => void;
	handleTweet: (e: any) => void;
}

const SIZE: size = "lg";

const CreatePost: FC<AppProps> = ({
	handleCreatePostOpen,
	handleTweet,
	tweet,
	createPostSize,
}): JSX.Element => {
	const dispatch = useAppDispatch();
	const userData: UserData = useAppSelector(selectMe).userData;
	const user: UserInfo = userData?.user;
	const profileImage = user?.profilePics;
	const token = userData?.token;
	const imageRef = useRef(null);
	const videoRef = useRef(null);
	const mediaRef = useRef(null);
	const [files, setFiles] = useState([]);
	const [hasFile, setHasFile] = useState(false);
	const [error, setError] = useState("");
	const firstMedia = files[0];

	useEffect(() => {
		setHasFile(!!files.length);
	}, [files]);

	const [editMediaSize, setEditMediaSize] = useState<size>(null);

	const handleEditMediaOpen = (value) => {
		if (!value) {
			handleCreatePostOpen("lg");
		}

		setEditMediaSize(value);
	};

	const handleEdittedFile = (file) => {
		const index = files.findIndex((f) => f.name === file.name);

		if (index >= 0) {
			files[index] = file;
		}
	};
	const handleRemoveFile = (file) => {
		setFiles(files.filter((f) => f.name !== file.name));
		handleCreatePostOpen(SIZE);
	};
	// React toast to display alert.
	const notify = (message) => toast(message);

	const handleClick = (refObject: React.MutableRefObject<any>): void => {
		if (files.length) {
			setHasFile(true);
		}
		// open file input box on click of another element
		refObject.current.click();
	};

	const handleFileChange = async (event) => {
		try {
			setError("");
			// The file object
			const newFiles = Object.keys(event.target.files).map(
				(key) => event.target.files[key]
			);
			// for single image upload
			// const fileObj = event.target.files && event.target.files[0];
			if (!newFiles.length) {
				throw { message: "error uploading File" };
			}
			// reset file input
			event.target.value = null;

			let resizedFile = [];
			newFiles.forEach(async (fileObj) => {
				let file;
				if (fileObj.type.includes("image")) {
					file = await imageOptimizer({
						file: fileObj,
						width: 1000,
						height: 500,
						compressionSize: 70,
						outputType: OutputType.file,
					});
				} else {
					if (fileObj.size > 10398156) {
						throw {
							message: "File Size is too big please compress.",
						};
					}
					file = fileObj;
				}

				if (!file) {
					throw { message: "can't optimize " };
				}
				resizedFile = resizedFile.concat(file);
				setFiles(files.concat(resizedFile));
				setHasFile(true);
			});
		} catch (error) {
			setError(error.message);
			notify(error.message);
		}
	};

	const handlePost = async (): Promise<void> => {
		if (token && (tweet || files)) {
			const createdPost: any = await dispatch(
				createPostApi({
					token,
					tweet,
					files,
				})
			);
			if (createdPost.type.includes("fulfilled")) {
				handleTweet("");
				handleCreatePostOpen(null);
			}
		}
	};
	return (
		<>
			<Dialog
				size={createPostSize}
				open={createPostSize === SIZE}
				handler={handleCreatePostOpen}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
			>
				<DialogHeader>
					<div className="flex justify-between items-center w-full">
						<Typography
							variant="h6"
							color="blue-gray"
							className="flex-1 text-center"
						>
							{" "}
							Create post
						</Typography>
						<XMarkIcon
							className="w-7 h-7 font-bold p-1 cursor-pointer bg-gray-200 rounded-full text-gray-700"
							onClick={() => handleCreatePostOpen(null)}
						></XMarkIcon>
					</div>
				</DialogHeader>
				<DialogBody
					divider
					className="max-h-[30rem] sm:max-h-[40rem] overflow-scroll"
				>
					{error && <ToastContainer />}
					{/* Display User Image and Name */}
					<div
						id="user"
						className="flex justify-start items-center gap-1"
					>
						<div className="w-10 h-10 relative">
							{profileImage ? (
								<Image
									className="rounded-full shadow-md"
									src={`${imagePrependUrl}${profileImage}`}
									fill
									sizes="(max-width: 768px) 100vw, 700px"
									object-fit="contain"
									alt="Profile Image"
									priority
								/>
							) : (
								<UserCircleIcon className="w-full bg-transparent" />
							)}
						</div>
						<p className="font-sans text-sm font-bold text-black">
							{user?.surname} {user?.firstname}
						</p>
					</div>
					{/* Display Textarea for User Caption */}
					<div className="mt-3">
						<Textarea
							variant="standard"
							label="What's on your mind"
							size="lg"
							value={tweet}
							color="blue-gray"
							onChange={(e) => handleTweet(e)}
						/>
					</div>
					{/* Display Image Selected */}
					{!!files.length && (
						<div id="displayImage" className="relative">
							<div className="absolute justify-between z-50 left-0 right-0 flex flex-wrap items-center px-3 py-2">
								<div className="flex flex-wrap md:flex-nowrap gap-3">
									<button
										className="flex space-x-1 justify-start items-center px-5 py-2 rounded-lg shadow-md bg-white bg-opacity-95 text-gray-700 hover:bg-opacity-90 outline-none"
										onClick={() =>
											handleEditMediaOpen(SIZE)
										}
									>
										<PencilIcon className="w-4 h-4 text-black" />
										<span className="font-sans font-bold text-gray-800 text-[13px]">
											{files.length > 1
												? "Edit All"
												: "Edit"}
										</span>
									</button>
									<input
										type="file"
										hidden
										ref={mediaRef}
										multiple
										accept="image/*,video/*"
										onChange={handleFileChange}
									/>
									<button
										className="flex space-x-1 justify-start items-center px-5 py-2 rounded-lg shadow-md bg-white bg-opacity-95 text-gray-700 hover:bg-opacity-90 outline-none"
										onClick={() => handleClick(mediaRef)}
									>
										<PlusCircleIcon className="w-4 h-4 text-black" />
										<span className=" flex font-sans font-bold text-gray-800 text-[12px] md:text-[13px]">
											{"Add Photos/Videos"}
										</span>
									</button>
								</div>

								<XMarkIcon
									className="w-8 h-8 p-1 rounded-full bg-white bg-opacity-95 text-gray-700 hover:bg-opacity-90 cursor-pointer"
									onClick={() => {
										setFiles([]);
										setHasFile(false);
									}}
								/>
							</div>
							<div className="relative w-full] h-[60vh] mb-2">
								{firstMedia.type.includes("image") ? (
									<Image
										src={URL.createObjectURL(firstMedia)}
										fill
										sizes="(max-width: 768px) 100vw, 700px"
										object-fit="contain"
										alt="Profile Image"
										priority
										className="rounded-md shadow-md"
									/>
								) : (
									<>
										<video
											className="h-full w-full rounded-lg"
											controls
											muted
										>
											<source
												src={URL.createObjectURL(
													firstMedia
												)}
												type={firstMedia.type}
											/>
											Your browser does not support the
											video target
										</video>
									</>
								)}
							</div>
							<div
								className={`flex flex-wrap flex-1 gap-3 w-full ${
									files.length > 0 && "min-h-[300px]"
								}`}
							>
								{files.map((file, index) => {
									return (
										index > 0 && (
											<div
												key={file.name + index}
												className={`relative flex-grow min-w-[200px] max-w-[500px] h-[${
													50 *
													(((2 * index) / index) * 3)
												}px]`}
											>
												{file.type.includes("image") ? (
													<Image
														src={URL.createObjectURL(
															file
														)}
														fill
														sizes="(max-width: 768px) 100vw, 700px"
														object-fit="contain"
														alt="Profile Image"
														priority
														className="rounded-md shadow-md"
													/>
												) : (
													<>
														<video
															className="h-full w-full rounded-lg"
															controls
															muted
														>
															<source
																src={URL.createObjectURL(
																	file
																)}
																type={file.type}
															/>
															Your browser does
															not support the
															video target
														</video>
													</>
												)}
											</div>
										)
									);
								})}
							</div>
						</div>
					)}
					{/* Feature for adding Video or Photo */}
					<div className="flex justify-between gap-2 mt-3 border-gray-300 rounded-md shadow-md p-3 border">
						<Typography
							variant="small"
							className="font-bold font-sans text-black"
						>
							Add to your post{" "}
						</Typography>
						<div className="flex justify-end gap-2">
							<input
								type="file"
								hidden
								multiple
								ref={imageRef}
								accept="image/*"
								onChange={handleFileChange}
							/>
							<PhotoIcon
								className={`${
									hasFile
										? "text-gray-500 opacity-95 pointer-events-none"
										: "text-green-500 cursor-pointer"
								} w-6 h-6 `}
								onClick={() => handleClick(imageRef)}
							/>
							<input
								type="file"
								hidden
								ref={videoRef}
								multiple
								accept="video/*"
								onChange={handleFileChange}
							/>
							<VideoCameraIcon
								onClick={() => handleClick(videoRef)}
								className={`${
									hasFile
										? "text-gray-500 opacity-95   pointer-events-none"
										: "cursor-pointer"
								} w-6 h-6 `}
							/>
						</div>
					</div>
				</DialogBody>
				<DialogFooter>
					<Button
						variant="gradient"
						color="green"
						disabled={!(tweet || files.length)}
						onClick={handlePost}
					>
						<span>Post</span>
					</Button>
				</DialogFooter>
			</Dialog>
			{hasFile && (
				<EditMedia
					editMediaSize={editMediaSize}
					handleEditMediaOpen={handleEditMediaOpen}
					files={files}
					handleRemoveFile={handleRemoveFile}
					handleEdittedFile={handleEdittedFile}
				/>
			)}
		</>
	);
};

export default CreatePost;
