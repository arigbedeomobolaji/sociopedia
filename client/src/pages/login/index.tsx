import React, { Fragment, useEffect, useState } from "react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
	Button,
	Checkbox,
	Input as TextInput,
	Typography,
} from "@material-tailwind/react";
import NavBar from "@src/components/NavBar";
import RegisterWidget from "@src/components/RegisterWidget";
import { useAppDispatch, useAppSelector } from "@src/libs/hooks";
import { authApi, selectAuth } from "@src/store/slice/authSlice";
import { UserData, getMeApi, selectMe } from "@src/store/slice/userDataSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = tw.div`bg-gray-200 h-[100vh] overflow-hidden`;
const ContentWrapper = tw.div`md:mt-[-12vh]  max-w-[500px] sm:max-w-[1000px] mx-auto px-4 sm:py-4  flex flex-col md:flex-row md:justify-center md:items-center md:space-x-5 md:space-y-10 h-full`;
const Left = tw.div`w-full py-5 sm:pt-[1px] lg:pt-0`;
const Right = tw.div`flex flex-col gap-5 w-full bg-white shadow-md rounded-md p-6 text-center`;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isVisible, setIsVisibile] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [open, setOpen] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const userData: UserData = useAppSelector(selectMe).userData;
	const { error } = useAppSelector(selectAuth);

	// React toast to display alert.
	const notify = (message) => toast(message);

	const handleOpen = () => setOpen(!open);

	const handleLogin = async () => {
		const generateToken: any = await dispatch(
			authApi({ email, password, path: "login" })
		);
		if (generateToken.type == "user/fulfilled") {
			dispatch(getMeApi(generateToken.payload.token));
			router.push("/");
		}
		if (generateToken.type == "user/rejected" && email) {
			notify(generateToken.payload);
		}
	};

	return (
		<Fragment>
			{error && <ToastContainer />}
			{userData ? (
				<Typography variants="h6" color="blue">
					Redirecting to homepage
				</Typography>
			) : (
				<Fragment>
					<Wrapper>
						<NavBar />
						<ContentWrapper>
							<Left>
								<Typography
									variant="h2"
									color="blue"
									textGradient
								>
									Sociopedia
								</Typography>

								<Typography
									variant="paragraph"
									color="blue"
									textGradient={false}
								>
									Sociopedia helps you connect and share with
									the people in your life.
								</Typography>
							</Left>
							<Right>
								<TextInput
									type="email"
									size="lg"
									label="Email Address"
									value={email}
									icon={<EnvelopeIcon className="w-5 h-5" />}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<div className="relative">
									<TextInput
										type={`${
											isVisible ? "text" : "password"
										}`}
										size="lg"
										label="Password"
										value={password}
										icon={
											password && isVisible ? (
												<EyeSlashIcon
													onClick={() =>
														setIsVisibile(
															!isVisible
														)
													}
													className="h-5 w-5 cursor-pointer"
												/>
											) : (
												<EyeIcon
													onClick={() =>
														setIsVisibile(
															!isVisible
														)
													}
													className="h-5 w-5 cursor-pointer"
												/>
											)
										}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</div>
								<Checkbox
									label={
										<Typography
											variant="paragraph"
											color="blue"
										>
											Remember me
										</Typography>
									}
									onChange={(e) => setRememberMe(!rememberMe)}
									ripple
									className="rounded-full w-5 h-5 hover:before:opacity-0 hover:scale-105 bg-blue-500/25 border-blue-500/25 transition-all"
								/>
								<Button
									disabled={
										!(email && password && rememberMe)
									}
									onClick={handleLogin}
									className="bg-blue-700 shadow-md"
									size="lg"
								>
									Log in
								</Button>
								<Link
									href="/login/identity"
									// className="text-blue-700 font-bold font-sans"
								>
									<Button variant="text">
										Forgotten Password?
									</Button>
								</Link>
								<p className="text-gray-200 border w-[350px] mx-auto bg-gray-200"></p>
								<Button
									onClick={handleOpen}
									className="bg-green-800"
								>
									Create Account
								</Button>
							</Right>
						</ContentWrapper>
					</Wrapper>
					<RegisterWidget open={open} handleOpen={handleOpen} />
				</Fragment>
			)}
		</Fragment>
	);
};

export default Login;
