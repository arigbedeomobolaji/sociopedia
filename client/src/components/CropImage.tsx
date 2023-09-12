import React, { useState, createRef, FC, useEffect, useCallback } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Post1 from "/public/assets/p1.jpeg";
import tw from "tailwind-styled-components";
import { size } from "@material-tailwind/react/types/components/dialog";

const Button = tw.button` w-[120px] mx-auto px-4 py-2 bg-gray-50/70 hover:bg-gray-100/90 backdrop-filter backdrop-blur-lg font-sans font-bold text-black/80 shadow-md rounded-md`;
interface AppProps {
	file: any;
	handleEdittedFile: (file: any) => void;
	handleToggle: (value: boolean, file?: any) => void;
}
const SIZE: size = "lg";
export const CropImage: FC<AppProps> = ({
	file,
	handleEdittedFile,
	handleToggle,
}) => {
	const [cropData, setCropData] = useState("");
	const [croppedFile, setCroppedFile] = useState(null);
	const [scaleX, setScaleX] = useState(1);
	const [scaleY, setScaleY] = useState(1);
	const cropperRef = createRef<ReactCropperElement>();

	const getCropData = () => {
		if (typeof cropperRef.current?.cropper !== "undefined") {
			setCropData(
				cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
			);
		}
	};

	const convertToFileObj = (dataUrl, file) => {
		fetch(dataUrl)
			.then((res) => res.blob())
			.then((blob) => {
				const edittedFile = new File([blob], file.name, {
					type: file.type,
				});
				setCroppedFile(edittedFile);
				return edittedFile;
			});
	};
	const rotate = () => {
		const imageElement = cropperRef?.current;
		const cropper = imageElement?.cropper;
		cropper.rotate(90);
	};

	const flip = (type) => {
		const imageElement = cropperRef?.current;
		const cropper = imageElement?.cropper;
		if (type === "h") {
			cropper.scaleX(scaleX === 1 ? -1 : 1);
			setScaleX(scaleX === 1 ? -1 : 1);
		} else {
			cropper.scaleY(scaleY === 1 ? -1 : 1);
			setScaleY(scaleY === 1 ? -1 : 1);
		}
	};

	useEffect(() => {
		if (croppedFile) {
			handleEdittedFile(croppedFile);
			handleToggle(false);
		}
	}, [croppedFile, handleEdittedFile, handleToggle]);

	useEffect(() => {
		if (cropData) {
			convertToFileObj(cropData, file);
		}
	}, [cropData, file]);

	return (
		<div className="flex flex-col-reverse md:flex-row gap-4 overflow-x-hidden">
			<div className="flex flex-row flex-wrap md:flex-col items-center w-full md:w-[150px] md:max-w-[150px] rounded-md overflow-hidden gap-5 p-2">
				<Button onClick={getCropData} className="cursor-pointer">
					Save
				</Button>
				<Button onClick={rotate} className="cursor-pointer">
					Rotate
				</Button>
				<Button onClick={() => flip("v")} className="cursor-pointer">
					Flip V
				</Button>
				<Button onClick={() => flip("h")} className="cursor-pointer">
					Flip H
				</Button>
			</div>
			<div className="w-full h-[300px] md:h[700px] overflow-hidden">
				{file && (
					<Cropper
						ref={cropperRef}
						style={{
							height: "100%",
							width: "100%",
							objectFit: "contain",
						}}
						zoomTo={0.5}
						initialAspectRatio={1}
						preview=".img-preview"
						src={!!file && URL.createObjectURL(file)}
						viewMode={1}
						minCropBoxHeight={10}
						minCropBoxWidth={10}
						background={false}
						responsive={true}
						autoCropArea={1}
						checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
						guides={true}
					/>
				)}
			</div>
		</div>
	);
};

export default CropImage;
