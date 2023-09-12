import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import FriendLists from "@src/components/FriendLists";
import NavBar from "@src/components/NavBar";
import UserProfile from "@src/components/UserProfile";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "@src/views/HomeBody/style";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";

const Me: NextPage = (): JSX.Element => {
	const router = useRouter();
	const isDark = useAppSelector(selectChangeTheme);
	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<NavBar />
			<Container $dark={isDark}>
				<div>
					<p
						className="flex justify-end items-center text-gray-800 p-3 text-sm font-medium "
						onClick={(e) => router.back()}
					>
						Go Back <ChevronLeftIcon className="w-6 h-6" />
					</p>
				</div>
				<div className="max-w-[1350px] mx-auto">
					<div className="flex flex-col items-center justify-center gap-9 pt-5">
						<div className="">
							<UserProfile />
						</div>
						<div>
							<FriendLists />
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Me;
