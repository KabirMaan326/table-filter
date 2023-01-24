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
			{ regionName: "Japan", value: 1 },
			{ regionName: "Australia", value: 0 },
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
			{ regionName: "Japan", value: 2 },
			{ regionName: "Australia", value: 1 },
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
			{ regionName: "Japan", value: 11 },
			{ regionName: "Australia", value: 4 },
		],
	},
	{
		date: "2023-01-13T21:15:00.000Z",
		data: [
			{
				regionName: "France",
				value: 41,
			},
			{
				regionName: "Spain",
				value: 10,
			},
			{
				regionName: "Norway",
				value: 7,
			},
			{ regionName: "Japan", value: 11 },
			{ regionName: "Australia", value: 20 },
		],
	},
	{
		date: "2023-01-14T21:15:00.000Z",
		data: [
			{
				regionName: "France",
				value: 11,
			},
			{
				regionName: "Spain",
				value: 16,
			},
			{
				regionName: "Norway",
				value: 37,
			},
			{ regionName: "Japan", value: 12 },
			{ regionName: "Australia", value: 4 },
		],
	},
	{
		date: "2023-01-15T21:15:00.000Z",
		data: [
			{
				regionName: "France",
				value: 13,
			},
			{
				regionName: "Spain",
				value: 6,
			},
			{
				regionName: "Norway",
				value: 17,
			},
			{ regionName: "Japan", value: 5 },
			{ regionName: "Australia", value: 6 },
		],
	},
	{
		date: "2023-01-16T21:15:00.000Z",
		data: [
			{
				regionName: "France",
				value: 73,
			},
			{
				regionName: "Spain",
				value: 16,
			},
			{
				regionName: "Norway",
				value: 48,
			},
			{ regionName: "Japan", value: 15 },
			{ regionName: "Australia", value: 16 },
		],
	},
];
