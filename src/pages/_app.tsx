import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/styles/mui/theme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import useTranslation from "next-translate/useTranslation";

export default function App({ Component, pageProps }: AppProps) {
	const { lang } = useTranslation();

	const cacheRtl = createCache({
		key: "muirtl",
		stylisPlugins: [prefixer, rtlPlugin],
	});

	const children = (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);

	const RtlLayout = (props: any) => <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;

	return lang === "ar" ? <RtlLayout>{children}</RtlLayout> : children;
}
