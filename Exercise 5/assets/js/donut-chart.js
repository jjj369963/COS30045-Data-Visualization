// donut-chart.js - COS30045 Exercise 5.3: Donut Chart
// Author: Lim Jun Xian

// Step 1: Load and parse dataset
d3.csv("data/Data_exercise 5.3.csv", d => {
    return {
        // Keep screen size category name
        Screensize_Category: d.Screensize_Category,
        // Convert count string to numeric integer
        Count: +d.Count
    };
}).then(data => {
    // Log parsed data to console for inspection
    console.log("Loaded TV Screensize Data:", data);

    // Step 2: Draw donut chart with loaded data
    drawDonutChart(data);
}).catch(error => {
    console.error("Failed to load CSV data for donut chart:", error);
});

// Function to draw donut chart using pie and arc generators
const drawDonutChart = data => {
    // Set up chart dimensions
    const width = 1000;
    const height = 500;
    // Calculate radius based on the shortest side with padding
    const radius = Math.min(width, height) / 2 - 20;

    // Create responsive SVG container
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);

    // Create innerChart group and center origin in the middle of SVG container
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create ordinal color scale using D3 category color scheme
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category))
        .range(d3.schemeSet2);

    // Initialize pie layout generator to calculate slice angles
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null); // Disable sorting to maintain original data order

    // Initialize arc generator with inner and outer radius
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)  // Inner radius = 60% of available radius
        .outerRadius(radius * 1)    // Outer radius = 100% of available radius
        .padAngle(0.02)             // Small padding between slices
        .cornerRadius(4);           // Rounded corners on slices

    // Bind data and draw donut slices as SVG paths
    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.Screensize_Category))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    // Add labels in the middle of each slice using centroid coordinates
    innerChart
        .selectAll("text")
        .data(pie(data))
        .join("text")
        .text(d => d.data.Screensize_Category)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "#2b2b2b");
};
