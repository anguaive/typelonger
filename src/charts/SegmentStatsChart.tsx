import React, { useRef } from 'react';
import { Keypress, ChartAreaProps, ComputedStats } from '../types';
import { extendArrayWith } from '../utils';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { AxisLeft, AxisBottom } from '@vx/axis';
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
    margin = { top: 32 + 16, right: 32, bottom: 32, left: 64 },
}: SegmentStatsChartProps & ChartAreaProps) => {
    const container = useRef<HTMLDivElement>(null);
    if (!container || !data.length) {
        return null;
    }

    const width = container.current?.clientWidth || 0;
    const height = container.current?.clientHeight || 0;
    const highestWpm = max(data, getWpm) || 0;
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

    const wpmTickValues = () => {
        let values = [];
        let delta = highestWpm < 100 ? 10 : 20;
        let current = 0;
        while (current <= highestWpm) {
            values.push((current += delta));
        }
        return values;
    };

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
        domain: [0, highestWpm],
        range: [yMax, 0],
    });

    const xScale = scaleBand<number>({
        domain: extendedData.map((d, i) => i),
        range: [0, xMax],
        round: true,
        padding: 0.2,
    });

    return (
        <div className="segment-stats-chart-container" ref={container}>
            <svg width={width} height={height} className="segment-stats-chart">
                <GridRows
                    top={margin.top}
                    left={margin.left}
                    scale={yScale}
                    width={xMax}
                    tickValues={wpmTickValues()}
                    stroke={'#cccccc'}
                />
                <Group top={margin.top} left={margin.left}>
                    {extendedData.map((data, i) => {
                        let barHeight: number, fillColor: string;
                        const x = xScale(i);
                        const barWidth = xScale.bandwidth();
                        if (data) {
                            barHeight = yMax - (yScale(getWpm(data)) as number);
                            fillColor = colorScale(getAcc(data)) as string;
                        } else {
                            barHeight = 0.04 * yMax;
                            fillColor = 'rgb(192, 192, 192)';
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
                <AxisLeft
                    top={margin.top + 4}
                    left={margin.left - 8}
                    label={'wpm'}
                    labelProps={{
                        dx: 16,
                        dy: 0,
                        fontSize: 20,
                    }}
                    scale={yScale}
                    hideAxisLine
                    hideTicks
                    hideZero
                    tickValues={wpmTickValues()}
                    tickLabelProps={() => ({
                        fill: 'black',
                        fontSize: 16,
                        textAnchor: 'middle',
                    })}
                />
                <AxisBottom
                    top={yMax + margin.top - 8}
                    left={margin.left}
                    scale={xScale}
                    numTicks={Math.max(paragraphsCount, 32)}
                    hideAxisLine
                    hideTicks
                    tickLabelProps={() => ({
                        fill: 'black',
                        fontSize: 16,
                        textAnchor: 'middle',
                    })}
                />
            </svg>
        </div>
    );
};

export default SegmentStatsChart;
