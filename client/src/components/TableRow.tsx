import React from "react";
import { Card, Typography, tab } from "@material-tailwind/react";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/solid";
interface AppProps {
	url: string;
	name: string;
	platform: string;
	classes: string;
	handleDelete: (name: string) => void;
}

function TableRow({ url, name, platform, classes, handleDelete }: AppProps) {
	return (
		<tr key={url}>
			<td className={classes}>
				<Typography
					variant="small"
					color="blue-gray"
					className="font-normal"
				>
					<Link href={url}>{name}</Link>
				</Typography>
			</td>
			<td className={classes}>
				<Typography
					variant="small"
					color="blue-gray"
					className="font-normal"
				>
					{name}
				</Typography>
			</td>
			<td className={classes}>
				<Typography
					variant="small"
					color="blue-gray"
					className="font-normal"
				>
					{platform}
				</Typography>
			</td>
			<td className={classes}>
				<Typography
					as="a"
					href="#"
					variant="small"
					color="blue"
					className="font-medium"
				>
					<TrashIcon
						className="w-5 h-5 cursor-pointer"
						onClick={() => handleDelete(name)}
					/>
				</Typography>
			</td>
		</tr>
	);
}

export default TableRow;
