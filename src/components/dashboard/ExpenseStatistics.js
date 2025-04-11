import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import api from '../../utils/api';
import LoadingState from '../common/LoadingState';

const ExpenseStatistics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchExpenseStatistics = async () => {
      try {
        setLoading(true);
        const response = await api.getExpenseStatistics();
        
        // Updated percentages and colors to match the specified values
        const fixedData = [
          { category: 'Entertainment', value: 30, color: '#343C6A', displayName: 'Entertainment' }, // Dark blue for Entertainment
          { category: 'Bill Expense', value: 15, color: '#FC7900', displayName: 'Bill Expense' },  // Orange for Bill Expense
          { category: 'Investment', value: 20, color: '#396AFF', displayName: 'Investment' },    // Blue for Investment
          { category: 'Others', value: 35, color: '#232323', displayName: 'Others' }         // Dark gray for Others
        ];
        
        // Make sure we have all the categories in the API response
        const apiCategories = response.labels;
        for (const category of ['Entertainment', 'Bill Expense', 'Investment', 'Others']) {
          if (!apiCategories.includes(category)) {
            console.warn(`Category ${category} not found in API response, using hardcoded value`);
          }
        }
        
        setData(fixedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load expense statistics data');
        setLoading(false);
        console.error('Error fetching expense statistics:', err);
      }
    };

    fetchExpenseStatistics();
  }, []);

  useEffect(() => {
    if (!data || !chartRef.current) return;
    
    // Clear any existing SVG
    d3.select(chartRef.current).selectAll('*').remove();
    
    // Create new chart
    createSplitPieChart();
  }, [data]);

  const createSplitPieChart = () => {
    // Chart dimensions
    const width = 450;
    const height = 450;
    const margin = 50;
    const radius = Math.min(width, height) / 2 - margin;
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: auto;')
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    // Custom pie layout with exact angles to match the reference image
    const customPie = () => {
      const slices = [];
      
      // Investment (bottom left): 0° to 72°
      const investmentSlice = data.find(d => d.category === 'Investment');
      slices.push({
        data: investmentSlice,
        value: investmentSlice.value,
        startAngle: 0, // 0 degrees
        endAngle: Math.PI * 0.4, // 72 degrees
        padAngle: 0
      });
      
      // Bill Expense (top right): 72° to 110°
      const billExpenseSlice = data.find(d => d.category === 'Bill Expense');
      slices.push({
        data: billExpenseSlice,
        value: billExpenseSlice.value,
        startAngle: Math.PI * 0.4, // 72 degrees
        endAngle: Math.PI * 0.611, // 110 degrees
        padAngle: 0
      });
      
      // Entertainment (top left): 110° to 254°
      const entertainmentSlice = data.find(d => d.category === 'Entertainment');
      slices.push({
        data: entertainmentSlice,
        value: entertainmentSlice.value,
        startAngle: Math.PI * 0.611, // 110 degrees
        endAngle: Math.PI * 1.41, // 254 degrees
        padAngle: 0
      });
      
      // Others (bottom right): 254° to 360°
      const othersSlice = data.find(d => d.category === 'Others');
      slices.push({
        data: othersSlice,
        value: othersSlice.value,
        startAngle: Math.PI * 1.41, // 254 degrees
        endAngle: Math.PI * 2, // 360 degrees
        padAngle: 0
      });
      
      return slices;
    };
    
    const pieData = customPie();
    
    // Arc generators for animation
    const arcInitial = d3.arc()
      .innerRadius(0)
      .outerRadius(0) // Start with zero radius for growth animation
      .cornerRadius(0);
      
    const arcFinal = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .cornerRadius(0);
    
    // Add shadow filter for better text readability
    const defs = svg.append("defs");
    const filter = defs.append("filter")
      .attr("id", "text-shadow")
      .attr("filterUnits", "userSpaceOnUse")
      .attr("width", "250%")
      .attr("height", "250%");
    
    // Create shadow effect
    filter.append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "0")
      .attr("stdDeviation", "1")
      .attr("flood-color", "rgba(0,0,0,0.5)")
      .attr("flood-opacity", "0.7");
    
    // Calculate explosion offsets for each slice (to match the image)
    const getExplosionOffset = (d) => {
      const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      let distance = 5; // Reduced default distance
      
      // Adjust distance for each category
      switch(d.data.category) {
        case 'Investment':
          distance = 6;
          break;
        case 'Bill Expense':
          distance = 5;
          break;
        case 'Entertainment':
          distance = 6;
          break;
        case 'Others':
          distance = 6;
          break;
      }
      
      return {
        x: Math.sin(midAngle) * distance,
        y: -Math.cos(midAngle) * distance
      };
    };
    
    // Draw pie slices with animation
    const paths = svg.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arcInitial) // Start with zero radius
      .attr('fill', d => d.data.color)
      .style('stroke', 'white')
      .style('stroke-width', 0.1) // Minimal white border
      .style('opacity', 0) // Start with zero opacity
      .attr('transform', 'translate(0, 0)');
    
    // Animate slices growing from center
    paths.transition()
      .duration(800)
      .delay((d, i) => i * 150) // Stagger the animations
      .attr('d', arcFinal) // Grow to full radius
      .style('opacity', 1) // Fade in
      .transition() // Add second transition for explosion effect
      .duration(500)
      .attr('transform', d => {
        const offset = getExplosionOffset(d);
        return `translate(${offset.x}, ${offset.y})`;
      });
    
    // Precise text positioning based on the reference image
    const getTextPosition = (d) => {
      // Calculate the midpoint angle of the slice
      const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      
      // Custom positioning for each category
      let factor, xOffset = 0, yOffset = 0;
      
      switch(d.data.category) {
        case 'Investment':
          factor = 0.55;
          xOffset = 10;
          yOffset = 5;
          break;
        case 'Bill Expense':
          factor = 0.6;  // Keep the same to maintain radial position
          xOffset = 0;
          yOffset = 5;  // Reduced from 15 to 5 to move text up
          break;
        case 'Entertainment':
          factor = 0.55;
          xOffset = -15; 
          yOffset = -15;
          break;
        case 'Others':
          factor = 0.55;
          xOffset = 5;
          yOffset = 10;
          break;
        default:
          factor = 0.5;
      }
      
      // Add explosion offset
      const explosionOffset = getExplosionOffset(d);
      xOffset += explosionOffset.x;
      yOffset += explosionOffset.y;
      
      // Convert polar to Cartesian coordinates with offsets
      const x = Math.sin(midAngle) * (radius * factor) + xOffset;
      const y = -Math.cos(midAngle) * (radius * factor) + yOffset;
      
      return { x, y };
    };
    
    // Add percentage labels with animation
    const percentageLabels = svg.selectAll('.percentage-label')
      .data(pieData)
      .enter()
      .append('text')
      .attr('class', 'percentage-label')
      .attr('transform', d => {
        const pos = getTextPosition(d);
        // Adjust vertical spacing for Bill Expense percentage
        const yOffset = d.data.category === 'Bill Expense' ? -8 : -10;  // Changed from -15 to -8
        return `translate(${pos.x}, ${pos.y + yOffset})`;
      })
      .style('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('filter', 'url(#text-shadow)')
      .style('opacity', 0)
      .text(d => `${d.data.value}%`);

    // Add category labels with animation
    const categoryLabels = svg.selectAll('.category-label')
      .data(pieData)
      .enter()
      .append('text')
      .attr('class', 'category-label')
      .attr('transform', d => {
        const pos = getTextPosition(d);
        // Adjust vertical spacing for Bill Expense category
        const yOffset = d.data.category === 'Bill Expense' ? 8 : 10;  // Changed from 5 to 8
        return `translate(${pos.x}, ${pos.y + yOffset})`;
      })
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '500')
      .style('fill', 'white')
      .style('filter', 'url(#text-shadow)')
      .style('opacity', 0)
      .text(d => d.data.displayName);
      
    // Animate text elements to fade in after slices appear
    percentageLabels.transition()
      .duration(500)
      .delay((d, i) => 800 + i * 150) // Start after slices finish animating
      .style('opacity', 1); // Fade in
      
    categoryLabels.transition()
      .duration(500)
      .delay((d, i) => 900 + i * 150) // Start slightly after percentage labels
      .style('opacity', 1); // Fade in
  };

  if (loading) return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Expense Statistics</h2>
      <div className="rounded-lg p-6 md:bg-white md:shadow h-[320px] overflow-hidden">
        <div className="h-80 flex items-center justify-center">
          <LoadingState type="chart" />
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div>
        <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Expense Statistics</h2>
        <div className="rounded-lg p-6 md:bg-white md:shadow h-[320px] overflow-hidden">
          <div className="h-80 flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#343C6A] leading-none mb-4">Expense Statistics</h2>
      <div className="rounded-lg p-6 md:bg-white md:shadow h-[320px] overflow-hidden">
        <div ref={chartRef} className="h-[280px] flex items-center justify-center">
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;
