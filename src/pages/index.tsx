import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	type NextPage,
} from "next";
import { useMemo } from "react";
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
		<div>
			<h1>Home</h1>
		</div>
	);
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
	return { props: { rainfallData } };
};

export default Home;
