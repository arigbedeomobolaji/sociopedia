import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import tw from "tailwind-styled-components";
import Link from "next/link";

const Navbar = tw.div`sticky top-0 w-full flex justify-end items-center p-4 space-x-5 bg-gray-50`;
const MenuWrapper = tw.div`max-w-[450px] mx-2 sm:mx-auto flex flex-col  bg-white p-5 rounded-md shadow-md `;
const LoginWrapper = tw.div`flex space-x-3 flex-grow  justify-end`;
const Input = tw.input`hidden md:block md:w-[150px] lg:w-[250px] p-3 rounded-md shadow-md outline-none`;
const Margin = tw.p`text-gray-200 border my-3 bg-gray-200`;
const Button = tw.button`bg-gray-200 px-6 py-2 mx-2 rounded-md shadow-md font-sans font-bold text-gray-700`;

const EmailInput = tw.input`px-3 outline-1 outline rounded-md shadow-md font-sans font-bold opacity-85  outline-gray-300 w-full flex my-5 py-3 placeholder:text-gray-900 placeholder:opacity-25 placeholder:font-sans placeholder:font-medium placeholder:pl-2 placeholder:font-xs font-xs focus:placeholder:opacity-10 transition-all hover:outline-blue-100`;

function Identity() {
	const [email, setEmail] = useState("");
	const [forgottenEmail, setForgottenEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isVisible, setIsVisibile] = useState(false);
	return (
		<div className="bg-gray-100">
			<Navbar>
				<h1 className="text-blue-700 font-mono font-extrabold text-[20px] sm:text-[25px] md:text-[40px] text-center">
					<Link href="/">Sociopedia</Link>
				</h1>
				<LoginWrapper>
					<Input
						type="email"
						placeholder="Enter email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<div className="relative">
						<Input
							type={`${isVisible ? "text" : "password"}`}
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required={true}
						/>
						{password && isVisible ? (
							<EyeSlashIcon
								onClick={() => setIsVisibile(!isVisible)}
								className="hidden md:block h-5 w-5 text-gray-500 absolute top-3 right-3 cursor-pointer"
							/>
						) : (
							<EyeIcon
								onClick={() => setIsVisibile(!isVisible)}
								className="hidden md:block h-5 w-5 text-gray-500 absolute top-3 right-3 cursor-pointer"
							/>
						)}
					</div>
					<button className="p-3 w-[100px] cursor-pointer bg-blue-800 text-white font-mono font-bold rounded-md shadow-md">
						Login
					</button>
				</LoginWrapper>
			</Navbar>
			<div className="flex items-center justify-center h-[92vh] overflow-hidden">
				<MenuWrapper>
					<h3 className="font-sans font-extrabold text-sm sm:text-xl">
						Find Your Account
					</h3>
					<Margin />
					<p>
						Please enter your email address to search for your
						account.
					</p>
					<EmailInput
						type="email"
						placeholder="Enter Email"
						value={forgottenEmail}
						onChange={(e) => setForgottenEmail(e.target.value)}
					/>
					<Margin />
					<div className="flex justify-end">
						<Button>Cancel</Button>
						<Button className="bg-blue-700 text-white">
							Search
						</Button>
					</div>
				</MenuWrapper>
			</div>
		</div>
	);
}

export default Identity;
