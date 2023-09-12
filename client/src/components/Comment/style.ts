import tw from "tailwind-styled-components";

interface Dark {
	$dark: boolean;
}

export const Wrapper = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900")}
flex flex-col justify-start shadow-md rounded-md space-y-5 p-4`;
export const Tweet = tw.div`flex items-center justify-start space-x-5`;
export const Textarea = tw.textarea<Dark>`
${(p) => (p.$dark ? "bg-gray-800 text-gray-100" : "text-gray-800")}
 outline-none py-4 px-4  font-heading sm:font-sans sm:text-xs md:text-sm font-light h-28 placeholder-gray-400 placeholder:font-normal w-full rounded-lg`;
export const Icon = tw.div`flex`;
export const IconText = tw.p<Dark>`font-sans font-xs font-medium pl-1
${(p) => (p.$dark ? "text-gray-500" : "text-gray-700")}
`;

export const InputFile = tw.input`hidden`;
