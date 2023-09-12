import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import CropImage from "./CropImage";

interface AppProps {
	handleToggle: (value: boolean, file?: any) => void;
	currentFile: any;
	handleEdittedFile: (file: any) => void;
}

function EditPostFiles2({
	handleToggle,
	currentFile,
	handleEdittedFile,
}: AppProps) {
	return (
		<>
			<div>
				<CropImage
					file={currentFile}
					handleEdittedFile={handleEdittedFile}
					handleToggle={handleToggle}
					// handleEditPostFilesOpen={handleEditPostFilesOpen}
				/>
			</div>
		</>
	);
}

export default EditPostFiles2;
