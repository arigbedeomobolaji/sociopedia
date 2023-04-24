import React from "react";
import tw from "tailwind-styled-components";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import { PencilIcon } from "@heroicons/react/24/solid";
import FeatherIcon from "feather-icons-react";

interface AppProps {
  icon: string;
  iconSize?: number;
  socialMediaName: string;
  socialMediaType: string;
}
const SocialProfileWrapper = tw.div`flex items-center justify-between w-full`;

function SocialProfile({
  icon,
  iconSize,
  socialMediaName,
  socialMediaType,
}: AppProps): JSX.Element {
  const isDark = useAppSelector(selectChangeTheme);
  return (
    <SocialProfileWrapper>
      <div className="flex items-center justify-start space-x-4">
        <FeatherIcon
          icon={icon}
          size={iconSize || 20}
          className={`${isDark ? "fill-gray-200" : "fill-gray-800"}`}
        />
        <div className="space-y-1">
          <h3
            className={`${
              isDark ? "text-white" : "text-black"
            } font-bold text-sm font-sans pt-1`}
          >
            {socialMediaName}
          </h3>
          <p
            className={`${
              isDark ? "text-gray-400" : "text-gray-600"
            } font-bold text-xs font-sans`}
          >
            {socialMediaType}
          </p>
        </div>
      </div>
      <div>
        <PencilIcon className="w-5 h-5 cursor-pointer hover:opacity-90" />
      </div>
    </SocialProfileWrapper>
  );
}

export default SocialProfile;
