import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Chip from "@mui/material/Chip";
import TabHeader from "./tab-header";
import Sidebar from "./sidebar";
import { theme } from "@/styles/mui/theme";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

interface LayoutProps {
	window?: () => Window;
	children: React.ReactNode | React.ReactNode[];
}

interface ColoredChipProps {
	color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

const ColoredChip = styled(Chip)(({ color }: ColoredChipProps) => ({
	fontWeight: "bold",
	backgroundColor: theme.palette[color].light,
	color: theme.palette[color].main,
	px: 1,
}));

export default function Layout(props: LayoutProps) {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<TabHeader handleDrawerToggle={handleDrawerToggle} />
			<Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: { xs: 2, sm: 5 },
					height: "100vh",
					backgroundColor: "#f5f5fa",
					width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{props.children}
			</Box>
		</Box>
	);
}
