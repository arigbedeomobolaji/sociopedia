import NavBar from "@components/NavBar";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import HomeBody from "@src/views/HomeBody";

export default function Home() {
	const isDark = useAppSelector(selectChangeTheme);
	return (
		<div className={`${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
			<NavBar />
			<HomeBody />
		</div>
	);
}
