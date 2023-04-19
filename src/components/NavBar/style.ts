import tw from 'tailwind-styled-components';
interface Dark {
    $dark : boolean;
}
export const DesktopWrapper = tw.div<Dark>`
${(p) => (p.$dark ? "bg-black text-white":"bg-gray-100 text-black")} 
sticky top-0 z-50  hidden md:grid grid-cols-5 h-24 flex-grow  shadow-md`
export const DesktopWrapperLeft = tw.div`flex items-center justify-start px-10 lg:px-5 md:px-3 space-x-10 md:space-x-3 col-span-2`;
export const DesktopWrapperRight = tw.div`col-span-3 flex items-center justify-end h-full text-gray-600 sm:pr-5 md:pr-5 lg:pr-10 space-x-10 md:space-x-5`;
export const PageLogo = tw.h1`text-2xl md:text-xl lg:text-2xl hover:scale-105 text-blue-500 font-semibold cursor-pointer`;
export const SearchWrapper = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-800 text-white":"bg-white text-black")}
flex items-center shadow-lg w-96 md:w-80 h-2/4 rounded-lg mx-2 flex-1`
export const Input = tw.input<Dark>`
${(p) => (p.$dark ? "text-gray-400":"text-gray-700")}
bg-transparent h-full mr-4 outline-none pl-5 font-heading text-xl font-normal  placeholder-gray-300 placeholder:font-normal flex-1`
const UserDetails = tw.div` `;
export const UserLoggedInMenu = tw.div`relative w-[150px] bg-gray-100 shadow-lg h-10 rounded-full rounded-l-none rounded-r-none`;
export const UserProfile = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-800 text-gray-400":"bg-white text-black")}
flex items-center justify-between w-full h-full p-4 font-mono text-xs font-semibold`;
export const UserLoggedOutMenu = tw.div`flex items-center justify-between`;
export const DropDownMenu = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-900 text-gray-400":"bg-white text-black")}
absolute top-10 w-full shadow-md p-2 space-y-2`
export const DropDownItem = tw.p`hover:text-gray-500 p-4 cursor-pointer`
export const Btn = tw.button`outline-none cursor-pointer rounded-md py-4 px-7 md:px-3 text-ray-900 text-sm md:text-xs font-mono font-normal hover:scale-105`;

export const MobileWrapper = tw(DesktopWrapper)`grid grid-cols-6 items-center justify-between md:hidden px-5`;
export const MobileWrapperLeft = tw.div`col-span-2`;
export const MobileWrapperMiddle = tw.div<Dark>`

${(p) => (p.$dark ? "bg-gray-800 text-gray-400":"bg-white text-black")}
col-span-3 flex items-center justify-end h-2/4 shadow-lg rounded-md`;
export const MobileWrapperRight = tw.div`col-span-1 justify-self-end`;
export const MobileDropDownMenu = tw(DropDownMenu)`top-20 right-0 w-[150px]`;



// export const HeaderWrapper = tw.header`sticky top-0 z-50 bg-white shadow-md p-5 grid grid-cols-10 md:px-10`;
// export const LeftBar = tw.div`relative flex items-center h-10 cursor-pointer col-span-2`;
// export const MiddleBar = tw.div`flex items-center shadow-lg bg-red-500 rounded-full py-2 col-span-5 mx-2 border-red-50 border-2`;
// export const RightBar = tw.div`flex items-center justify-end col-span-3 space-x-2 md:space-x-4 text-gray-500`;
// export const Filter = tw.div`flex flex-col col-span-9 mx-auto mt-5`;
// export const Input = tw.input`bg-transparent outline-none pl-5 text-xs sm:text-sm text-gray-600 placeholder-gray-300 flex-grow`;
// export const Text = tw.p``;
// export const Title = tw.h2``;
// export const DivWrapper = tw.div`flex items-center justify-center space-x-2 border border-gray-50 p-2 px-3 mx-2 shadow-md rounded-full`;
// export const ExpectedGuest = tw.div`flex items-center py-3 border-b-2 border-red-50`;
// export const ExpectedGuestTitle = tw(
// 	Title
// )`flex-grow text-gray-500 semi-bold text-xl`;
// export const ExpectedGuestInput = tw.input`w-12 rounded-xl bg-gray-100 outline-none shadow-xl text-center text-red-500`;

// export const Actions = tw.div`flex space-x-4 mx-5`;
// export const Action = tw.div`flex-grow text-center p-3 text-gray-600 cursor-pointer`;
