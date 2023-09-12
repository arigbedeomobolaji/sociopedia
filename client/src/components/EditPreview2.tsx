import React, { useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import Image from "next/image";
import EditPostFiles from "./EditPostFiles";

const SIZE: size = "lg";

interface AppProps {
	files: any;
	handleRemoveFile: (file: any) => void;
	handleEdittedFile: (file: any) => void;
	handleToggle: (value: boolean, file?: any) => void;
}

function EditPreview2({ handleToggle, files, handleRemoveFile }: AppProps) {
	return (
		<>
			<div className="w-[100%] overflow-x-hidden">
				{files ? (
					<div className="flex justify-center w-full h-full flex-wrap bg-white/75 backdrop-blur-lg flex-1 gap-3">
						{files.map((file, index) => {
							return (
								<div
									className="relative w-full max-w-[600px] min-w-[400px] h-[250px]"
									key={index}
								>
									<div className="absolute top-0 left-12 right-12 md:left-2 md:right-2 z-50 flex justify-between p-2">
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
			</div>
		</>
	);
}

export default EditPreview2;
