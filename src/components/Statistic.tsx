type StatisticProps = {
	title: string;
	value: number;
};
const Statistic = ({ title, value }: StatisticProps) => {
	return (
		<div className="metric-card bg-white border border-gray-200  rounded-lg p-4 max-w-72 w-full">
			<a
				aria-label="YouTube Subscribers"
				target="_blank"
				rel="noopener noreferrer"
				href="https://stackdiary.com/"
			>
				<div className="flex items-center text-gray-900 ">{title}</div>
			</a>
			<p className="mt-2 text-3xl font-bold spacing-sm text-black ">
				{value}
			</p>
		</div>
	);
};

export default Statistic;
