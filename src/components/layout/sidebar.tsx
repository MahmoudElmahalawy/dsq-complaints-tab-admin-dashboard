import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import StoreFrontIcon from "@mui/icons-material/StoreFront";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { theme } from "@/styles/mui/theme";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const drawerWidth = 240;

interface Props {
	window?: () => Window;
	mobileOpen: boolean;
	handleDrawerToggle: any;
}

const SIDEBAR_ITEMS = [
	{
		title: "Complaints Management",
		path: "/dashboard/complaints-management",
		icon: <ErrorOutlineIcon color="primary" />,
	},
	{
		title: "Providers Management",
		path: "/dashboard/providers-management",
		icon: <StoreFrontIcon color="primary" />,
	},
	{ title: "System Logs", path: "/dashboard/system-logs", icon: <AccessTimeIcon color="primary" /> },
	{ title: "Users Management", path: "/dashboard/users-management", icon: <PeopleOutlineIcon color="primary" /> },
	{ title: "System Settings", path: "/dashboard/system-settings", icon: <SettingsIcon color="primary" /> },
];

const ColoredButton = styled(Button)(() => ({
	justifyContent: "flex-start",
	fontWeight: "bold",
	fontSize: "0.8em",
	textTransform: "none",
	boxShadow: "none",
	textAlign: "start",
}));

export default function Sidebar(props: Props) {
	const { window } = props;
	const router = useRouter();

	const drawer = (
		<Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
			<Box>
				<Toolbar sx={{ py: 1 }}>
					<img src="/static/images/logos/taxes-authority-logo.png" width={"100%"} />
				</Toolbar>
				<Divider />
				<List>
					{SIDEBAR_ITEMS.map((item, index) => (
						<ListItem
							key={index}
							sx={{
								"&:has(.Mui-selected)": {
									color: theme.palette.primary.main,
									"&::after": {
										content: "''",
										width: "2px",
										height: "40px",
										bgcolor: theme.palette.primary.main,
										transform: "translateX(15px)",
									},
								},
							}}
						>
							<ListItemButton selected={router.pathname.startsWith(item.path)} sx={{ gap: 1 }}>
								<ListItemIcon sx={{ minWidth: "unset" }}>{item.icon}</ListItemIcon>
								<ListItemText
									primary={item.title}
									sx={{
										"& .MuiTypography-root": {
											fontSize: "0.8em",
											fontWeight: "bold",
										},
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
			<Box sx={{ p: 3 }}>
				<Divider />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 1.5,
						bgcolor: "#f7f7f7",
						mt: 3,
						p: 2,
						borderRadius: 2,
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
						<Avatar sx={{ width: 30, height: 30 }}></Avatar>
						<Box>
							<Typography component="h6" fontSize={"0.7rem"}>
								Username
							</Typography>
							<Typography fontWeight={"bold"} fontSize={"0.8rem"}>
								alhassanfahmy95
							</Typography>
						</Box>
					</Box>
					<ColoredButton variant="contained" color="primary" fullWidth startIcon={<LockIcon />}>
						Change Password
					</ColoredButton>
					<ColoredButton variant="contained" color="error" fullWidth startIcon={<LogoutIcon />}>
						Logout
					</ColoredButton>
				</Box>
			</Box>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
			<Drawer
				container={container}
				variant="temporary"
				open={props.mobileOpen}
				onClose={props.handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					height: "100vh",
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					height: "100vh",
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	);
}
