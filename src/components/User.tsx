import React from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import { useAppSelector } from "@src/libs/hooks";
import { StaticImageData } from "next/image";

interface AppProps {
  profileImage: string | StaticImageData;
  name: string;
  extraDetail: string;
  iconBg?: boolean;
}

// styles
export const User = tw.div`flex items-center justify-between w-full`;
export const ProfileDetails = tw.div` flex items-center justify-start space-x-2`;

function Profile({
  profileImage,
  name,
  extraDetail,
  iconBg = false,
}: AppProps): JSX.Element {
  const isDark = useAppSelector(selectChangeTheme);

  return (
    <User>
      <div>
        <ProfileDetails>
          <div className="w-16 h-16 relative">
            <Image
              className="rounded-full shadow-md"
              src={profileImage}
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
              {extraDetail}
            </p>
          </div>
        </ProfileDetails>
      </div>
      <div>
        <UserPlusIcon
          className={`${
            iconBg ? "bg-blue-800 text-gray-300" : "bg-transparent"
          } w-10 h-10 p-2 rounded-full`}
        />
      </div>
    </User>
  );
}

export default Profile;
