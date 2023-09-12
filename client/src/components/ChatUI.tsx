import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import imagePrependUrl from "@src/libs/imageUrl";
import Image from "next/image";
import { UserData, selectMe } from "@src/store/slice/userDataSlice";
import { useAppSelector } from "@src/libs/hooks";
import { UserInfo } from "@src/store/slice/authSlice";

interface AppProps {
	commentsId: any[];
	newComment: string;
	handleSendComment: (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => void;
	setNewComment: (data: string) => void;
}

const ChatUI = ({
	commentsId,
	newComment,
	handleSendComment,
	setNewComment,
}: AppProps) => {
	const userData: UserData = useAppSelector(selectMe).userData;
	const userId = userData?.user?._id;

	return (
		<div
			className={`flex flex-col ${
				!commentsId.length
					? "h-[20vh]"
					: commentsId.length > 5
					? "h-[80vh]"
					: "h-[50vh]"
			} w-full`}
		>
			<div className="shadow-lg flex-1 overflow-y-auto px-4 py-2">
				{commentsId.map(({ comment, owner }, index) => (
					<div
						key={index}
						className="Comment py-2 text-gray-800 my-2 px-2"
					>
						<div className="flex justify-start items-center gap-3">
							<div className="relative w-10 h-10">
								{owner?.profilePics ? (
									<Image
										className="rounded-full shadow-md"
										src={`${imagePrependUrl}${owner?.profilePics}`}
										fill
										sizes="(max-width: 768px) 100vw, 700px"
										object-fit="contain"
										alt="Profile Image"
										priority
									/>
								) : (
									<UserCircleIcon className="w-full" />
								)}
							</div>

							<div className="bg-gray-200 px-3 py-1 rounded-md shadow-md">
								<span className="text-xs font-sans text-gray-600 font-bold">
									{owner.surname} {owner.firstname}
								</span>
								<p className="font-semibold text-[13px] text-gray-900/80">
									{comment}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="flex shadow-md w-full p-2">
				<input
					type="text"
					value={newComment}
					onChange={(e) => {
						e.stopPropagation();
						setNewComment(e.target.value);
					}}
					placeholder="Type your Comment..."
					className="flex-1 text-[14px] font-body font-semibold text-gray-800 px-4 py-4 outline-none hover:shadow-xl"
				/>
				<button
					onClick={(e) => handleSendComment(e)}
					disabled={!newComment}
					className="text-white py-2 rounded-lg ml-2"
				>
					<PaperAirplaneIcon
						className={`w-10 h-10 ${
							!newComment
								? "text-gray-300"
								: "text-blue-500 cursor-pointer"
						}`}
					/>
				</button>
			</div>
		</div>
	);
};

export default ChatUI;
