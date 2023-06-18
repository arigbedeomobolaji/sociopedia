import React from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import { useAppSelector } from "@src/libs/hooks";
import { StaticImageData } from "next/image";

interface AppProps {
  friendImage: string | StaticImageData;
  name: string;
  occupation: string;
  iconBg?: boolean;
}

// styles
export const FriendWrapper = tw.div`flex items-center justify-between w-full`;
export const FriendDetail = tw.div` flex items-center justify-start space-x-2`;

function Friend({
  friendImage,
  name,
  occupation,
  iconBg = true,
}: AppProps): JSX.Element {
  const isDark = useAppSelector(selectChangeTheme);

  return (
    <FriendWrapper>
      <div>
        <FriendDetail>
          <div className="w-16 h-16 relative">
            <Image
              className="rounded-full shadow-md"
              src={friendImage}
              fill
              object-fit="contain"
              alt="Profile Image"
              priority
            />
          </div>
          <div>
            <h3
              className={`${
                isDark ? "text-white" : "text-black"
              } font-bold text-xs font-sans py-1 cursor-pointer hover:opacity-90`}
            >
              {name}
            </h3>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } font-bold text-xs font-sans`}
            >
              {occupation}
            </p>
          </div>
        </FriendDetail>
      </div>
      <div>
        <UserPlusIcon
          className={`${
            iconBg ? "bg-blue-800 text-gray-300" : "bg-transparent"
          } w-10 h-10 p-2 rounded-full`}
        />
      </div>
    </FriendWrapper>
  );
}

export default Friend;
