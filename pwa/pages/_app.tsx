import "../styles/globals.css"
import type { AppProps } from "next/app"
import type { DehydratedState } from "react-query"
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

function MyApp({ Component, pageProps }: AppProps<{dehydratedState: DehydratedState}>) {
  return <Component {...pageProps} />
}

export default MyApp
