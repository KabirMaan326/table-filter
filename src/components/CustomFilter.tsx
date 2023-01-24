import { Fragment, memo, ReactNode } from "react";
import { Column, Table } from "@tanstack/react-table";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

// We memoize this component at the bottom of the page
// This reduces the amount of unneccesary renders by checking if props are equal
// From my checks this reduces the amount of renders from 4 to 2 when filter selection is changed
const CustomFilter = ({
	column,
	customFilterValues,
	customFilterOptions,
}: {
	column: Column<any, unknown>;
	table: Table<any>;
	customFilterValues: string[];
	customFilterOptions: ReactNode[];
}) => {
	const classNames = (...classes: string[]) => {
		return classes.filter(Boolean).join(" ");
	};
	return (
		<div className="relative mt-1 ">
			<Listbox
				value={customFilterValues || []}
				onChange={column.setFilterValue}
				multiple
			>
				{({ open }) => (
					<>
						<div className="relative mt-1">
							<Listbox.Button className="relative min-w-[200px] w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
								<span className="flex items-center">
									{customFilterValues &&
									customFilterValues.length > 0 ? (
										<span>
											{customFilterValues.length}{" "}
											filter(s) applied
										</span>
									) : (
										<span>Filters</span>
									)}
								</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
									<ChevronUpDownIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>
							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{customFilterOptions.map((value, i) => (
										<Listbox.Option
											key={i}
											className={({ active }) =>
												classNames(
													active
														? "text-white bg-indigo-600"
														: "text-gray-900",
													"relative cursor-default select-none py-2 pl-3 pr-9"
												)
											}
											value={value}
										>
											{({ selected, active }) => (
												<>
													<div className="flex items-center">
														<span
															className={classNames(
																selected
																	? "font-semibold"
																	: "font-normal",
																"ml-3 block truncate normal-case"
															)}
														>
															{value}
														</span>
													</div>

													{selected ? (
														<span
															className={classNames(
																active
																	? "text-white"
																	: "text-indigo-600",
																"absolute inset-y-0 right-0 flex items-center pr-4"
															)}
														>
															<EyeSlashIcon
																className="h-4 w-4 text-gray-400 "
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
	);
};

const MemoizedCustomFilter = memo(CustomFilter);
export default MemoizedCustomFilter;
