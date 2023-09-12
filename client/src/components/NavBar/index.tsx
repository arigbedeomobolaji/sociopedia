/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@src/libs/hooks";
import { useMediaQuery } from "@react-hook/media-query";
import { selectChangeTheme, toggleTheme } from "@store/slice/changeThemeSlice";
import {
	MagnifyingGlassIcon,
	SunIcon,
	ChatBubbleBottomCenterTextIcon,
	BellIcon,
	QuestionMarkCircleIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	XMarkIcon,
	Bars3BottomLeftIcon,
	MoonIcon,
} from "@heroicons/react/24/solid";
import {
	DesktopWrapper,
	DesktopWrapperLeft,
	DesktopWrapperRight,
	PageLogo,
	SearchWrapper,
	Input,
	UserLoggedInMenu,
	UserProfile,
	DropDownMenu,
	DropDownItem,
	UserLoggedOutMenu,
	Btn,
	MobileWrapper,
	MobileWrapperLeft,
	MobileWrapperRight,
	MobileDropDownMenu,
	Container,
} from "./style";
import Link from "next/link";
import { UserInfo } from "@src/store/slice/authSlice";
import { logoutUser } from "@src/store/slice/logoutSlice";
import { UserData, getMeApi, removeMe } from "@src/store/slice/userDataSlice";
import { selectMe } from "@src/store/slice/userDataSlice";
import { removeOtherUsers } from "@src/store/slice/allFriendsSlice";
import { removeUploadPicsData } from "@src/store/slice/uploadPicsSlice";
import { useRouter } from "next/router";
import { removePosts } from "@src/store/slice/getPostsSlice";

export default function NavBar(): JSX.Element {
	const isDark = useAppSelector(selectChangeTheme);
	const userData: UserData = useAppSelector(selectMe).userData;
	const dispatch = useAppDispatch();
	const [searchInput, setSearchInput] = useState("");
	const [moreDetails, setMoreDetails] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const isSmallScreen = useMediaQuery("(max-width: 570px)");
	const router = useRouter();
	const user: UserInfo = userData?.user;
	const email = user?.email;
	const token = userData?.token;

	useEffect(() => {
		if (!email) {
			router.push("/login");
		}
	}, [email]);

	function SearchFn(input: string): void {
		setSearchInput("");
	}

	function changeTheme(): void {
		dispatch(toggleTheme());
	}

	function handleLogout(): void {
		dispatch(removeMe());
		dispatch(removeOtherUsers());
		dispatch(removeUploadPicsData());
		dispatch(removePosts());
		dispatch(logoutUser(token));
	}

	return (
		<Fragment>
			<Container $dark={isDark}>
				{/* Desktop */}
				<DesktopWrapper>
					<DesktopWrapperLeft>
						<Link href="/">
							<PageLogo>Sociopedia</PageLogo>
						</Link>

						<SearchWrapper $dark={isDark}>
							<Input
								$dark={isDark}
								type="text"
								value={searchInput}
								placeholder="Search..."
								onChange={(e) => setSearchInput(e.target.value)}
							/>
							<MagnifyingGlassIcon
								className={`${
									isDark
										? "bg-gray-900 text-white"
										: "bg-black text-white"
								} w-8 h-8 p-2 mr-2 rounded-full cursor-pointer shadow-m`}
								onClick={() => SearchFn(searchInput)}
							/>
						</SearchWrapper>
					</DesktopWrapperLeft>
					<DesktopWrapperRight>
						<div
							className={`w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
								isDark ? "text-gray-50" : "text-gray-800"
							}`}
							onClick={() => dispatch(changeTheme)}
						>
							{isDark ? <MoonIcon /> : <SunIcon />}
						</div>
						{isSmallScreen && (
							<>
								<ChatBubbleBottomCenterTextIcon
									className={`w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
										isDark
											? "text-gray-50"
											: "text-gray-800"
									}`}
								/>

								<BellIcon
									className={`w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
										isDark
											? "text-gray-50"
											: "text-gray-800"
									}`}
								/>
								<QuestionMarkCircleIcon
									className={`w-8 h-8  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
										isDark
											? "text-gray-50"
											: "text-gray-800"
									}`}
								/>
							</>
						)}
						{userData ? (
							<UserLoggedInMenu
								onClick={() => setMoreDetails(!moreDetails)}
							>
								<UserProfile $dark={isDark}>
									<p className="text-[px] text-gray-600">
										{user?.username}
									</p>
									{moreDetails ? (
										<ChevronUpIcon className="w-6 h-6" />
									) : (
										<ChevronDownIcon className="w-6 h-6" />
									)}
								</UserProfile>
								{moreDetails && (
									<DropDownMenu $dark={isDark}>
										<DropDownItem
											onClick={() => handleLogout()}
										>
											Logout
										</DropDownItem>
										{isSmallScreen && (
											<DropDownItem
												onClick={(e) => {
													router.push("/me");
													console.log("clicked");
												}}
											>
												<Link href="/me">Profile</Link>
											</DropDownItem>
										)}
									</DropDownMenu>
								)}
							</UserLoggedInMenu>
						) : (
							<UserLoggedOutMenu>
								<Btn
									type="button"
									className={`${
										isDark
											? "text-gray-50"
											: "text-gray-800"
									}`}
								>
									<Link href="/login">Login</Link>
								</Btn>
							</UserLoggedOutMenu>
						)}
					</DesktopWrapperRight>
				</DesktopWrapper>

				{/* ****************************************************************************************************** *************************************Mobile*************************************************************** ***********************************************************************************************************/}
				<MobileWrapper $dark={isDark}>
					<MobileWrapperLeft>
						<PageLogo className="text-lg">Sociopedia</PageLogo>
					</MobileWrapperLeft>
					{/* <MobileWrapperMiddle $dark={isDark}>
				  
				  </MobileWrapperMiddle>
					  */}
					<MobileWrapperRight>
						{isSmallScreen ? (
							<></>
						) : (
							<div
								className={` flex shadow-lg h-3/4 py-3 items-center flex-1 bg-gray-800 rounded-full`}
							>
								<Input
									$dark={isDark}
									type="text"
									value={searchInput}
									placeholder="Search..."
									onChange={(e) =>
										setSearchInput(e.target.value)
									}
								/>
								<MagnifyingGlassIcon
									className="w-[35px] h-[35px] p-2 mr-2 text-white bg-black rounded-full cursor-pointer shadow-md"
									onClick={() => SearchFn(searchInput)}
								/>
							</div>
						)}

						<div
							className={`w-5 h-5  md:w-6 md:h-6  cursor-pointer transition-all hover:scale-105 ${
								isDark ? "text-gray-500" : "text-gray-800"
							}`}
							onClick={() => dispatch(changeTheme)}
						>
							{isDark ? <MoonIcon /> : <SunIcon />}
						</div>
						<p onClick={() => setIsOpen(!isOpen)}>
							{isOpen ? (
								<XMarkIcon
									className={`w-5 h-5 ${
										isDark
											? " text-gray-500"
											: " text-black"
									}`}
								/>
							) : (
								<Bars3BottomLeftIcon
									className={`w-6 h-6 ${
										isDark
											? " text-gray-500"
											: " text-black"
									}`}
								/>
							)}
						</p>
						{isOpen &&
							(user ? (
								<MobileDropDownMenu $dark={isDark}>
									<DropDownItem onClick={handleLogout}>
										Logout
									</DropDownItem>
									<DropDownItem>
										<Link href="/me">Profile</Link>
									</DropDownItem>
								</MobileDropDownMenu>
							) : (
								<MobileDropDownMenu $dark={isDark}>
									<DropDownItem
										className={`${
											isDark
												? "text-gray-50"
												: "text-gray-800"
										}`}
									>
										<Link href="/login">Login</Link>
									</DropDownItem>
									<DropDownItem
										className={`${
											isDark
												? "text-gray-50"
												: "text-gray-800"
										}`}
									>
										<Link href="/register">Register</Link>
									</DropDownItem>
								</MobileDropDownMenu>
							))}
					</MobileWrapperRight>
				</MobileWrapper>
			</Container>
		</Fragment>
	);
}

// import { InferGetServerSidePropsType, NextPage } from "next";
// import { store, wrapper } from "@src/store/store";
// import axios from "axios";
// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) => async () => {
// 		const config = {
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		};
// 		const response = await axios.get(
// 			"http://127.0.0.1:8080/api/user/me",
// 			config
// 		);

// 		return {
// 			props: {
// 				user: response.data,
// 			},
// 		};
// 	}
// );
