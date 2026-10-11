// line-chart.js - COS30045 Exercise 5.2: Scatter Plot and Line Chart
// Author: Lim Jun Xian

// Step 1: Load and parse dataset
d3.csv("assets/data/ARE_Spot_Prices.csv", d => {
    return {
        // Convert year to integer
        year: +d.Year,
        // Convert average price to float
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
    // Log data to console
    console.log("Loaded Electricity Price Data:", data);

    // Step 2: Draw chart with loaded data
    drawLineChart(data);
}).catch(error => {
    console.error("Failed to load CSV data for line chart:", error);
});

// Function to draw line chart with overlaid scatter plot points
const drawLineChart = data => {
    // Margin convention and dimensions
    const margin = { top: 40, right: 170, bottom: 40, left: 65 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Append responsive SVG container
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);

    // Create inner chart group
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const maxPrice = d3.max(data, d => d.averagePrice);
    const yScale = d3.scaleLinear()
        .domain([0, maxPrice * 1.08])
        .range([innerHeight, 0])
        .nice();

    // Axis generators
    // Use format "d" to display whole integer years
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"))
        .tickPadding(10);

    const leftAxis = d3.axisLeft(yScale);

    // Append X axis
    innerChart
        .append("g")
        .attr("class", "axis-x")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Append Y axis
    innerChart
        .append("g")
        .attr("class", "axis-y")
        .call(leftAxis);

    // Y axis label
    innerChart
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .text("Average Price ($ per MWh)");

    // Line generator
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    // Draw line
    innerChart
        .append("path")
        .attr("class", "line-path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2);

    // Draw scatter points
    innerChart
        .selectAll(".scatter-dot")
        .data(data)
        .join("circle")
        .attr("class", "scatter-dot")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("r", 4)
        .attr("fill", "green");

    // Direct label at the end of the line
    const lastItem = data[data.length - 1];
    if (lastItem) {
        innerChart
            .append("text")
            .attr("class", "line-end-label")
            .attr("x", xScale(lastItem.year) + 10)
            .attr("y", yScale(lastItem.averagePrice))
            .attr("dominant-baseline", "middle")
            .text(`2024: $${lastItem.averagePrice}`);
    }
};
