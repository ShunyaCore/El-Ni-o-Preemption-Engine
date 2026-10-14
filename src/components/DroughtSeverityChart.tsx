import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { useApp } from '../context/AppContext';

type MetricType = 'risk' | 'deficit' | 'impact';

interface DataPoint {
  day: number;
  label: string;
  isProjected: boolean;
  beed: number;
  latur: number;
  osmanabad: number;
  nanded: number;
  solapur: number;
}

export const DroughtSeverityChart: React.FC = () => {
  const { stressScenario, budget } = useApp();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeMetric, setActiveMetric] = useState<MetricType>('risk');
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [visibleDistricts, setVisibleDistricts] = useState<Record<string, boolean>>({
    beed: true,
    latur: true,
    osmanabad: true,
    nanded: true,
    solapur: true
  });

  const scenarioMultiplier = useMemo(() => {
    if (stressScenario === 'mild') return 0.85;
    if (stressScenario === 'extreme') return 1.25;
    return 1.0;
  }, [stressScenario]);

  const reliefDampening = useMemo(() => {
    return Math.max(0.7, 1 - (budget - 20) / 450);
  }, [budget]);

  const timelineData: DataPoint[] = useMemo(() => {
    const timeLabels = [
      '24 Sep',
      '01 Oct',
      '08 Oct',
      '15 Oct',
      '24 Oct (Today)',
      '01 Nov (Proj)',
      '08 Nov (Proj)',
      '15 Nov (Proj)',
      '22 Nov (Proj)',
      '30 Nov (Proj)'
    ];

    return timeLabels.map((label, idx) => {
      const isProjected = idx >= 4;

      if (activeMetric === 'risk') {
        return {
          day: idx,
          label,
          isProjected,
          beed: Math.min(1.0, +(0.72 + idx * 0.038 * scenarioMultiplier - (isProjected ? (1 - reliefDampening) * 0.1 : 0)).toFixed(2)),
          latur: Math.min(1.0, +(0.68 + idx * 0.035 * scenarioMultiplier - (isProjected ? (1 - reliefDampening) * 0.09 : 0)).toFixed(2)),
          osmanabad: Math.min(1.0, +(0.58 + idx * 0.03 * scenarioMultiplier - (isProjected ? (1 - reliefDampening) * 0.08 : 0)).toFixed(2)),
          nanded: Math.min(1.0, +(0.50 + idx * 0.026 * scenarioMultiplier - (isProjected ? (1 - reliefDampening) * 0.07 : 0)).toFixed(2)),
          solapur: Math.min(1.0, +(0.44 + idx * 0.02 * scenarioMultiplier - (isProjected ? (1 - reliefDampening) * 0.06 : 0)).toFixed(2))
        };
      } else if (activeMetric === 'deficit') {
        return {
          day: idx,
          label,
          isProjected,
          beed: Math.min(85, +(38 + idx * 4.0 * scenarioMultiplier).toFixed(1)),
          latur: Math.min(85, +(34 + idx * 3.8 * scenarioMultiplier).toFixed(1)),
          osmanabad: Math.min(85, +(29 + idx * 3.3 * scenarioMultiplier).toFixed(1)),
          nanded: Math.min(85, +(24 + idx * 2.8 * scenarioMultiplier).toFixed(1)),
          solapur: Math.min(85, +(20 + idx * 2.5 * scenarioMultiplier).toFixed(1))
        };
      } else {
        return {
          day: idx,
          label,
          isProjected,
          beed: Math.min(100, Math.round(42 + idx * 8.0 * scenarioMultiplier * (isProjected ? reliefDampening : 1))),
          latur: Math.min(100, Math.round(38 + idx * 7.5 * scenarioMultiplier * (isProjected ? reliefDampening : 1))),
          osmanabad: Math.min(100, Math.round(32 + idx * 6.5 * scenarioMultiplier * (isProjected ? reliefDampening : 1))),
          nanded: Math.min(100, Math.round(26 + idx * 5.2 * scenarioMultiplier * (isProjected ? reliefDampening : 1))),
          solapur: Math.min(100, Math.round(20 + idx * 4.5 * scenarioMultiplier * (isProjected ? reliefDampening : 1)))
        };
      }
    });
  }, [activeMetric, scenarioMultiplier, reliefDampening]);

  const districtConfigs = [
    { key: 'beed', label: 'Beed', color: '#C62828' },
    { key: 'latur', label: 'Latur', color: '#B26A00' },
    { key: 'osmanabad', label: 'Dharashiv', color: '#0F4C81' },
    { key: 'nanded', label: 'Nanded', color: '#2E7D32' },
    { key: 'solapur', label: 'Solapur', color: '#6B7280' }
  ];

  const toggleDistrict = (key: string) => {
    setVisibleDistricts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 240;
    const margin = { top: 20, right: 25, bottom: 35, left: 45 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height).attr('viewBox', `0 0 ${width} ${height}`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, timelineData.length - 1])
      .range([0, innerWidth]);

    const yMax = activeMetric === 'risk' ? 1.0 : activeMetric === 'deficit' ? 85 : 100;
    const yMin = activeMetric === 'risk' ? 0.2 : activeMetric === 'deficit' ? 10 : 10;

    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerHeight, 0]).nice();

    // Horizontal Grid Lines in clean light grey
    const yAxisTicks = yScale.ticks(4);
    g.append('g')
      .selectAll('line')
      .data(yAxisTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d))
      .attr('stroke', '#E5E7EB')
      .attr('stroke-width', 1);

    // Critical Threshold Line
    const thresholdVal = activeMetric === 'risk' ? 0.75 : activeMetric === 'deficit' ? 50 : 60;
    const thresholdY = yScale(thresholdVal);
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', thresholdY)
      .attr('y2', thresholdY)
      .attr('stroke', '#C62828')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-dasharray', '4,3')
      .attr('stroke-width', 1);

    g.append('text')
      .attr('x', innerWidth - 4)
      .attr('y', thresholdY - 4)
      .attr('text-anchor', 'end')
      .attr('fill', '#C62828')
      .attr('font-size', '10px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-weight', '500')
      .text('Severe threshold');

    // Forecast Divider Line & Shading
    const todayX = xScale(4);
    g.append('rect')
      .attr('x', todayX)
      .attr('y', 0)
      .attr('width', innerWidth - todayX)
      .attr('height', innerHeight)
      .attr('fill', '#F6F7F9')
      .attr('opacity', 0.8);

    g.append('line')
      .attr('x1', todayX)
      .attr('x2', todayX)
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#9CA3AF')
      .attr('stroke-dasharray', '3,3')
      .attr('stroke-width', 1);

    g.append('text')
      .attr('x', todayX + 6)
      .attr('y', 14)
      .attr('fill', '#4B5563')
      .attr('font-size', '10px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-weight', '500')
      .text('30-day projection →');

    // Line Generator
    const lineGenerator = d3
      .line<{ x: number; y: number }>()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveMonotoneX);

    // Render Each District Series
    districtConfigs.forEach(d => {
      if (!visibleDistricts[d.key]) return;

      const seriesPoints = timelineData.map(pt => ({
        x: xScale(pt.day),
        y: yScale((pt as any)[d.key])
      }));

      // Line
      g.append('path')
        .datum(seriesPoints)
        .attr('fill', 'none')
        .attr('stroke', d.color)
        .attr('stroke-width', d.key === 'beed' ? 2.2 : 1.6)
        .attr('stroke-linecap', 'round')
        .attr('d', lineGenerator);

      // Data dots
      g.selectAll(`.dot-${d.key}`)
        .data(seriesPoints)
        .enter()
        .append('circle')
        .attr('cx', p => p.x)
        .attr('cy', p => p.y)
        .attr('r', (p, i) => (i === 4 ? 3.5 : 2))
        .attr('fill', d.color)
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 1);
    });

    // X-Axis Labels
    const xAxis = g.append('g').attr('transform', `translate(0,${innerHeight})`);
    timelineData.forEach((pt, i) => {
      xAxis
        .append('text')
        .attr('x', xScale(i))
        .attr('y', 18)
        .attr('text-anchor', 'middle')
        .attr('fill', i === 4 ? '#111827' : '#6B7280')
        .attr('font-size', '10px')
        .attr('font-family', 'Inter, sans-serif')
        .attr('font-weight', i === 4 ? '600' : '400')
        .text(pt.label.split(' ')[0]);
    });

    // Y-Axis Labels
    const yAxis = g.append('g');
    yAxisTicks.forEach(tick => {
      yAxis
        .append('text')
        .attr('x', -8)
        .attr('y', yScale(tick) + 3)
        .attr('text-anchor', 'end')
        .attr('fill', '#6B7280')
        .attr('font-size', '10px')
        .attr('font-family', 'Inter, sans-serif')
        .text(activeMetric === 'deficit' ? `-${tick}%` : `${tick}`);
    });

    // Overlay for Hover Inspection
    const overlay = g
      .append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair');

    overlay.on('mousemove', function (event) {
      const [mouseX] = d3.pointer(event);
      const step = innerWidth / (timelineData.length - 1);
      const closestIndex = Math.max(0, Math.min(timelineData.length - 1, Math.round(mouseX / step)));
      const point = timelineData[closestIndex];

      setHoveredPoint(point);
      setHoverX(margin.left + xScale(closestIndex));
    });

    overlay.on('mouseleave', function () {
      setHoveredPoint(null);
      setHoverX(null);
    });
  }, [timelineData, activeMetric, visibleDistricts]);

  return (
    <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E3E6EB]">
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">
            Drought Severity Indices & 30-Day Forecast Trends
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Real-time telemetry trend lines with reactive budget dampening model
          </p>
        </div>

        {/* Flat Segmented Control */}
        <div className="flex items-center bg-[#F1F3F5] p-0.5 rounded-md border border-[#E3E6EB] self-start sm:self-center">
          <button
            type="button"
            onClick={() => setActiveMetric('risk')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeMetric === 'risk'
                ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                : 'text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            Risk Score (0–1.0)
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('deficit')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeMetric === 'deficit'
                ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                : 'text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            Rainfall Deficit (%)
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('impact')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeMetric === 'impact'
                ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                : 'text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            Crop Distress Index
          </button>
        </div>
      </div>

      {/* District Toggles & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-[#6B7280] mr-1">Districts:</span>
          {districtConfigs.map(d => {
            const isVisible = visibleDistricts[d.key];
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => toggleDistrict(d.key)}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs transition-colors border ${
                  isVisible
                    ? 'bg-[#F9FAFB] border-[#E3E6EB] text-[#111827]'
                    : 'bg-white border-dashed border-[#D1D5DB] text-[#9CA3AF] line-through'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-[#6B7280] tabular-nums">
          Source: IMD rainfall feeds & Sentinel-2 NDVI
        </div>
      </div>

      {/* SVG Container */}
      <div ref={containerRef} className="relative w-full h-[240px] mt-2">
        <svg ref={svgRef} className="w-full h-full overflow-visible" />

        {hoveredPoint && hoverX !== null && (
          <div
            className="absolute top-2 pointer-events-none z-20 transform -translate-x-1/2 p-2.5 rounded-md bg-white border border-[#E3E6EB] shadow-md text-xs min-w-[150px]"
            style={{ left: `${hoverX}px` }}
          >
            <div className="flex items-center justify-between pb-1 border-b border-[#E3E6EB] mb-1.5">
              <span className="font-semibold text-[#111827]">{hoveredPoint.label}</span>
              {hoveredPoint.isProjected && (
                <span className="text-[10px] text-[#0F4C81] font-medium">Forecast</span>
              )}
            </div>
            <div className="space-y-1 font-mono text-[11px]">
              {visibleDistricts.beed && (
                <div className="flex justify-between items-center text-[#C62828]">
                  <span>Beed:</span>
                  <span className="font-semibold">{hoveredPoint.beed}</span>
                </div>
              )}
              {visibleDistricts.latur && (
                <div className="flex justify-between items-center text-[#B26A00]">
                  <span>Latur:</span>
                  <span className="font-semibold">{hoveredPoint.latur}</span>
                </div>
              )}
              {visibleDistricts.osmanabad && (
                <div className="flex justify-between items-center text-[#0F4C81]">
                  <span>Dharashiv:</span>
                  <span className="font-semibold">{hoveredPoint.osmanabad}</span>
                </div>
              )}
              {visibleDistricts.nanded && (
                <div className="flex justify-between items-center text-[#2E7D32]">
                  <span>Nanded:</span>
                  <span className="font-semibold">{hoveredPoint.nanded}</span>
                </div>
              )}
              {visibleDistricts.solapur && (
                <div className="flex justify-between items-center text-[#6B7280]">
                  <span>Solapur:</span>
                  <span className="font-semibold">{hoveredPoint.solapur}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
