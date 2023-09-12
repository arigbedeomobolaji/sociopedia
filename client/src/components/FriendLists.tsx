import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import { UserData, selectMe } from "@src/store/slice/userDataSlice";
import {
	OtherUsers,
	otherUsersApi,
	selectOtherUsers,
} from "@src/store/slice/allFriendsSlice";
import tw from "tailwind-styled-components";
import Friend from "./Friend";

interface Dark {
	$dark: boolean;
}

export const Friends = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900")}
flex items-start flex-col space-y-5 rounded-3xl shadow-lg p-5 w-[300px]`;

// NextPage<InferGetServerSidePropsType<typeof getServerSideProps>>

const FriendLists = () => {
	const isDark = useAppSelector(selectChangeTheme);
	const userData: UserData = useAppSelector(selectMe).userData;
	const token = userData?.token;
	const otherUsers: OtherUsers = useAppSelector(selectOtherUsers).otherUsers;
	const potentialFriends = otherUsers?.potentialFriends;
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(otherUsersApi({ token }));
	}, []);

	return (
		potentialFriends && (
			<Friends $dark={isDark}>
				<h1
					className={`${
						isDark ? "text-gray-50" : "text-gray-900"
					} font-bold text-xs font-mono py-1 pb-4`}
				>
					Friend List
				</h1>
				{potentialFriends &&
					potentialFriends.map(
						({ name, occupation, _id, profilePics }, index) => (
							<Friend
								key={_id}
								userId={_id}
								friendImage={profilePics}
								name={name}
								occupation={occupation}
							/>
						)
					)}
			</Friends>
		)
	);
};

export default FriendLists;
