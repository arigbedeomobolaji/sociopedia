import tw from "tailwind-styled-components"

interface Dark {
    $dark: boolean;
}

export const Container = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-950 text-gray-100" : "bg-gray-100 text-gray-950")}
px-6 py-6`;
export const DesktopWrapper = tw.div`max-w-[1400px] mx-auto mt-4 gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-start justify-between`; 
export const DesktopLeft = tw.div`col-span-1`;
export const DesktopMiddle = tw.div`lg:grid-col-1 xl:col-span-2`;
export const DesktopRight = tw.div`col-span-1 space-y-10`;