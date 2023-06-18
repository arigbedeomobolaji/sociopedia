import React from "react";
import {
  Container,
  DesktopLeft,
  DesktopMiddle,
  DesktopRight,
  DesktopWrapper,
} from "./style";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import UserProfile from "@src/components/UserProfile";
import CreateAds from "@src/components/CreateAds";
import FriendLists from "@src/components/FriendLists";
import Comment from "@src/components/Comment";
import Posts from "@src/components/Posts";

function HomeBody() {
  const isDark = useAppSelector(selectChangeTheme);

  return (
    <Container $dark={isDark}>
      <DesktopWrapper>
        <DesktopLeft>
          <UserProfile />
        </DesktopLeft>
        <DesktopMiddle>
          <Comment />
          <Posts />
        </DesktopMiddle>
        <DesktopRight>
          <CreateAds />
          <FriendLists />
        </DesktopRight>
      </DesktopWrapper>
    </Container>
  );
}

export default HomeBody;
