import React from "react";
import Head from "next/head";

export async function getServerSideProps() {
	return {
		redirect: {
			destination: "/dashboard/complaints-management",
			permanent: false,
		},
	};
}

export default function Home() {
	return (
		<>
			<Head>
				<title>Admin Dashboard</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>Redirecting to dashboard...</main>
		</>
	);
}
