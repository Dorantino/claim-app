/**
Bar Chart Component

Responsive bar chart component for displaying categorical data.
Uses Recharts library to render interactive bar charts with customizable data.

Features:
- Responsive design that adapts to container size
- X-axis displays categories
- Y-axis displays count values (integers only)
- Interactive tooltip on hover
- Blue color scheme (#2563eb)
- Built with Recharts library

Data Format:
Expected data prop should be an array of objects with:
- category: string (X-axis labels)
- count: number (Y-axis values)

@author Seth Korantwi
@component Chart
@uses recharts library
*/
"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

/**
Chart Component

Renders a responsive bar chart using the provided data.
Displays categories on X-axis and counts on Y-axis with interactive tooltips.

@component
@param {{ data: Array<{category: string, count: number}> }} props - Chart data and configuration
@param {Array} props.data - Array of data objects with category and count properties
@returns {JSX.Element} Responsive bar chart component
*/
export default function Chart({ data }: any) {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis dataKey="category" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
        </ResponsiveContainer>
    );
}