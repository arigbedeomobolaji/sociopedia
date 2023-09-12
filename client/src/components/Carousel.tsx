import React, { FC } from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import imagePrependUrl from "@src/libs/imageUrl";

interface AppProps {
	images: StaticImageData[] | string[];
}

const CarouselDefault: FC<AppProps> = ({ images }): JSX.Element => {
	return (
		<Carousel className="rounded-xl w-full h-[300px] md:h-[500px] overflow-hidden flex items-center bg-blue-50">
			{images.map((image, index) => (
				<div className="relative w-full h-full" key={index}>
					<Image
						src={`${imagePrependUrl}${image}`}
						alt=""
						object-fit="contain"
						priority
						fill
						sizes="(max-width: 768px) 100vw, 700px"
						className="h-full w-full object-cover"
					/>
				</div>
			))}
		</Carousel>
	);
};

export default CarouselDefault;
