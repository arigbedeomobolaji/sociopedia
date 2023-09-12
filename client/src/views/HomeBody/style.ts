import tw from "tailwind-styled-components";

interface Dark {
	$dark: boolean;
}

export const Container = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-950 text-gray-100" : "bg-gray-100 text-gray-950")}
px-6 py-6`;
export const DesktopWrapper = tw.div`max-w-[1350px] mx-auto space-x-5 flex justify-around`;
export const DesktopLeft = tw.div`space-y-4 ml-2`;
export const DesktopMiddle = tw.div`flex-grow`;
export const DesktopRight = tw.div`space-y-5`;
