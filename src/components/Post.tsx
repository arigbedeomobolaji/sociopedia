import React from "react";
import Image from "next/image";
import tw from "tailwind-styled-components";
import ProfileImage from "public/assets/p4.jpeg";
import User from "./User";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import Post1 from "/public/assets/post1.jpeg";

interface Dark {
  $dark: boolean;
}

const Wrapper = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900")}
flex items-start flex-col space-y-2 rounded-3xl shadow-lg p-5 w-full my-8`;
const UserPost = tw.div`flex flex-col items-start w-full h-full`;
const Caption = tw.p`font-sans text-[16px] font-semibold sm:text-sm`;

function Post() {
  const isDark = useAppSelector(selectChangeTheme);
  return (
    <Wrapper $dark={isDark}>
      <User
        profileImage={ProfileImage}
        name="fake man"
        extraDetail={`New York, Ca`}
        iconBg={true}
      />
      <UserPost>
        <Caption>Some really long description</Caption>
        <div className="relative w-full h-[200px]">
          <Image
            src={Post1}
            alt="post media"
            fill
            object-fit="contain"
            priority
          />
        </div>
      </UserPost>
    </Wrapper>
  );
}

export default Post;
