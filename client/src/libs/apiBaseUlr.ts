let apiBaseUrl;

if (process.env.NODE_ENV === "production") {
	apiBaseUrl = `https://sociopedia-api-three.vercel.app`;
} else {
	apiBaseUrl = "http://127.0.0.1:8080";
}

export default apiBaseUrl;
