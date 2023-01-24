import {
	flexRender,
	FilterMeta,
	useReactTable,
	ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";

interface CustomFilterMeta extends FilterMeta {
	customFilter: boolean;
}

type CustomTableProps<T> = {
	data: T[];
	columns: ColumnDef<T>[];
};

// This component creates the custom table
// We could decouple the component by setting filterValue state here
// we can then have a separate filter state in the parent component
// the parent filter updater can be called in onColumnFiltersChange in the useReactTable hook
// We could then set the props of columnFilters/setColumnFiltes as optional and use the CustomTable across the App
const CustomTable = <T extends unknown>({
	data,
	columns,
}: CustomTableProps<T>) => {
	const table = useReactTable({
		data,
		columns,

		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<div className="mt-2 flex flex-col ">
			<div className="-my-2 overflow-x-auto max-w-full ">
				<div className="py-2 min-h-[320px] overflow align-middle inline-block">
					<div className="shadow  border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<th
													key={header.id}
													colSpan={header.colSpan}
													className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider"
												>
													{header.isPlaceholder ? null : (
														<>
															{header.index !==
																0 && (
																<div>
																	{flexRender(
																		header
																			.column
																			.columnDef
																			.header,
																		header.getContext()
																	)}
																</div>
															)}
															{header.column.getCanFilter() ? (
																<div>
																	{header
																		.column
																		.columnDef
																		?.meta &&
																		(
																			header
																				.column
																				.columnDef
																				?.meta as CustomFilterMeta
																		)
																			.customFilter && (
																			<div>
																				CustomFilter
																			</div>
																		)}
																</div>
															) : null}
														</>
													)}
												</th>
											);
										})}
									</tr>
								))}
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{table.getRowModel().rows.map((row) => {
									return (
										<tr key={row.id}>
											{row
												.getVisibleCells()
												.map((cell) => {
													return (
														<td
															key={cell.id}
															className={`px-6 py-4 whitespace-nowrap `}
														>
															{flexRender(
																cell.column
																	.columnDef
																	.cell,
																cell.getContext()
															)}
														</td>
													);
												})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomTable;
