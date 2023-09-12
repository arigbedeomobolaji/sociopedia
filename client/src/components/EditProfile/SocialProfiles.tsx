import { PencilIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import React, { FC, useState } from "react";
import SocialProfile from "@components/SocialProfile";
import tw from "tailwind-styled-components";
import AddSocialMedia from "./AddSocialMedia";
import { UserData } from "@src/store/slice/updateUserSlice";
import { selectMe } from "@src/store/slice/userDataSlice";

interface Dark {
	$dark: boolean;
}

export const Wrapper = tw.div`flex flex-col items-start justify-start space-y-4  w-full`;

const SocialProfiles: FC = (): JSX.Element => {
	const isDark = useAppSelector(selectChangeTheme);
	const userData: UserData = useAppSelector(selectMe).userData;
	const user = userData?.user;
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(!open);
	};
	return (
		<>
			<Wrapper>
				<div className="flex w-full justify-between">
					<h1
						className={`${
							isDark ? "text-gray-50" : "text-gray-900"
						} font-bold text-xs font-mono py-1 pb-4`}
					>
						Social Profiles
					</h1>
					<PencilIcon
						className="w-5 h-6 cursor-pointer block"
						onClick={handleOpen}
					/>
				</div>
				{user?.socialMedia &&
					user?.socialMedia.map(({ name, platform }) => {
						return (
							<SocialProfile
								key={name}
								icon={name.toLowerCase()}
								socialMediaName={name}
								socialMediaType={platform}
							/>
						);
					})}
			</Wrapper>
			<AddSocialMedia open={open} handleOpen={handleOpen} />
		</>
	);
};

export default SocialProfiles;
