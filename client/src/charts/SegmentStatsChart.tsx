import React, { useRef } from 'react';
import { Keypress, ChartAreaProps, ComputedStats } from '../types';
import { formatTime, extendArrayWith } from '../utils';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Bar } from '@vx/shape';
import { useTooltip, useTooltipInPortal } from '@vx/tooltip';
import { scaleLinear, scalePower, scaleBand } from '@vx/scale';
import { max } from 'd3-array';
import './SegmentStatsChart.css';

interface SegmentStatsChartProps {
    data: ComputedStats[];
    paragraphQuotes: string[];
}

interface TooltipData {
    stats: ComputedStats | null;
    quote: string;
}

// accessors
// const getTime = (d: ComputedStats) => d.time;
const getWpm = (d: ComputedStats) => d.wpm;
const getAcc = (d: ComputedStats) => d.acc;

const SegmentStatsChart = ({
    data,
    paragraphQuotes,
    margin = { top: 32 + 16, right: 32, bottom: 32, left: 64 },
}: SegmentStatsChartProps & ChartAreaProps) => {
    const {
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip,
    } = useTooltip<TooltipData>();
    const { containerRef, TooltipInPortal } = useTooltipInPortal();
    const container = useRef<HTMLDivElement>(null);
    let tooltipTimeout: number;
    if (!container || !data.length) {
        return null;
    }

    const width = container.current?.clientWidth || 0;
    const height = container.current?.clientHeight || 0;
    const highestWpm = max(data, getWpm) || 0;

    const extendedData: Array<ComputedStats | null> = extendArrayWith(
        data,
        paragraphQuotes.length,
        null
    );

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const colorScaleInner = scalePower<string>({
        domain: [0, 7, 10],
        range: ['rgb(255, 0, 0)', 'rgb(255, 255, 0', 'rgb(0, 255, 0)'],
        clamp: true,
        exponent: 2,
    });

    const wpmTickValues = () => {
        let values = [];
        let delta = highestWpm < 100 ? 20 : 40;
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

    const tooltipStats = tooltipData?.stats ? (
        <>
            <div className="tooltip__value">
                {formatTime(tooltipData.stats?.time || 0)}{' '}
                <span className="tooltip__hint">time</span>
            </div>
            <div className="tooltip__value">
                {tooltipData.stats?.wpm.toFixed(2)} <span className="tooltip__hint">wpm</span>
            </div>
            <div className="tooltip__value">
                {tooltipData.stats?.acc.toFixed(2)} <span className="tooltip__hint">acc</span>
            </div>
        </>
    ) : null;

    return (
        <div className="segment-stats-chart" ref={container} style={{ position: 'relative' }}>
            <svg width={width} height={height} ref={containerRef}>
                <GridRows
                    top={margin.top}
                    left={margin.left}
                    scale={yScale}
                    width={xMax}
                    tickValues={wpmTickValues()}
                    className="segment-stats-grid"
                />
                <Group top={margin.top} left={margin.left}>
                    {extendedData.map((data, i) => {
                        let barHeight: number, fillColor: string;
                        const x = xScale(i) as number;
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
                                onMouseLeave={() => {
                                    tooltipTimeout = window.setTimeout(() => {
                                        hideTooltip();
                                    }, 300);
                                }}
                                onMouseMove={(event) => {
                                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                                    if (container && container.current) {
                                        const top = event.clientY - container.current.offsetTop;
                                        const left = margin.left + x + barWidth / 2;
                                        showTooltip({
                                            tooltipData: {
                                                quote: paragraphQuotes[i],
                                                stats: data,
                                            },
                                            tooltipTop: top,
                                            tooltipLeft: left,
                                        });
                                    }
                                }}
                            />
                        );
                    })}
                </Group>
                <AxisLeft
                    top={margin.top}
                    left={margin.left - 8}
                    scale={yScale}
                    hideAxisLine
                    hideTicks
                    hideZero
                    tickValues={wpmTickValues()}
                    tickClassName="segment-stats-axis"
                />
                <AxisBottom
                    top={yMax + margin.top - 8}
                    left={margin.left}
                    scale={xScale}
                    numTicks={Math.max(paragraphQuotes.length, 32)}
                    hideAxisLine
                    hideTicks
                    tickClassName="segment-stats-axis"
                />
            </svg>
            {tooltipOpen && tooltipData && (
                <TooltipInPortal
                    key={Math.random()} // TODO: the docs say this should be set to random. Figure out why
                    top={tooltipTop}
                    left={tooltipLeft}
                    className="tooltip"
                    style={{ position: 'absolute' }} // overwrite the default inline style
                >
                    <div className="tooltip__title">
                        <strong>{tooltipData.quote}</strong>
                    </div>
                    {tooltipStats}
                </TooltipInPortal>
            )}
            )
        </div>
    );
};

export default SegmentStatsChart;
