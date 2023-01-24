import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { RainfallData } from "./data";

export type RegionData = Map<string, number>;

export type TransformedDataType = {
	regionName: string;
	rainfallData: RegionData;
};

export type TranformProps = {
	tableData: TransformedDataType[];
	columns: ColumnDef<TransformedDataType>[];
};

const columnHelper = createColumnHelper<TransformedDataType>();

export function getTableDataFromRainfall(data: RainfallData[]): TranformProps {
	const regionData = new Map(); // We use a set so we can easily update region data but still iterate over values
	const dates = new Set<string>(); // We want unique values for dates so we use a Set
	data.forEach((item) => {
		dates.add(item.date);
		item.data.forEach((innerItem) => {
			const hasValue = regionData.has(innerItem.regionName);
			if (!hasValue) {
				const newMap = new Map();
				newMap.set(item.date, innerItem.value);
				regionData.set(innerItem.regionName, newMap);
			} else {
				const value = regionData.get(innerItem.regionName);
				value.set(item.date, innerItem.value);
				regionData.set(innerItem.regionName, value);
			}
		});
	});

	// Create an array from regionData with correct format for table
	const tableData = Array.from(regionData, ([name, value]) => ({
		regionName: name,
		rainfallData: value,
	}));

	// We create columns for the table here, we initialise an array with the first column being regionName,
	// We then iterate over the dates to add the rest of the columns
	const nestedColumns: ColumnDef<TransformedDataType, any>[] = [
		{
			accessorKey: "regionName",
			cell: (info) => info.getValue(),
			footer: (props) => props.column.id,
			filterFn: (row, columnId, value) => {
				return !value.includes(row.getValue(columnId)); // We define a custom filter function here
			},
			meta: {
				customFilter: true, // We pass some metadata as we only want the first column to show the CustomFilter
			},
		},
	];

	const columnGroup: ColumnDef<TransformedDataType, any>[] = [];

	// We iterate over the dates array to create columns for each date
	dates.forEach((value) => {
		columnGroup.push(
			columnHelper.accessor((row) => row.rainfallData.get(value), {
				header: () => new Date(value).toLocaleDateString("en-uk"), // Format the date into readable string
				id: value,
				cell: (props) => (
					<div className="text-right">{props.getValue()}</div>
				),
			})
		);
	});

	const columns = [
		...nestedColumns,
		columnHelper.group({
			id: "Rainfall",
			header: () => (
				<div className="mt-4 -mb-3 text-lg ">Rainfall (mm)</div>
			),
			columns: columnGroup,
		}),
	];

	return { tableData, columns };
}


export const getAggregateRainfall = (data: TransformedDataType[]) => {
	let totalRainfall = 0;
	let numOfDays = 0;
	const daysAbove10ml = new Set(); // We want unique values where days are above 10ml of rainfall

	data.forEach((region) => {
		region.rainfallData.forEach((value, key) => {
			totalRainfall += value;
			numOfDays++;
			if (value > 10) {
				daysAbove10ml.add(key);
			}
		});
	});

	return {
		totalRainfall,
		averageRainfall: totalRainfall / numOfDays,
		daysAbove10ml: daysAbove10ml.size,
	};
};