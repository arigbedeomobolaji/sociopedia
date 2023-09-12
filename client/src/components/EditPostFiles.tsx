import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
} from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import CropImage from "./CropImage";
import { XMarkIcon } from "@heroicons/react/24/solid";

const SIZE: size = "lg";

interface AppProps {
	editPostFilesSize: size;
	handleEditPostFilesOpen: (value: size) => void;
	handleToggle: (value: boolean, file?: any) => void;
	currentFile: any;
	handleEdittedFile: (file: any) => void;
}
function EditPostFiles({
	handleToggle,
	currentFile,
	handleEdittedFile,
	editPostFilesSize,
	handleEditPostFilesOpen,
}: AppProps) {
	return (
		<>
			<Dialog
				size={SIZE}
				open={editPostFilesSize === SIZE}
				// handler={handleEditPostFilesOpen}
				handler={() => {}}
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
							onClick={() => handleEditPostFilesOpen(null)}
						></XMarkIcon>
					</div>
				</DialogHeader>

				<DialogBody divider>
					<CropImage
						file={currentFile}
						handleEdittedFile={handleEdittedFile}
						handleToggle={handleToggle}
						// handleEditPostFilesOpen={handleEditPostFilesOpen}
					/>
				</DialogBody>
				<DialogFooter>
					<Button
						variant="gradient"
						color="green"
						onClick={() => handleToggle(false)}
					>
						<span>Continue</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
}

export default EditPostFiles;
