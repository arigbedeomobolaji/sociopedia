import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
} from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/avatar";
import { ChevronDoubleLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import EditPreview2 from "./EditPreview2";
import EditPostFiles2 from "./EditPostFiles2";

const SIZE: size = "lg";

interface AppProps {
	editMediaSize: size;
	handleRemoveFile: (file: any) => void;
	handleEdittedFile: (file: any) => void;
	handleEditMediaOpen: (size: size) => void;
	files: any;
}

function EditMedia({
	editMediaSize,
	files,
	handleEditMediaOpen,
	handleRemoveFile,
	handleEdittedFile,
}: AppProps) {
	const [currentFile, setCurrentFile] = useState(null);

	const handleToggle = (value: boolean, file?: any) => {
		if (value) {
			setCurrentFile(file);
		} else {
			setCurrentFile(null);
		}
	};

	return (
		<>
			<Dialog
				size={editMediaSize}
				open={editMediaSize === SIZE}
				handler={handleEditMediaOpen}
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
							{currentFile ? "Edit File" : "Edit Photos/Videos"}
						</Typography>
						{currentFile ? (
							<ChevronDoubleLeftIcon
								className="w-7 h-7 font-bold p-1 cursor-pointer bg-gray-200 rounded-full text-gray-700"
								onClick={() => handleToggle(false)}
							/>
						) : (
							<XMarkIcon
								className="w-7 h-7 font-bold p-1 cursor-pointer bg-gray-200 rounded-full text-gray-700"
								onClick={() => handleEditMediaOpen(null)}
							/>
						)}
					</div>
				</DialogHeader>
				<DialogBody
					divider
					className="max-h-[30rem] sm:max-h-[40rem] w-full overflow-scroll"
				>
					{currentFile ? (
						<EditPostFiles2
							handleToggle={handleToggle}
							currentFile={currentFile}
							handleEdittedFile={handleEdittedFile}
						/>
					) : (
						<EditPreview2
							files={files}
							handleRemoveFile={handleRemoveFile}
							handleEdittedFile={handleEdittedFile}
							handleToggle={handleToggle}
						/>
					)}
				</DialogBody>
				<DialogFooter>
					<Button
						variant="gradient"
						color="green"
						onClick={() => handleEditMediaOpen(null)}
					>
						<span>Go Back </span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
}
export default EditMedia;
