import { ColumnFiltersState } from "@tanstack/react-table";
import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	type NextPage,
} from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import CustomTable from "../components/CustomTable";
import Statistic from "../components/Statistic";
import { rainfallData } from "../utils/data";
import {
	getAggregateRainfall,
	getTableDataFromRainfall,
} from "../utils/dataTransformation";

const Home: NextPage = ({
	rainfallData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	// We memoize this value so it only calculates if the rainfallData changes
	// In this case as data is returned on each request by getServerSideProps it
	// is not necessary to use this but if we were to request the data again
	// and set it in state then its useful to memoize the return value
	const { tableData, columns } = useMemo(
		() => getTableDataFromRainfall(rainfallData),
		[rainfallData]
	);

	// We memoize filteredData so it only recalculates if the columnFilters change
	const filteredData = useMemo(() => {
		let filteredData = tableData;
		const columnFilterValues = columnFilters[0]?.value as string[];
		if (columnFilterValues) {
			filteredData = tableData.filter((item) => {
				return !columnFilterValues.includes(item.regionName);
			});
		}
		return filteredData;
	}, [columnFilters]);

	// We memoize the return value here so it only recalculates if filteredData changes
	const { totalRainfall, averageRainfall, daysAbove10ml } = useMemo(
		() => getAggregateRainfall(filteredData),
		[filteredData]
	);
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
								<Statistic
									title={"Total Rainfall (mm)"}
									value={totalRainfall}
								/>
								<Statistic
									title={"Average Rainfall (mm)"}
									value={
										isNaN(averageRainfall)
											? 0
											: parseFloat(
													averageRainfall.toFixed(2)
											  )
									}
								/>
								<Statistic
									title={"Days where rainfall above 10m"}
									value={daysAbove10ml}
								/>
							</div>
						</div>
					</div>
					<div className="mt-4">
						<CustomTable
							data={tableData}
							columns={columns}
							columnFilters={columnFilters}
							setColumnFilters={setColumnFilters}
						/>
					</div>
				</main>
			</div>
		</>
	);
};

// We want the rainfallData to be fetched at request time so we use getServerSideProps.
// If the data is not needed at request time then we could use the api folder to fetch data instead
export const getServerSideProps: GetServerSideProps = async () => {
	return { props: { rainfallData } };
};

export default Home;
