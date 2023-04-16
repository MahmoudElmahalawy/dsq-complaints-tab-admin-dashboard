export interface Data {
	complaintNo: string;
	complaintDept: string;
	complaintStatus: string;
	complaintDate: string;
	complaintTimeFrame: string;
	taxpayerName: string;
	city: string;
	area: string;
	taxpayerBranchName: string;
	RIN: string;
	intensiveRegistered: string;
	taxpayerType: string;
	complaintType: string;
	customerName: string;
	customerMobileNumber: string;
	customerNID: string;
	details: string;
}

export const rows = [
	createData(
		"129861294",
		"Anti-Evasion",
		"Pending",
		"13-01-2023 @ 17:15",
		"Normal",
		"Starbucks",
		"Cairo",
		"Nasr City",
		"Abbas",
		"876-121-987",
		"True",
		"VAT",
		"Receipt value is different",
		"Ahmed Mohamed",
		"01062662115",
		"2951000000000",
		"Button"
	),
	createData(
		"129861295",
		"Anti-Evasion",
		"Pending",
		"13-01-2023 @ 17:15",
		"Normal",
		"Costa",
		"Giza",
		"6th of October",
		"Abbas",
		"876-121-987",
		"True",
		"VAT",
		"Receipt value is different",
		"Ahmed Mohamed",
		"01062662115",
		"2951000000000",
		"Button"
	),
	createData(
		"129861296",
		"Anti-Evasion",
		"Pending",
		"13-01-2023 @ 17:15",
		"Normal",
		"Starbucks",
		"Cairo",
		"Nasr City",
		"Abbas",
		"876-121-987",
		"True",
		"VAT",
		"Receipt value is different",
		"Ahmed Mohamed",
		"01062662115",
		"2951000000000",
		"Button"
	),
];

function createData(
	complaintNo: string,
	complaintDept: string,
	complaintStatus: string,
	complaintDate: string,
	complaintTimeFrame: string,
	taxpayerName: string,
	city: string,
	area: string,
	taxpayerBranchName: string,
	RIN: string,
	intensiveRegistered: string,
	taxpayerType: string,
	complaintType: string,
	customerName: string,
	customerMobileNumber: string,
	customerNID: string,
	details: string
): Data {
	return {
		complaintNo,
		complaintDept,
		complaintStatus,
		complaintDate,
		complaintTimeFrame,
		taxpayerName,
		city,
		area,
		taxpayerBranchName,
		RIN,
		intensiveRegistered,
		taxpayerType,
		complaintType,
		customerName,
		customerMobileNumber,
		customerNID,
		details,
	};
}
