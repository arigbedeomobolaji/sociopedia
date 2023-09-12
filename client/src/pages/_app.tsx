// "use client";

import { Provider } from "react-redux";
import router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { sans, serif, mono, heading } from "../libs/fonts";
import "@styles/globals.css";
import { persistor, store, wrapper } from "@src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import "node_modules/flag-icons/css/flag-icons.min.css";
import { useEffect, useState } from "react";
import { createWrapper } from "next-redux-wrapper";

const progress = new ProgressBar({
	size: 2,
	color: "rgba(0,0,255,0.95)",
	className: "z-50",
	delay: 100,
});

router.events.on("routeChangeStart", progress.start);
router.events.on("routeChangeComplete", progress.finish);
router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }): JSX.Element {
	const [domLoaded, setDomLoaded] = useState(false);
	useEffect(() => {
		setDomLoaded(true);
	}, []);

	return (
		domLoaded && (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<style jsx global>
						{`
							:root {
								--font-sans: ${sans.style.fontFamily};
								--font-serif: ${serif.style.fontFamily};
								--font-mono: ${mono.style.fontFamily};
								--font-heading: ${heading.style.fontFamily};
							}
						`}
					</style>
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		)
	);
}

export default MyApp;

/* 

And for the page you would like to SSR on

export const getServerSideProps = withStore(async (store) => {
  await store.dispatch(fetchBlogs())
})

const BlogIndexPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {

  const blogs = useAppSelector(state => state.blogs).blogs;
return (
// html and css
}

*/
