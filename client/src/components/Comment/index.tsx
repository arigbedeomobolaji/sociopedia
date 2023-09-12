import { useState } from "react";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import Image from "next/image";
import React from "react";
import {
	PhotoIcon,
	UserCircleIcon,
	VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { Wrapper, Tweet, Textarea, Icon, IconText, InputFile } from "./style";
import { BorderLine } from "@components/UserProfile/style";
import { UserData, selectMe } from "@src/store/slice/userDataSlice";
import imagePrependUrl from "@src/libs/imageUrl";
import CreatePost from "../CreatePost";
import { size } from "@material-tailwind/react/types/components/avatar";

interface Dark {
	$dark: boolean;
}
const SIZE: size = "lg";

function Comment() {
	const [createPostSize, setCreatePostSize] = useState<size>(null);

	const isDark = useAppSelector(selectChangeTheme);
	const [tweet, setTweet] = useState("");
	const userData: UserData = useAppSelector(selectMe).userData;
	const user = userData?.user;
	const profileImage = user?.profilePics;

	const handleCreatePostOpen = (value: size) => {
		setCreatePostSize(value);
	};

	const handleTweet = (e) => {
		if (e.target) {
			setTweet(e.target.value);
		} else {
			setTweet(e);
		}
	};

	return (
		<>
			<Wrapper $dark={isDark} onClick={() => handleCreatePostOpen(SIZE)}>
				<Tweet>
					<div className="relative w-11 h-11">
						{profileImage ? (
							<Image
								className="rounded-full shadow-md"
								src={`${imagePrependUrl}${profileImage}`}
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
					<div
						className={`${
							isDark ? "bg-gray-700" : "bg-gray-100"
						} flex-1 w-full rounded-xs sm:rounded-2xl sm:rounded-b-3xl shadow-xl`}
					>
						<Textarea
							$dark={isDark}
							value={tweet}
							placeholder="What's on you mind"
							onChange={(e) => setTweet(e.target.value)}
						/>
					</div>
				</Tweet>
				<BorderLine $dark={isDark} />
				<div className="flex space-x-5 items-center flex-wrap justify-around">
					<Icon>
						<PhotoIcon
							className="w-6 h-6 cursor-pointer"
							// onClick={() => handleClick(imageRef)}
						/>
						<IconText $dark={isDark}>Image</IconText>
					</Icon>
					<Icon>
						<VideoCameraIcon
							// onClick={() => handleClick(videoRef)}
							className="w-6 h-6 cursor-pointer"
						/>
						<IconText $dark={isDark}>Clip</IconText>
					</Icon>
				</div>
			</Wrapper>
			<CreatePost
				handleCreatePostOpen={handleCreatePostOpen}
				createPostSize={createPostSize}
				tweet={tweet}
				handleTweet={handleTweet}
			/>
		</>
	);
}

export default Comment;
