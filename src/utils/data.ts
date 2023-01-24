export type RainfallByRegion = { regionName: string; value: number };

export type RainfallData = {
	date: string;
	data: RainfallByRegion[];
};

export const rainfallData: RainfallData[] = [
	{
		date: "2023-01-10T21:15:00.000Z",
		data: [
			{
				regionName: "France",
				value: 9,
			},
			{
				regionName: "Spain",
				value: 8,
			},
			{
				regionName: "Norway",
				value: 3,
			},
		],
	},
	{
		date: "2023-01-11T21:15:00.000Z",
		data: [
			{
				regionName: "France",
				value: 14,
			},
			{
				regionName: "Spain",
				value: 12,
			},
			{
				regionName: "Norway",
				value: 9,
			},
		],
	},
	{
		date: "2023-01-12T21:15:00.000Z",
		data: [
			{
				regionName: "France",
				value: 21,
			},
			{
				regionName: "Spain",
				value: 16,
			},
			{
				regionName: "Norway",
				value: 17,
			},
		],
	},
	{
		date: "2023-01-13T21:15:00.000Z",
		data: [
			{
				regionName: "France",
				value: 21,
			},
			{
				regionName: "Spain",
				value: 16,
			},
			{
				regionName: "Norway",
				value: 17,
			},
		],
	},
	{
		date: "2023-01-14T21:15:00.000Z",
		data: [
			{
				regionName: "France",
				value: 21,
			},
			{
				regionName: "Spain",
				value: 16,
			},
			{
				regionName: "Norway",
				value: 17,
			},
		],
	},
];
