import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import User from "./User";
import { useAppDispatch, useAppSelector } from "@src/libs/hooks";
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import {
	HeartIcon as HeartIconOutline,
	ChatBubbleLeftIcon as ChatBubbleLeftOutlineIcon,
	ShareIcon as ShareOutlineIcon,
} from "@heroicons/react/24/outline";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import ChatUI from "./ChatUI";
import CarouselCustomArrows from "./Carousel";
import { UserInfo } from "@src/store/slice/authSlice";
import { likePostAPi } from "@src/store/slice/likePostSlice";
import { UserData, selectMe } from "@src/store/slice/userDataSlice";
import { getPostsApi } from "@src/store/slice/getPostsSlice";
import { addCommentApi } from "@src/store/slice/commentSlice";
import { useRouter } from "next/router";

interface Dark {
	$dark: boolean;
}

interface AppProps {
	caption: string;
	postImages: string[];
	owner: UserInfo;
	commentsId: any[];
	likes: string[];
	postId: string;
	only: boolean;
	onClick: (e) => void;
}

const Wrapper = tw.div<Dark>`
${(p) => (p.$dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900")}
flex items-start flex-col space-y-2 rounded-3xl shadow-lg p-5 w-full my-8 flex-grow`;
const UserPost = tw.div`flex flex-col items-start w-full`;
const Caption = tw.p`font-sans text-[16px] font-semibold sm:text-sm px-4 py-2`;
const IconWrapper = tw.div`flex justify-start space-x-1 items-center font-bold w-20 h-10`;

function Post({
	postId,
	owner,
	caption,
	postImages,
	commentsId,
	likes,
	only = false,
}: AppProps) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const isDark = useAppSelector(selectChangeTheme);
	const userData: UserData = useAppSelector(selectMe).userData;
	const token = userData?.token;
	const user = userData?.user;
	const [liked, setLiked] = useState(false);
	const [openCommentDialog, setopenCommentDialog] = useState(false);
	const [hasComment, setHasComment] = useState(false);
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		setHasComment(
			commentsId.some(
				({ owner }) => owner._id.toString() === user?._id.toString()
			)
		);
	}, [commentsId, user?._id]);

	useEffect(() => {
		setLiked(likes.includes(user?._id.toString()));
	}, [likes, user?._id]);

	const handleSendComment = async (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.stopPropagation();
		const addComment: any = await dispatch(
			addCommentApi({ token, postId, comment: newComment })
		);
		if (addComment.type.includes("fulfilled")) {
			setNewComment("");
			dispatch(getPostsApi(token));
		}
	};

	const handleLike = async (e) => {
		e.stopPropagation();
		const likePost: any = liked
			? await dispatch(likePostAPi({ token, postId, path: "unlike" }))
			: await dispatch(likePostAPi({ token, postId, path: "like" }));
		console.log(likePost.type);
		if (likePost.type.includes("likePost/fulfilled")) {
			setLiked(!liked);
			dispatch(getPostsApi(token));
		}
	};

	const handleComment = (e) => {
		e.stopPropagation();
		setopenCommentDialog(!openCommentDialog);
	};

	return (
		<>
			<Wrapper $dark={isDark}>
				<User
					profileImage={owner?.profilePics}
					name={owner?.firstname + " " + owner?.surname}
					extraDetail={owner?.state + ", " + owner?.city}
					iconBg={true}
					postId={postId}
					only={only}
				/>
				<Caption>{caption}</Caption>
				<CarouselCustomArrows images={postImages} />
				<div className="flex justify-between w-full">
					<div className="flex space-x-1">
						<IconWrapper onClick={(e) => handleLike(e)}>
							{liked ? (
								<HeartIcon className={`w-6 h-6 text-red-500`} />
							) : (
								<HeartIconOutline className="w-6 h-6 text-gray-600" />
							)}
							<p className="h-6 text-md">{likes.length}</p>
						</IconWrapper>
						<IconWrapper onClick={(e) => handleComment(e)}>
							{hasComment ? (
								<ChatBubbleLeftIcon
									className={`w-6 h-6 text-blue-700`}
								/>
							) : (
								<ChatBubbleLeftOutlineIcon className="w-6 h-6 text-emerald-600" />
							)}
							<p className="h-6 text-md">{commentsId.length}</p>
						</IconWrapper>
					</div>
					<IconWrapper className="justify-end">
						<ShareOutlineIcon className="w-6 h-6 text-gray-600" />
					</IconWrapper>
				</div>
				{openCommentDialog && (
					<ChatUI
						commentsId={commentsId}
						handleSendComment={handleSendComment}
						setNewComment={setNewComment}
						newComment={newComment}
					/>
				)}
			</Wrapper>
		</>
	);
}

export default Post;
