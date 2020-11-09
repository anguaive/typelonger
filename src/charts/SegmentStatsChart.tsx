import React from 'react';
import { Keypress, ChartAreaProps, ComputedStats } from '../types';
import { extendArrayWith } from '../utils';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleLinear, scalePower, scaleBand } from '@vx/scale';
import { max } from 'd3-array';
import './SegmentStatsChart.css';

interface SegmentStatsChartProps {
    data: ComputedStats[];
    paragraphsCount: number;
}

// accessors
const getTime = (d: ComputedStats) => d.time;
const getWpm = (d: ComputedStats) => d.wpm;
const getAcc = (d: ComputedStats) => d.acc;

const SegmentStatsChart = ({
    data,
    paragraphsCount,
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: SegmentStatsChartProps & ChartAreaProps) => {
    const extendedData: Array<ComputedStats | null> = extendArrayWith(data, paragraphsCount, null);

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const x = scalePower<number>({ domain: [0, 100], range: [0, 100], clamp: true, exponent: 2 });

    const colorScaleInner = scalePower<string>({
        domain: [0, 7, 10],
        range: ['rgb(255, 0, 0)', 'rgb(255, 255, 0', 'rgb(0, 255, 0)'],
        clamp: true,
        exponent: 2,
    });
    const colorScale = (acc: number) => {
        if (acc === 100) {
            return 'rgb(0, 255, 255)';
        } else if (acc < 90) {
            return 'rgb(255, 0, 0)';
        } else {
            return colorScaleInner(acc - 90);
        }
    };

    const yScale = scaleLinear<number>({
        domain: [0, max(data, getWpm) as number],
        range: [yMax, 0],
    });

    const xScale = scaleBand<number>({
        domain: extendedData.map((d, i) => i),
        range: [0, xMax],
        round: true,
        padding: 0.2,
    });

    return (
        <svg width={width} height={height} className="segment-stats-chart">
            <rect x={0} y={0} width={width} height={height} fill={'#eeeeee'} rx={14} />
            <Group top={margin.top} left={margin.left}>
                {extendedData.map((data, i) => {
                    let barHeight: number, fillColor: string;
                    const x = xScale(i);
                    const barWidth = xScale.bandwidth();
                    if (data) {
                        barHeight = yMax - (yScale(getWpm(data)) as number);
                        fillColor = colorScale(getAcc(data)) as string;
                    } else {
                        barHeight = 0;
                        fillColor = 'rgb(128, 128, 128)';
                    }
                    return (
                        <Bar
                            key={`bar-${i}`}
                            x={x}
                            y={yMax - barHeight}
                            width={barWidth}
                            height={barHeight}
                            fill={fillColor}
                        />
                    );
                })}
            </Group>
        </svg>
    );
};

export default SegmentStatsChart;
