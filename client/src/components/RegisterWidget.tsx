import React, { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import tw from "tailwind-styled-components";
import {
	Dialog,
	DialogFooter,
	Button,
	DialogHeader,
	DialogBody,
	Typography,
	Select,
	Option,
	Radio,
	Input,
	Checkbox,
} from "@material-tailwind/react";
import {
	EyeIcon,
	EyeSlashIcon,
	XCircleIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@src/libs/hooks";
import { Data, authApi, selectAuth } from "@src/store/slice/authSlice";
import { getMeApi, selectMe } from "@src/store/slice/userDataSlice";
import { UserData } from "@src/store/slice/updateUserSlice";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AppProps {
	open: boolean;
	handleOpen: () => void;
}

const InputGroupWrapper = tw.div`flex gap-4 flex-col md:flex-row`;
const InputGroup = tw.div`flex-grow`;
const Label = tw.label`text-sm font-bold text-black`;
const TextInput = tw.input`text-black font-body rounded-md shadow-md outline-none w-full border-gray-200 py-3 focus:border-none px-2 placeholder:text-gray-700/50 placeholder:text-xs placeholder:font-extralight`;
const LabelWrapper = tw.div`mb-1 block`;
const PasswordInput = tw.div`relative`;
const BodyWrapper = tw.div`space-y-6`;
const AddressWrapper = tw.div`flex flex-col w-full`;
const Address = tw.div`flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center`;
const RadioWrapper = tw.div`flex gap-3`;

const RegisterWidget: FC<AppProps> = ({ handleOpen, open }): ReactElement => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const userData: UserData = useAppSelector(selectMe).userData;
	const user = userData?.user;
	const [firstname, setFirstname] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");
	const [isVisible, setIsVisibile] = useState(false);
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [gender, setGender] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [occupation, setOccupation] = useState("");

	const [agreed, setAgreed] = useState(false);
	const age = moment().diff(dateOfBirth, "years");
	const countryIsoCode = country.split(",")[1];
	const stateIsoCode = state.split(",")[1];
	let { error } = useAppSelector(selectAuth);
	const countries = Country.getAllCountries();
	const states = State.getStatesOfCountry(countryIsoCode);
	const cities = City.getCitiesOfState(countryIsoCode, stateIsoCode);
	const [countryPhoneCode, setCountryPhoneCode] = useState("");
	// React toast to display alert.
	const notify = (message) => toast(message);

	const canProceed =
		firstname &&
		surname &&
		email &&
		password &&
		password === confirmPassword &&
		country &&
		state &&
		city &&
		dateOfBirth &&
		gender &&
		phoneNumber &&
		age &&
		occupation &&
		agreed;

	const handleGenderChange = (event) => setGender(event.target.value);

	const handleCreateUser = async () => {
		if (password === confirmPassword) {
			const data: Data = {
				firstname,
				surname,
				email,
				password,
				country: country.split(",")[0],
				state: state.split(",")[0],
				city,
				dateOfBirth: dateOfBirth.toLocaleString().split(",")[0],
				gender,
				phoneNumber: `+${countryPhoneCode}${phoneNumber}`,
				age,
				occupation,
				username,
				path: "register",
			};
			const generateToken: any = await dispatch(authApi(data));
			if (generateToken.type === "user/fulfilled") {
				dispatch(getMeApi(generateToken.payload.token));
				router.push("/");
			}

			if (generateToken.type === "user/rejected" && username) {
				let error = generateToken.payload;
				if (error.code === 11000) {
					const message =
						error.keyValue[Object.keys(error.keyValue)[0]] +
						" is already chosen.";
					notify(message);
				} else {
					notify(generateToken.payload);
				}
			}
		}
	};
	return (
		<Fragment>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader className="flex justify-between items-center rounded-t-md">
					<div className="flex flex-col items-start">
						<Typography variant="h5">Sign Up</Typography>
						<Typography variant="paragraph">
							It is quick and Easy
						</Typography>
					</div>
					<XCircleIcon
						className="w-10 h-10 cursor-pointer text-blue-800"
						onClick={handleOpen}
					/>
				</DialogHeader>
				<DialogBody
					divider
					className="space-y-5 bg-gray-200 rounded-b-md h-[500px] sm:h-[40rem] overflow-scroll"
				>
					{error && <ToastContainer />}
					<BodyWrapper>
						<InputGroupWrapper className="flex">
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="first-name">
										First Name
									</Label>
								</LabelWrapper>
								<TextInput
									placeholder="Andrew"
									required
									autoComplete="false"
									type="text"
									value={firstname}
									onChange={(e) =>
										setFirstname(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="surname">Surname</Label>
								</LabelWrapper>
								<TextInput
									id="surname"
									placeholder="Smith"
									required
									type="text"
									value={surname}
									onChange={(e) => setSurname(e.target.value)}
								/>
							</InputGroup>
						</InputGroupWrapper>
						<InputGroupWrapper className="flex">
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="email1">Email</Label>
								</LabelWrapper>
								<TextInput
									id="email1"
									placeholder="email"
									required
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</InputGroup>
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="password">Password</Label>
								</LabelWrapper>
								<PasswordInput>
									<TextInput
										placeholder="your password"
										required
										type={isVisible ? "text" : "password"}
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									{!!password &&
										(isVisible ? (
											<EyeSlashIcon
												onClick={() =>
													setIsVisibile(!isVisible)
												}
												className="h-4 w-4 text-gray-500 absolute top-4 right-3 cursor-pointer"
											/>
										) : (
											<EyeIcon
												onClick={() =>
													setIsVisibile(!isVisible)
												}
												className="h-4 w-4 text-gray-500 absolute top-4 right-3 cursor-pointer"
											/>
										))}
								</PasswordInput>
							</InputGroup>
						</InputGroupWrapper>
						<InputGroupWrapper className="flex">
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="confirm-password">
										Confirm password
									</Label>
								</LabelWrapper>
								<PasswordInput>
									<TextInput
										id="confirm-password"
										placeholder="Confirm password"
										required
										type={isVisible ? "text" : "password"}
										value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
									/>
									{!!password &&
										(isVisible ? (
											<EyeSlashIcon
												onClick={() =>
													setIsVisibile(!isVisible)
												}
												className="h-4 w-4 text-gray-500 absolute top-4 right-3 cursor-pointer"
											/>
										) : (
											<EyeIcon
												onClick={() =>
													setIsVisibile(!isVisible)
												}
												className="h-4 w-4 text-gray-500 absolute top-4 right-3 cursor-pointer"
											/>
										))}
								</PasswordInput>
							</InputGroup>
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="username">username</Label>
								</LabelWrapper>
								<TextInput
									id="username"
									placeholder="username"
									required
									type="text"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</InputGroup>
						</InputGroupWrapper>
						<AddressWrapper>
							<LabelWrapper>
								<Label htmlFor="address">Address</Label>
							</LabelWrapper>
							<Address>
								<Select
									id="address"
									size="md"
									label="Select Country"
									onChange={(e) => setCountry(e)}
									selected={(element) =>
										element &&
										React.cloneElement(element, {
											className:
												"flex items-center px-0 gap-2 pointer-events-none",
										})
									}
								>
									{countries.map(({ name, isoCode }) => (
										<Option
											key={name}
											value={name + "," + isoCode}
											color="blue"
											className="flex flex-start items-center justify-start"
										>
											<span
												className={`fi fi-${isoCode.toLowerCase()} fis mr-3`}
											></span>
											{name}
										</Option>
									))}
								</Select>
								<Select
									size="md"
									label="Select State"
									onChange={(e) => setState(e)}
									selected={(element) =>
										element &&
										React.cloneElement(element, {
											className:
												"flex items-center px-0 gap-2 pointer-events-none",
										})
									}
								>
									{states.map(({ name, isoCode }) => (
										<Option
											key={name}
											value={name + "," + isoCode}
											color="blue"
											className="flex flex-start items-center justify-start"
										>
											{name}
										</Option>
									))}
								</Select>
								<Select
									size="md"
									label="Select City"
									onChange={(e) => setCity(e)}
									selected={(element) =>
										element &&
										React.cloneElement(element, {
											className:
												"flex items-center px-0 gap-2 pointer-events-none",
										})
									}
								>
									{cities.map(({ name }) => (
										<Option
											key={name}
											value={name}
											color="blue"
											className="flex flex-start items-center justify-start"
										>
											{name}
										</Option>
									))}
								</Select>
							</Address>
						</AddressWrapper>
						<InputGroupWrapper className="flex">
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="dob">Date of Birth</Label>
								</LabelWrapper>
								<ReactDatePicker
									selected={dateOfBirth}
									onChange={(date) => setDateOfBirth(date)}
									peekNextMonth
									showMonthDropdown
									showYearDropdown
									dropdownMode="select"
									className="text-gray-900 font-sans font-semibold rounded-md shadow-md outline-none w-full border-gray-200 py-3 focus:border-none px-2"
								/>
							</InputGroup>
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="age">Age</Label>
								</LabelWrapper>
								<TextInput
									id="age"
									placeholder="0"
									required
									disabled
									type="text"
									value={age}
									className="outline-gray-300"
								/>
							</InputGroup>
						</InputGroupWrapper>
						<InputGroupWrapper className="flex">
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="gender">Gender</Label>
								</LabelWrapper>
								<RadioWrapper>
									<Radio
										id="male"
										name="gender"
										value="male"
										onChange={handleGenderChange}
										ripple
										icon={
											<CheckCircleIcon className="w-full h-full scale-105" />
										}
										className="hover:before:opacity-0 bg-blue-500/25 border-blue-500/50 transition-all p-0"
										label={
											<Typography
												color="blue-gray"
												className="font-normal"
											>
												Male
											</Typography>
										}
									/>
									<Radio
										id="female"
										name="gender"
										value="female"
										onChange={handleGenderChange}
										ripple
										icon={
											<CheckCircleIcon className="w-full h-full scale-105" />
										}
										className="hover:before:opacity-0 bg-blue-500/25 border-blue-500/50 transition-all p-0"
										label={
											<Typography
												color="blue-gray"
												className="font-normal"
											>
												Female
											</Typography>
										}
									/>
								</RadioWrapper>
							</InputGroup>

							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="occupation">
										Occupation
									</Label>
								</LabelWrapper>
								<TextInput
									id="occupation"
									placeholder="Occupation"
									required
									type="text"
									value={occupation}
									onChange={(e) =>
										setOccupation(e.target.value)
									}
								/>
							</InputGroup>
						</InputGroupWrapper>
						<InputGroupWrapper>
							<InputGroup>
								<LabelWrapper>
									<Label htmlFor="phone">Phone Number</Label>
								</LabelWrapper>
								<div className="flex flex-wrap sm:flex-nowrap max-w-[300px] flex-shrink gap-3">
									<div className="flex-grow basis-36">
										<Select
											size="md"
											label="Phone Code"
											className="flex items-center max-w-xs gap-2 flex-shrink border-r-0 border-blue-gray-200 bg-blue-gray-500/10"
											color="gray"
											onChange={(e) =>
												setCountryPhoneCode(e)
											}
											selected={(element) =>
												element &&
												React.cloneElement(element, {
													className:
														"flex max-w-sm items-center px-0 gap-2 pointer-events-none",
												})
											}
										>
											{countries.map(
												({
													name,
													isoCode,
													phonecode,
												}) => (
													<Option
														key={name}
														value={phonecode}
														className="flex items-center gap-2"
													>
														<span
															className={`fi fi-${isoCode.toLowerCase()} fis mr-3`}
														/>
														<p className="text-[10px] font-bold font-sans ">
															{name.slice(0, 21)}{" "}
														</p>

														<span className="ml-auto">
															{phonecode.includes(
																"+"
															)
																? phonecode.slice(
																		0,
																		3
																  )
																: `+${phonecode.slice(
																		0,
																		4
																  )}`}
														</span>
													</Option>
												)
											)}
										</Select>
									</div>
									<div className="flex-grow basis-36">
										<Input
											size="md"
											type="number"
											placeholder="Mobile Number"
											value={phoneNumber}
											onChange={(e) =>
												setPhoneNumber(e.target.value)
											}
											className="flex flex-grow flex-1 py-1"
											labelProps={{
												className:
													"before:content-none after:content-none",
											}}
											containerProps={{
												className: "min-w-0 rounded-md",
											}}
										/>
									</div>
								</div>
								<Checkbox
									label={
										<Typography
											variant="paragraph"
											color="blue"
										>
											Agreed to terms and conditions
										</Typography>
									}
									onChange={(e) => setAgreed(!agreed)}
									ripple
									className="rounded-full w-5 h-5 hover:before:opacity-0 hover:scale-105 bg-blue-500/25 border-blue-500/25 transition-all"
								/>
							</InputGroup>
						</InputGroupWrapper>
					</BodyWrapper>
				</DialogBody>
				<DialogFooter>
					<Button
						variant="gradient"
						color="blue"
						onClick={handleCreateUser}
						disabled={!canProceed}
					>
						<span>Create Account</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</Fragment>
	);
};

export default RegisterWidget;
