import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Card,
	Input,
	Typography,
	Select,
	Option,
} from "@material-tailwind/react";
import { UserInfo } from "@src/store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@src/libs/hooks";
import { UserData, getMe, selectMe } from "@src/store/slice/userDataSlice";
import { UpdateData, updateUserApi } from "@src/store/slice/updateUserSlice";
import TableRow from "../TableRow";

export type SocialMedium = {
	url: string;
	name: string;
	platform: string;
};
const TABLE_HEAD = ["url", "name", "platform", "delete"];

const AddSocialMedia = ({ open, handleOpen }) => {
	const platforms = {
		Twitter: "Blogging network",
		Facebook: "Messaging network",
		Instagram: "Video Sharing",
		Tiktok: "Video Sharing",
		Linkedin: "Networking network",
	};
	const userData: UserData = useAppSelector(selectMe).userData;
	const user: UserInfo = userData?.user;
	const token = userData?.token;
	const [socialMedia, setSocialMedia] = useState<SocialMedium[]>([]);
	const [name, setName] = useState("");
	const [platform, setPlatform] = useState("");
	const [url, setUrl] = useState("");
	const dispatch = useAppDispatch();

	useEffect(() => {
		setSocialMedia(user?.socialMedia);
	}, [user?.socialMedia]);

	const shouldDisableOption = (name): boolean => {
		let shouldDisbaled = false;
		socialMedia?.forEach((socialMedium) => {
			if (socialMedium.name === name) {
				shouldDisbaled = true;
			}
		});

		return shouldDisbaled;
	};

	function handleDelete(name) {
		setSocialMedia(socialMedia.filter((item) => item.name !== name));
	}

	const handleName = (brand: string): void => {
		setName(brand);
		setPlatform(platforms[brand]);
	};

	const handleAddSocialMedium = (): void => {
		setSocialMedia(socialMedia.concat({ name, platform, url }));
		setName("");
		setPlatform("");
		setUrl("");
	};

	const handleAddSocialMedia = async () => {
		if (JSON.stringify(user?.socialMedia) === JSON.stringify(socialMedia)) {
			handleOpen();
		} else {
			let data: UpdateData = {
				socialMedia,
				token,
			};
			const updatedData: any = await dispatch(updateUserApi(data));
			if (updatedData.type === "updateUser/fulfilled") {
				dispatch(getMe());
				handleOpen();
			}
		}
	};

	return (
		<>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>
					<Typography variant="h5">Social media </Typography>
				</DialogHeader>

				<DialogBody divider>
					{/* <DefaultTable
						tableHead={["url", "name", "platform", "edit"]}
						tableRows={socialMedia}
						trashItem={trashItem}
					/> */}

					{socialMedia && socialMedia.length ? (
						<Card className="w-full h-full overflow-scroll">
							<table className="w-full min-w-max table-auto text-left">
								<thead>
									<tr>
										{TABLE_HEAD.map((head) => (
											<th
												key={head}
												className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
											>
												<Typography
													variant="paragraph"
													color="blue-gray"
													className="font-normal leading-none opacity-70"
												>
													{head}
												</Typography>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{socialMedia?.map(
										({ url, name, platform }, index) => {
											const isLast =
												index ===
												socialMedia.length - 1;
											const classes = isLast
												? "p-4"
												: "p-4 border-b border-blue-gray-50";
											return (
												<TableRow
													url={url}
													name={name}
													platform={platform}
													key={url + name}
													classes={classes}
													handleDelete={() =>
														handleDelete(name)
													}
												/>
											);
										}
									)}
								</tbody>
							</table>
						</Card>
					) : (
						<Typography variants="lead">
							No Social Url added
						</Typography>
					)}
					<Card color="transparent" shadow>
						<form className="mt-8 mb-2 max-w-screen-lg">
							<div className="flex flex-grow flex-wrap gap-3">
								<div className=" flex w-full flex-wrap sm:flex-nowrap mb-2 gap-3">
									<div className="w-full">
										<Select
											label="Social Media"
											value={name}
											onChange={(e) => handleName(e)}
										>
											<Option
												value="Twitter"
												disabled={shouldDisableOption(
													"Twitter"
												)}
											>
												Twitter
											</Option>
											<Option
												value="Facebook"
												disabled={shouldDisableOption(
													"Facebook"
												)}
											>
												Facebook
											</Option>
											<Option
												value="Instagram"
												disabled={shouldDisableOption(
													"Instagram"
												)}
											>
												Instagram
											</Option>
											<Option
												value="Linkedin"
												disabled={shouldDisableOption(
													"Linkedin"
												)}
											>
												LinkedIn
											</Option>
											<Option
												value="Tiktok"
												disabled={shouldDisableOption(
													"Tiktok"
												)}
											>
												Tiktok
											</Option>
										</Select>
									</div>
									<Input
										type="text"
										size="lg"
										value={platform || ""}
										label="platform"
										readOnly
									/>
								</div>
								<Input
									size="lg"
									label="url"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
								/>
							</div>
							<Button
								className="mt-6"
								onClick={handleAddSocialMedium}
								disabled={
									!(
										name &&
										platform &&
										url.includes("https:") &&
										url.endsWith(".com" || ".io")
									)
								}
								fullWidth
							>
								add Network
							</Button>
						</form>
					</Card>
				</DialogBody>
				<DialogFooter>
					<Button
						variant="gradient"
						color="green"
						onClick={handleAddSocialMedia}
					>
						<span>Add</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};
export default AddSocialMedia;
