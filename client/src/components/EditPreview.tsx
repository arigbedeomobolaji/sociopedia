import React, { useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Typography,
} from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import Image from "next/image";
import EditPostFiles from "./EditPostFiles";

const SIZE: size = "lg";

interface AppProps {
	editPreviewSize: size;
	handleEditPreviewOpen: (value: size) => void;
	files: any;
	handleRemoveFile: (file: any) => void;
	handleEdittedFile: (file: any) => void;
}

function EditPreview({
	editPreviewSize,
	handleEditPreviewOpen,
	handleEdittedFile,
	files,
	handleRemoveFile,
}: AppProps) {
	const [currentFile, setCurrentFile] = useState(null);
	const [togglePanel, setTogglePanel] = useState(false);
	const [editPostFilesSize, setEditPostFilesSize] = useState<size>(null);
	const handleEditPostFilesOpen = (value: size) =>
		setEditPostFilesSize(value);
	console.log(SIZE);

	const handleToggle = (value: boolean, file?: any) => {
		setTogglePanel(value);
		if (value) {
			setCurrentFile(file);
		}
		handleEditPostFilesOpen(SIZE);
	};
	return (
		<>
			<Dialog
				size={SIZE}
				open={editPreviewSize === SIZE}
				handler={handleEditPreviewOpen}
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
							Edit Photos/Videos
						</Typography>
						<XMarkIcon
							className="w-7 h-7 font-bold p-1 cursor-pointer bg-gray-200 rounded-full text-gray-700"
							onClick={() => handleEditPreviewOpen(null)}
						></XMarkIcon>
					</div>
				</DialogHeader>

				<DialogBody divider className="max-h-[40rem] overflow-scroll">
					{files ? (
						<div className="flex justify-center w-full h-full flex-wrap bg-white/75 backdrop-blur-lg flex-1 gap-3">
							{files.map((file, index) => {
								return (
									<div
										className="relative w-full max-w-[600px] min-w-[400px] h-[250px]"
										key={index}
									>
										<div className="absolute top-0 left-0 right-0 z-50 flex justify-between p-2">
											<button
												className="bg-white hover:bg-white/75 px-5 py-1 rounded-md shadow-md flex items-center justify-center"
												onClick={() =>
													handleToggle(true, file)
												}
											>
												<PencilIcon className="w-4 h-4 text-black" />
												<span className="font-sans font-bold text-gray-800 text-[13px]">
													Editor
												</span>
											</button>
											<XMarkIcon
												className="w-7 h-7 font-bold p-1 cursor-pointer bg-gray-200 rounded-full text-gray-700"
												onClick={() =>
													handleRemoveFile(file)
												}
											></XMarkIcon>
										</div>
										<Image
											src={URL.createObjectURL(file)}
											alt=""
											sizes="(max-width: 768px) 100vw, 700px"
											fill
										/>
									</div>
								);
							})}
						</div>
					) : (
						<Typography variant="h6" color="red">
							No files to display
						</Typography>
					)}
				</DialogBody>
				<DialogFooter>
					<Button
						variant="gradient"
						color="green"
						onClick={() => handleEditPreviewOpen(null)}
					>
						<span>Go Back </span>
					</Button>
				</DialogFooter>
			</Dialog>
			<EditPostFiles
				editPostFilesSize={editPostFilesSize}
				handleEditPostFilesOpen={handleEditPostFilesOpen}
				handleEdittedFile={handleEdittedFile}
				currentFile={currentFile}
				handleToggle={handleToggle}
			/>
		</>
	);
}

export default EditPreview;
