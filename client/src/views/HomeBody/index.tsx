import React, { Fragment, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";
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
import { UserData, selectMe } from "@src/store/slice/userDataSlice";
import { Typography } from "@material-tailwind/react";

function HomeBody() {
	const isDark = useAppSelector(selectChangeTheme);
	const isSmallScreen = useMediaQuery("(max-width: 869px)");
	const mobileScreen = useMediaQuery("(max-width: 780px)");
	const userData: UserData = useAppSelector(selectMe).userData;
	const user = userData?.user;

	return (
		<>
			{userData ? (
				<Container $dark={isDark}>
					<DesktopWrapper
						className={`${
							isSmallScreen
								? " space-y-5 flex-wrap"
								: "space-x-5 flex-nowrap"
						}`}
					>
						{!isSmallScreen && (
							<DesktopLeft
								className={`${mobileScreen && "hidden"}`}
							>
								<UserProfile />
								{<FriendLists />}
							</DesktopLeft>
						)}
						<DesktopMiddle
							className={`${mobileScreen && "flex-1 px-4"}`}
						>
							{<Comment />}
							<Posts />
						</DesktopMiddle>
						<DesktopRight className={`${mobileScreen && "hidden"}`}>
							{!isSmallScreen && <CreateAds />}
						</DesktopRight>
					</DesktopWrapper>
				</Container>
			) : (
				<div className="h-[40rem] overflow-hidden bg-red-50/100">
					<div className="flex  justify-center items-center w-full h-full">
						<Typography variant="h1">
							redirecting to login
						</Typography>
					</div>
				</div>
			)}
		</>
	);
}

export default HomeBody;
