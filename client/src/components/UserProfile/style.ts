import tw from "tailwind-styled-components";

interface Dark {
	$dark: boolean;
}
export const UserProfileWrapper = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900")}
flex items-start flex-col space-y-5 rounded-3xl shadow-lg p-5 w-[300px]
`;
export const BorderLine = tw.div<Dark>`
${(p) => (p.$dark ? "border-gray-200" : "border-gray-600")}
w-full border-solid border-[1px] opacity-25 shadow-md
`;
export const Location = tw.div`flex items-start justify-start flex-col space-y-2 text-sm font-semibold w-full`;
export const ItemFlex = tw.div`flex items-center justify-start space-x-5`;
export const Impressions = tw.div`
w-full
`;
export const Impression = tw.div`flex items-center justify-between hover:opacity-90`;
export const ImpressionText = tw.p<Dark>`
${(p) => (p.$dark ? "text-gray-300" : "text-gray-800")} 
font-bold text-xs font-sans max-w-[200px] py-2`;
export const ImpressionCount = tw.h3<Dark>`
${(p) => (p.$dark ? "text-gray-300" : "text-gray-800")} 
font-bold text-xs font-sans py-1
`;
