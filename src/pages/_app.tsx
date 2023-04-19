import { sans, serif, mono, heading } from "../libs/fonts";
import { wrapper } from "@src/store";
import "@styles/globals.css";

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <>
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
    </>
  );
}

export default wrapper.withRedux(MyApp);
