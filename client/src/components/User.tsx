import React, { useState } from "react";
import {
	ChevronLeftIcon,
	PencilIcon,
	PlusCircleIcon,
	UserCircleIcon,
} from "@heroicons/react/24/solid";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import { useAppSelector } from "@src/libs/hooks";
import { StaticImageData } from "next/image";
import UploadProfilePics from "./UploadProfilePics";
import { UserData, selectMe } from "@src/store/slice/userDataSlice";
import imagePrependUrl from "@src/libs/imageUrl";
import Link from "next/link";
import { useRouter } from "next/router";

interface AppProps {
	profileImage: string | StaticImageData;
	name: string;
	extraDetail?: string;
	userId?: string;
	iconBg?: boolean;
	postId?: string;
	only?: boolean;
}

// styles
export const User = tw.div`flex items-center justify-between w-full`;
export const ProfileDetails = tw.div` flex items-center justify-start space-x-2`;

function Profile({
	profileImage,
	name,
	userId,
	extraDetail,
	postId,
	only,
}: AppProps): JSX.Element {
	const router = useRouter();
	const isDark = useAppSelector(selectChangeTheme);
	const [hover, setHover] = useState(false);
	const [open, setOpen] = React.useState(false);
	const userData: UserData = useAppSelector(selectMe).userData;
	const user = userData?.user;
	const handleOpen = () => setOpen(!open);
	const handleHover = () => {
		setHover(true);
	};
	const handleMouseOut = () => {
		setHover(false);
	};

	return (
		<>
			<User>
				<div>
					<ProfileDetails>
						<div
							className="w-16 h-16 relative"
							onMouseLeave={() => handleMouseOut()}
							onMouseEnter={() => handleHover()}
						>
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
								<UserCircleIcon className="w-full" />
							)}

							{hover && userId === user?._id && (
								<PlusCircleIcon
									onClick={() => handleOpen()}
									className="absolute w-7 h-7 left-1/3 top-1/3 cursor-pointer text-red-300 outline-gray-900"
								/>
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
								{extraDetail}
							</p>
						</div>
					</ProfileDetails>
				</div>
				<div>
					{!!postId && only ? (
						<ChevronLeftIcon
							className="w-6 h-6 cursor-pointer"
							onClick={(e) => router.back()}
						/>
					) : !!postId ? (
						<Link href={`/posts/${postId}`}>View</Link>
					) : (
						<PencilIcon className="w-5 h-5" />
					)}
				</div>
			</User>
			<UploadProfilePics open={open} handleOpen={handleOpen} />
		</>
	);
}

export default Profile;
