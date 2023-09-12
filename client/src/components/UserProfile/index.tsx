import React from "react";
import { ArchiveBoxIcon, MapPinIcon } from "@heroicons/react/24/solid";
import {
	UserProfileWrapper,
	BorderLine,
	Location,
	ItemFlex,
	Impressions,
	Impression,
	ImpressionText,
	ImpressionCount,
} from "./style";
import User from "@components/User";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import type { UserInfo } from "@src/store/slice/authSlice";
import SocialProfiles from "../EditProfile/SocialProfiles";
import { UserData, selectMe } from "@src/store/slice/userDataSlice";

function UserProfile() {
	const isDark = useAppSelector(selectChangeTheme);
	const userData: UserData = useAppSelector(selectMe).userData;
	const user: UserInfo = userData?.user;
	const numberOfFriends = user?.friends.length
		? `${user?.friends.length} friends`
		: "No friends";
	const userProfile = user?.profilePics;

	return (
		<UserProfileWrapper $dark={isDark} className={``}>
			<User
				profileImage={userProfile}
				userId={user?._id}
				name={user?.firstname + " " + user?.surname || "Fake Man"}
				extraDetail={`${numberOfFriends}`}
			/>
			<BorderLine $dark={isDark} />
			<Location>
				<ItemFlex>
					<MapPinIcon className="w-6 h-6" />
					<p
						className={`${
							isDark ? "text-gray-400" : "text-gray-600"
						}`}
					>
						{user?.city || "City"}, {user?.state || "State"}
					</p>
				</ItemFlex>
				<ItemFlex>
					<ArchiveBoxIcon className="w-6 h-6" />
					<p
						className={`${
							isDark ? "text-gray-400" : "text-gray-600"
						}`}
					>
						{user?.username || "Username"}
					</p>
				</ItemFlex>
			</Location>
			<BorderLine $dark={isDark} />
			<Impressions>
				<Impression>
					<ImpressionText $dark={isDark}>
						Who views your profile
					</ImpressionText>
					<ImpressionCount $dark={isDark}>
						{user?.profileViews}
					</ImpressionCount>
				</Impression>
				<Impression>
					<ImpressionText $dark={isDark}>
						Impressions of your post
					</ImpressionText>
					<ImpressionCount $dark={isDark}>
						{user?.impressionCount}
					</ImpressionCount>
				</Impression>
			</Impressions>
			<BorderLine $dark={isDark} />
			<SocialProfiles />
		</UserProfileWrapper>
	);
}

export default UserProfile;
