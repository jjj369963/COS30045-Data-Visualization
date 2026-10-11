// bar-chart.js - COS30045 Exercise 5.1: Vertical Bar Chart with axis
// Author: Lim Jun Xian

// Step 1: Load and parse dataset
d3.csv("assets/data/Data_exercise_5.1.csv", d => {
    return {
        // Convert screen technology name to uppercase (LED, OLED, LCD)
        Screen_Tech: d.Screen_Tech.toUpperCase(),
        // Convert energy consumption string to numeric float
        Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {
    // Log parsed data to console for verification
    console.log("Loaded dataset for 55-inch TVs:", data);

    // Step 2: Sort dataset in descending order based on energy consumption
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

    // Step 3: Draw vertical bar chart with sorted data
    drawBarChart(data);
}).catch(error => {
    console.error("Failed to load CSV data for bar chart:", error);
});

// Function to draw vertical bar chart with scales and axes
const drawBarChart = data => {
    // Set up inner chart margins and dimensions
    const margin = { top: 40, right: 170, bottom: 40, left: 65 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Append responsive SVG container
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);

    // Create inner chart group and apply margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    // X scale: Band scale with inner and outer padding for balanced bar width
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .paddingInner(0.25)
        .paddingOuter(0.15);

    // Y scale: Continuous linear scale for energy consumption (kWh)
    const maxEnergy = d3.max(data, d => d.Energy_Consumption);
    const yScale = d3.scaleLinear()
        .domain([0, maxEnergy * 1.08])
        .range([innerHeight, 0])
        .nice();

    // Axis generators
    // Remove tick mark lines on X axis and add comfortable label padding
    const bottomAxis = d3.axisBottom(xScale)
        .tickSize(0)
        .tickPadding(10);

    const leftAxis = d3.axisLeft(yScale);

    // Append X axis to the bottom of the chart
    innerChart
        .append("g")
        .attr("class", "axis-x")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Append Y axis to the left
    innerChart
        .append("g")
        .attr("class", "axis-y")
        .call(leftAxis);

    // Add Y axis label rotated vertically along the axis
    innerChart
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh)");

    // Draw bars with CSS-driven styling and hover transitions
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption));

    // Add direct value labels on top of bars
    innerChart
        .selectAll(".bar-label")
        .data(data)
        .join("text")
        .attr("class", "bar-label")
        .text(d => `${Math.round(d.Energy_Consumption)} kWh`)
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.Energy_Consumption) - 10)
        .attr("text-anchor", "middle");
};
