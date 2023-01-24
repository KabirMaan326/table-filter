import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	type NextPage,
} from "next";

const Home: NextPage = ({
	rainfallData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
	return { props: { rainfallData: [] } };
};

export default Home;
