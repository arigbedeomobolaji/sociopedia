import Resizer from "react-image-file-resizer";

export enum OutputType {
	file = "file",
	blob = "blob",
	base64 = "base64",
}

export interface ResizeProps {
	file: any;
	width: number;
	height: number;
	compressionSize: number;
	outputType: OutputType;
}
const imageOptimizer = ({
	file,
	width,
	height,
	compressionSize = 100,
	outputType = OutputType.file,
}: ResizeProps) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			width,
			height,
			"JPEG",
			compressionSize,
			0,
			(uri) => {
				resolve(uri);
			},
			outputType
		);
	});

export default imageOptimizer;
