import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	type NextPage,
} from "next";
import Head from "next/head";
import { useMemo } from "react";
import CustomTable from "../components/CustomTable";
import { rainfallData } from "../utils/data";
import { getTableDataFromRainfall } from "../utils/dataTransformation";

const Home: NextPage = ({
	rainfallData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	// We memoize this value so it only calculates if the rainfallData changes
	// In this case as data is returned on each request by getServerSideProps it
	// is not necessary to use this but if we were to request the data again
	// and set it in state then its useful to memoize the return value
	const { tableData, columns } = useMemo(
		() => getTableDataFromRainfall(rainfallData),
		[rainfallData]
	);
	console.log({ tableData, columns });
	return (
		<>
			<Head>
				<title>Cervest Test</title>
				<meta name="description" content="Cervest Test" />
			</Head>
			<div className="min-h-screen bg-gray-100 text-gray-900 grid place-items-center">
				<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
					<div className="">
						<h1 className="text-xl font-semibold">Cervest Task</h1>
					</div>
					<div>
						<div>
							<div className="grid gap-4 grid-cols-1 sm:grid-cols-3 my-2 w-full">
								Statistis
							</div>
						</div>
					</div>
					<div className="mt-4">
						<CustomTable data={tableData} columns={columns} />
					</div>
				</main>
			</div>
		</>
	);
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
	return { props: { rainfallData } };
};

export default Home;
