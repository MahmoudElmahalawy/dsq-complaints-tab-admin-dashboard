import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { theme } from "@/styles/mui/theme";

const drawerWidth = 240;

interface Props {
	handleDrawerToggle: any;
}

export default function TabHeader(props: Props) {
	return (
		<AppBar
			position="fixed"
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` },
				bgcolor: "#f5f5fa",
				boxShadow: "none",
				px: { xs: 1, sm: 3 },
			}}
		>
			<Toolbar>
				<IconButton
					aria-label="open drawer"
					edge="start"
					onClick={props.handleDrawerToggle}
					sx={{ display: { sm: "none" } }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div" sx={{ color: "black", fontWeight: "bold" }}>
					Complaints Management
				</Typography>
				<FormControl sx={{ marginInlineStart: "auto", minWidth: 90 }}>
					<Select
						size="small"
						value={20}
						displayEmpty
						sx={{
							fontSize: "0.8em",
							fontWeight: "bold",
							bgcolor: "white",
							borderColor: "transparent",
							borderRadius: 2,
							boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
							py: 0.3,
							".MuiOutlinedInput-notchedOutline": { border: 0 },
							".MuiSelect-icon": {
								color: theme.palette.primary.main,
							},
						}}
					>
						<MenuItem value={10}>English</MenuItem>
						<MenuItem value={20}>العربية</MenuItem>
					</Select>
				</FormControl>
			</Toolbar>
		</AppBar>
	);
}
