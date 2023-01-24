# Table with filters

I followed the orginal task but made some adjustments as follows

- I used TypeScript instead of JavaScript

- I used getServerSideProps instead of calling the api for the following  reasons:

    We want the rainfallData to be fetched at request time so we use getServerSideProps

    If the data is not needed at request time then we could use the api folder to fetch data instead


The table is styled using Tailwind CSS and Headless UI

The table is created using the tanstack/react-table package

The filter is created using a CustomFilter component using a Listbox dropdown




# Improvements

If I had more time I would have added the following improvements

- Handling error states

- Handling missing data or statistis with no value

- Create a types file for common types

- Decouple the filter state from the CustomTable so that the CustomTable can be used in other parts of the application

- Do data transformation in getServerSideProps

- Better table formatting. There are a number of possible things to add here mainly based on styling. For example conditional formatting of cells if above average rainfall.

- Add testing