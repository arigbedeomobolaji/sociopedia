import { useAppSelector } from "@src/libs/hooks";
import Image from "next/image";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import React from "react";
import tw from "tailwind-styled-components";
import Info4 from "/public/assets/info4.jpeg";

interface Dark {
	$dark: boolean;
}
const Wrapper = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900")}
flex items-start flex-col space-y-2 rounded-xl shadow-lg p-5 max-w-[300px]`;
const ImageWrapper = tw.div`relative w-full h-[200px]`;

export default function CreateAds() {
	const isDark = useAppSelector(selectChangeTheme);
	return (
		<Wrapper $dark={isDark}>
			<div className="flex items-center justify-between w-full">
				<h3
					className={`${isDark ? "text-gray-50" : "text-gray-900"} 
font-bold text-xs lg:text-sm font-sans py-1`}
				>
					Sponsored
				</h3>
				<p
					className={`${
						isDark ? "text-gray-400" : "text-gray-800"
					} font-bold text-xs  font-sans hover:opacity-90 cursor-pointer`}
				>
					Create Ad
				</p>
			</div>
			<ImageWrapper>
				<Image
					src={Info4}
					alt="Ads"
					sizes="(max-width: 768px) 100vw, 700px"
					fill
					object-fit="contain"
					priority={true}
					className="rounded-md shadow-md"
				/>
			</ImageWrapper>
			<div className="flex items-center justify-between w-full">
				<h3
					className={`${
						isDark ? "text-gray-200" : "text-gray-900"
					} font-semibold text-xs font-sans py-1`}
				>
					MikaCosmetics
				</h3>
				<p
					className={`${
						isDark ? "text-gray-400" : "text-gray-800"
					} font-bold text-xs  font-sans hover:opacity-90 cursor-pointer break-words`}
				>
					mikacosmetics.com
				</p>
			</div>
			<p
				className={`${
					isDark ? "text-gray-400" : "text-gray-800"
				} font-bold text-sm  font-sans hover:opacity-90`}
			>
				Your pathway to stunning and made sure your skin is exfoliating
				skin and shining like light.
			</p>
		</Wrapper>
	);
}
