import React from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import ComplaintsManagementTab from "@/components/dashboard/complaints-management/complaints-management-tab";

export default function ComplaintsManagement() {
	return (
		<>
			<Head>
				<title>Admin Dashboard</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<ComplaintsManagementTab />
			</Layout>
		</>
	);
}
