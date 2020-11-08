import React from 'react';
import { Keypress } from '../types';
import { ChartAreaProps, ComputedStats } from '../types';
import './SegmentStatsChart.css';

interface SegmentStatsChartProps {
    data: ComputedStats[] | undefined;
}

const SegmentStatsChart = ({
    data,
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: SegmentStatsChartProps & ChartAreaProps) => {
    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    return (
        <>
            <h1>Segment stats</h1>
        </>
    );
};
export default SegmentStatsChart;
