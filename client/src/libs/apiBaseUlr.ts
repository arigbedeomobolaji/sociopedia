let apiBaseUrl;

if (process.env.NODE_ENV === "production") {
	apiBaseUrl = `https://sociopedia-ten.vercel.app`;
} else {
	apiBaseUrl = "";
}

export default apiBaseUrl;
