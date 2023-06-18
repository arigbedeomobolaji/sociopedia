import React from "react";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import tw from "tailwind-styled-components";
import Friend from "./Friend";
import SteveRalph from "/public/assets/p3.jpeg";
import JessicaDunn from "/public/assets/p9.jpeg";
import WhatchaDoing from "/public/assets/p6.jpeg";

interface Dark {
  $dark: boolean;
}

export const Friends = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900")}
flex items-start flex-col space-y-5 rounded-3xl shadow-lg p-5 w-full`;

function FriendLists(): JSX.Element {
  const isDark = useAppSelector(selectChangeTheme);
  return (
    <Friends $dark={isDark}>
      <h1
        className={`${
          isDark ? "text-gray-50" : "text-gray-900"
        } font-bold text-xs font-mono py-1 pb-4`}
      >
        Friend List
      </h1>
      <Friend
        friendImage={WhatchaDoing}
        name="whatcha Doing"
        occupation="Educator"
      />
      <Friend
        friendImage={SteveRalph}
        name="Steve Ralph"
        occupation="Degenerate"
      />
      <Friend
        friendImage={JessicaDunn}
        name="Jessica Dunn"
        occupation="A Student"
      />
    </Friends>
  );
}

export default FriendLists;
