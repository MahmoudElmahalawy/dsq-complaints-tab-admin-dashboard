import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { visuallyHidden } from "@mui/utils";
import { theme } from "@/styles/mui/theme";
import { styled } from "@mui/material/styles";
import { Data, rows } from "@/utils/fakeData";

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "complaintNo";
const DEFAULT_ROWS_PER_PAGE = 10;

type Order = "asc" | "desc";

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
	sort: boolean;
	search: Search;
}

interface Search {
	available: boolean;
	type?: "dropdown" | "textfield" | "daterange";
}

interface EnhancedTableProps {
	onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => void;
	order: Order;
	orderBy: string;
}

const headCells: readonly HeadCell[] = [
	{
		id: "complaintNo",
		numeric: false,
		disablePadding: true,
		label: "Complaint Number",
		sort: true,
		search: {
			available: true,
			type: "textfield",
		},
	},
	{
		id: "complaintDept",
		numeric: true,
		disablePadding: false,
		label: "Complaint Department",
		sort: true,
		search: {
			available: true,
			type: "dropdown",
		},
	},
	{
		id: "complaintStatus",
		numeric: true,
		disablePadding: false,
		label: "Complaint Status",
		sort: true,
		search: {
			available: true,
			type: "dropdown",
		},
	},
	{
		id: "complaintDate",
		numeric: true,
		disablePadding: false,
		label: "Complaint Date",
		sort: true,
		search: {
			available: true,
			type: "daterange",
		},
	},
	{
		id: "complaintTimeFrame",
		numeric: true,
		disablePadding: false,
		label: "Complaint Time Frame",
		sort: true,
		search: {
			available: true,
			type: "dropdown",
		},
	},
	{
		id: "taxpayerName",
		numeric: true,
		disablePadding: false,
		label: "Taxpayer Name",
		sort: true,
		search: {
			available: true,
			type: "textfield",
		},
	},
	{
		id: "city",
		numeric: true,
		disablePadding: false,
		label: "City",
		sort: true,
		search: {
			available: true,
			type: "dropdown",
		},
	},
	{
		id: "area",
		numeric: true,
		disablePadding: false,
		label: "Area",
		sort: true,
		search: {
			available: true,
			type: "dropdown",
		},
	},
	{
		id: "taxpayerBranchName",
		numeric: true,
		disablePadding: false,
		label: "Taxpayer Branch Name",
		sort: true,
		search: {
			available: true,
			type: "textfield",
		},
	},
	{
		id: "RIN",
		numeric: true,
		disablePadding: false,
		label: "RIN",
		sort: true,
		search: {
			available: true,
			type: "textfield",
		},
	},
	{
		id: "intensiveRegistered",
		numeric: true,
		disablePadding: false,
		label: "Incentive Registered",
		sort: true,
		search: {
			available: true,
			type: "dropdown",
		},
	},
	{
		id: "taxpayerType",
		numeric: true,
		disablePadding: false,
		label: "Taxpayer Type",
		sort: true,
		search: {
			available: true,
			type: "dropdown",
		},
	},
	{
		id: "complaintType",
		numeric: true,
		disablePadding: false,
		label: "Complaint Type",
		sort: true,
		search: {
			available: true,
			type: "textfield",
		},
	},
	{
		id: "customerName",
		numeric: true,
		disablePadding: false,
		label: "Customer Name",
		sort: true,
		search: {
			available: true,
			type: "textfield",
		},
	},
	{
		id: "customerMobileNumber",
		numeric: true,
		disablePadding: false,
		label: "Customer Mobile Number",
		sort: false,
		search: {
			available: true,
			type: "textfield",
		},
	},
	{
		id: "customerNID",
		numeric: true,
		disablePadding: false,
		label: "Customer NID",
		sort: false,
		search: {
			available: true,
			type: "textfield",
		},
	},
	{
		id: "details",
		numeric: false,
		disablePadding: false,
		label: "Details",
		sort: false,
		search: {
			available: false,
		},
	},
];

const StyledFilterButton = styled(Button)(({ status = "" }: { status?: "active" | "" }) => ({
	fontWeight: "bold",
	backgroundColor: status ? theme.palette.primary.main : "white",
	color: status ? "white" : "black",
	textTransform: "none",
	boxShadow: "none",
	borderRadius: 10,
	marginInlineEnd: 12,
	":hover": { color: "black" },
}));

const StyledTableCell = styled(TableCell)(() => ({
	whiteSpace: "nowrap",
	borderBottom: "1px solid",
	borderColor: theme.palette.info.light,
	p: 3,
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function FilterToolbar() {
	return (
		<Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
			<Grid container rowGap={2} columnGap={2}>
				<Grid item xs={4} sm={"auto"}>
					<StyledFilterButton variant="contained" fullWidth status="active">
						All
					</StyledFilterButton>
				</Grid>
				<Grid item xs={4} sm={"auto"}>
					<StyledFilterButton variant="contained" fullWidth>
						Default
					</StyledFilterButton>
				</Grid>
				<Grid item xs={4} sm={"auto"}>
					<StyledFilterButton variant="contained" fullWidth>
						Inventory
					</StyledFilterButton>
				</Grid>
				<Grid item xs={4} sm={"auto"}>
					<StyledFilterButton variant="contained" fullWidth>
						Control
					</StyledFilterButton>
				</Grid>
			</Grid>
			<Button
				startIcon={<FilterAltOffIcon />}
				sx={{
					backgroundColor: theme.palette.primary.dark,
					color: theme.palette.primary.main,
					textTransform: "none",
					borderRadius: 3,
					px: 3,
					marginInlineStart: "auto",
					alignSelf: "flex-end",
					".MuiButton-startIcon": {
						m: { xs: "unset" },
						marginInlineEnd: { md: 1 },
					},
				}}
			>
				<Typography sx={{ display: { xs: "none", md: "block" }, whiteSpace: "nowrap", fontWeight: "bold" }}>
					Clear all filters
				</Typography>
			</Button>
		</Box>
	);
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (newOrderBy: keyof Data) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, newOrderBy);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						// align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{
							fontWeight: "bold",
							whiteSpace: "nowrap",
							borderBottom: "1px solid",
							borderColor: theme.palette.info.light,
							p: 3,
						}}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
						{headCell.search.available && headCell.search.type === "dropdown" ? (
							<Autocomplete
								size="small"
								options={["10", "20", "30", "40"]}
								sx={{
									width: 200,
									py: 1,
									".MuiSvgIcon-root": {
										color: theme.palette.primary.main,
									},
									// ".MuiAutocomplete-clearIndicator": {
									// },
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label={headCell.label}
										sx={{
											".MuiInputBase-formControl": {
												borderRadius: 2,
											},
										}}
									/>
								)}
							/>
						) : (
							headCell.search.available && (
								<FormControl sx={{ display: "block", width: 200, py: 1 }}>
									<TextField
										size="small"
										label={headCell.label}
										sx={{
											".MuiInputBase-formControl": {
												borderRadius: 2,
											},
										}}
									/>
								</FormControl>
							)
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export default function EnhancedTable() {
	const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
	const [orderBy, setOrderBy] = React.useState<keyof Data>(DEFAULT_ORDER_BY);
	const [page, setPage] = React.useState(0);
	const [visibleRows, setVisibleRows] = React.useState<Data[] | null>(null);
	const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

	React.useEffect(() => {
		let rowsOnMount = stableSort(rows, getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY));
		rowsOnMount = rowsOnMount.slice(0 * DEFAULT_ROWS_PER_PAGE, 0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE);

		setVisibleRows(rowsOnMount);
	}, []);

	const handleRequestSort = React.useCallback(
		(event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => {
			const isAsc = orderBy === newOrderBy && order === "asc";
			const toggledOrder = isAsc ? "desc" : "asc";
			setOrder(toggledOrder);
			setOrderBy(newOrderBy);

			const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
			const updatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
			setVisibleRows(updatedRows);
		},
		[order, orderBy, page, rowsPerPage]
	);

	const handleChangePage = React.useCallback(
		(event: unknown, newPage: number) => {
			setPage(newPage);

			const sortedRows = stableSort(rows, getComparator(order, orderBy));
			const updatedRows = sortedRows.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
			setVisibleRows(updatedRows);

			// Avoid a layout jump when reaching the last page with empty rows.
			const numEmptyRows = newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

			// const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
			// setPaddingHeight(newPaddingHeight);
		},
		[order, orderBy, rowsPerPage]
	);

	const handleChangeRowsPerPage = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const updatedRowsPerPage = parseInt(event.target.value, 10);
			setRowsPerPage(updatedRowsPerPage);

			setPage(0);

			const sortedRows = stableSort(rows, getComparator(order, orderBy));
			const updatedRows = sortedRows.slice(0 * updatedRowsPerPage, 0 * updatedRowsPerPage + updatedRowsPerPage);
			setVisibleRows(updatedRows);

			// There is no layout jump to handle on the first page.
			// setPaddingHeight(0);
		},
		[order, orderBy]
	);

	return (
		<>
			<FilterToolbar />
			<Box sx={{ width: "100%" }}>
				<Paper sx={{ width: "100%", mb: 2, borderRadius: 4, boxShadow: "none" }}>
					<TableContainer>
						<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
							<EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
							<TableBody>
								{visibleRows
									? visibleRows.map((row, index) => {
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow hover role="checkbox" tabIndex={-1} key={row.complaintNo}>
													<StyledTableCell component="th" id={labelId} scope="row">
														{row.complaintNo}
													</StyledTableCell>
													<StyledTableCell>{row.complaintDept}</StyledTableCell>
													<StyledTableCell>{row.complaintStatus}</StyledTableCell>
													<StyledTableCell>{row.complaintDate}</StyledTableCell>
													<StyledTableCell>{row.complaintTimeFrame}</StyledTableCell>
													<StyledTableCell>{row.taxpayerName}</StyledTableCell>
													<StyledTableCell>{row.city}</StyledTableCell>
													<StyledTableCell>{row.area}</StyledTableCell>
													<StyledTableCell>{row.taxpayerBranchName}</StyledTableCell>
													<StyledTableCell>{row.RIN}</StyledTableCell>
													<StyledTableCell>{row.intensiveRegistered}</StyledTableCell>
													<StyledTableCell>{row.taxpayerType}</StyledTableCell>
													<StyledTableCell>{row.complaintType}</StyledTableCell>
													<StyledTableCell>{row.customerName}</StyledTableCell>
													<StyledTableCell>{row.customerMobileNumber}</StyledTableCell>
													<StyledTableCell>{row.customerNID}</StyledTableCell>
													<StyledTableCell>
														<Button
															variant="contained"
															endIcon={<ChevronRightIcon />}
															sx={{
																textTransform: "none",
																boxShadow: "none",
																borderRadius: 5,
															}}
														>
															All details
														</Button>
													</StyledTableCell>
												</TableRow>
											);
									  })
									: null}
							</TableBody>
						</Table>
					</TableContainer>
					<Box my={2}>
						<TablePagination
							rowsPerPageOptions={[1, 10, 20, 30, 50]}
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							sx={{
								".MuiTablePagination-selectLabel": {
									display: { xs: "none", sm: "block" },
								},
								".MuiTablePagination-spacer, .MuiTablePagination-actions": {
									display: "none",
								},
								".MuiTablePagination-displayedRows": {
									marginInlineStart: "auto",
									marginInlineEnd: 3,
								},
								".MuiTablePagination-select": {
									fontSize: "0.8em",
									fontWeight: "bold",
									bgcolor: "white",
									borderColor: "transparent",
									borderRadius: 2,
									boxShadow: "0px 0px 2px rgba(0,0,0,0.5)",
									py: 0.3,
									".MuiOutlinedInput-notchedOutline": { border: 0 },
								},
								".MuiTablePagination-selectIcon": {
									color: theme.palette.primary.main,
								},
							}}
						/>
						<Pagination
							page={2}
							count={3}
							shape="rounded"
							color="primary"
							boundaryCount={2}
							sx={{
								position: "relative",
								top: -40,
								left: { xs: "22%", sm: "40%" },
								".MuiPaginationItem-root": {
									fontWeight: "bold",
									border: "1px solid",
									borderColor: "#f2f2f2",
								},
								".MuiPaginationItem-root.MuiPaginationItem-previousNext": {
									color: theme.palette.primary.main,
									border: "1px solid",
									borderColor: theme.palette.primary.main,
								},
								".MuiPaginationItem-root.Mui-selected": {
									color: theme.palette.primary.main,
									backgroundColor: theme.palette.primary.light,
								},
							}}
							renderItem={(item) => <PaginationItem {...item} />}
						/>
					</Box>
				</Paper>
			</Box>
		</>
	);
}
