import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#438fce",
			dark: "#d1e1f1",
			light: "#edf4fa",
		},
		secondary: {
			main: "#2f2e41",
		},
		text: {
			primary: "#252d48",
		},
		success: {
			main: "#4bd098",
			light: "#d5f4e7",
		},
		error: {
			main: "#ef5656",
			light: "#f6a9a9",
		},
		warning: {
			main: "#f6d35f",
			light: "#fdf4d4",
		},
		info: {
			main: "#898989",
			light: "#e6e6e6",
		},
		divider: "#eeeeee",
	},
	typography: {
		fontFamily: ["Cairo", "sans-serif"].join(","),
	},
});
