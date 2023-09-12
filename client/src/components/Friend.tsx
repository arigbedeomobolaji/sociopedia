import React, { useEffect, useState } from "react";
import {
	UserCircleIcon,
	UserIcon,
	UserMinusIcon,
	UserPlusIcon,
} from "@heroicons/react/24/solid";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import { useAppDispatch, useAppSelector } from "@src/libs/hooks";
import { StaticImageData } from "next/image";
import {
	UserData,
	getMe,
	getMeApi,
	selectMe,
} from "@src/store/slice/userDataSlice";
import { editFriendsApi } from "@src/store/slice/editFriendSlice";
import imagePrependUrl from "@src/libs/imageUrl";

interface AppProps {
	friendImage?: string | StaticImageData;
	name: string;
	userId: string;
	occupation: string;
	iconBg?: boolean;
}

// styles
export const FriendWrapper = tw.div`flex items-center justify-between w-full`;
export const FriendDetail = tw.div` flex items-center justify-start space-x-2`;

function Friend({
	friendImage,
	name,
	userId,
	occupation,
	iconBg = true,
}: AppProps): JSX.Element {
	const isDark = useAppSelector(selectChangeTheme);
	const userData: UserData = useAppSelector(selectMe).userData;
	const user = userData?.user;
	const token = userData?.token;
	const dispatch = useAppDispatch();
	const [isFriend, setIsFriend] = useState(user?.friends.includes(userId));

	useEffect(() => {
		setIsFriend(user?.friends?.includes(userId.toString()));
	}, [user?.friends, userId]);

	const toggleFriend = async () => {
		const editFriendsApiResult: any = isFriend
			? await dispatch(editFriendsApi({ token, path: "remove", userId }))
			: await dispatch(editFriendsApi({ token, path: "add", userId }));
		if (editFriendsApiResult.type === "editFriends/fulfilled") {
			dispatch(getMeApi(token));
			setIsFriend(!isFriend);
		}
	};
	return (
		<FriendWrapper>
			<div>
				<FriendDetail>
					<div className="w-16 h-16 relative">
						{friendImage ? (
							<Image
								className="rounded-full shadow-md"
								src={`${imagePrependUrl}${friendImage}`}
								fill
								sizes="(max-width: 768px) 100vw, 700px"
								object-fit="contain"
								alt="Profile Image"
								priority
							/>
						) : (
							<UserCircleIcon className="w-full bg-transparent" />
						)}
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
				{isFriend ? (
					<UserMinusIcon
						onClick={() => toggleFriend()}
						className={`${
							iconBg
								? "bg-blue-600 text-gray-300"
								: "bg-transparent"
						} w-10 h-10 p-2 rounded-full cursor-pointer`}
					/>
				) : (
					<UserPlusIcon
						onClick={() => toggleFriend()}
						className={`${
							iconBg
								? "bg-blue-600 text-gray-300"
								: "bg-transparent"
						} w-10 h-10 p-2 rounded-full cursor-pointer`}
					/>
				)}
			</div>
		</FriendWrapper>
	);
}

export default Friend;
