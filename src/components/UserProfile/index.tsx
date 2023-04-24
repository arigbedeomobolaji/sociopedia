import React from "react";
import { ArchiveBoxIcon, MapPinIcon } from "@heroicons/react/24/solid";
import ProfileImage from "public/assets/p4.jpeg";
import {
  UserProfileWrapper,
  BorderLine,
  Location,
  ItemFlex,
  SocialProfiles,
  Impressions,
  Impression,
  ImpressionText,
  ImpressionCount,
} from "./style";
import User from "@components/User";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import SocialProfile from "../SocialProfile";

function UserProfile() {
  const isDark = useAppSelector(selectChangeTheme);

  return (
    <UserProfileWrapper $dark={isDark}>
      <User
        profileImage={ProfileImage}
        name="fake man"
        extraDetail={`${2} friends`}
      />
      <BorderLine $dark={isDark} />
      <Location>
        <ItemFlex>
          <MapPinIcon className="w-6 h-6" />
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Fake Location, CA
          </p>
        </ItemFlex>
        <ItemFlex>
          <ArchiveBoxIcon className="w-6 h-6" />
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Fake Con Man
          </p>
        </ItemFlex>
      </Location>
      <BorderLine $dark={isDark} />
      <Impressions>
        <Impression>
          <ImpressionText $dark={isDark}>
            Who's views your profile
          </ImpressionText>
          <ImpressionCount $dark={isDark}>7637</ImpressionCount>
        </Impression>
        <Impression>
          <ImpressionText $dark={isDark}>
            Impressions of your post
          </ImpressionText>
          <ImpressionCount $dark={isDark}>7425</ImpressionCount>
        </Impression>
      </Impressions>
      <BorderLine $dark={isDark} />
      <SocialProfiles>
        <h1
          className={`${
            isDark ? "text-gray-50" : "text-gray-900"
          } font-bold text-xs font-mono py-1 pb-4`}
        >
          Social Profiles
        </h1>
        <SocialProfile
          icon="twitter"
          socialMediaName="Twitter"
          socialMediaType="Social Network"
        />
        <SocialProfile
          icon="linkedin"
          socialMediaName="Linkedin"
          socialMediaType="Network Platform"
        />
      </SocialProfiles>
    </UserProfileWrapper>
  );
}

export default UserProfile;
