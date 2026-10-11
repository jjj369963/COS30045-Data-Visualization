// d3_main.js - COS30045 Exercise 4.6: Scaling charts
// Lim Jun Xian

// Step Preparation: Responsive SVG Container with viewBox scaled to 500x500
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 500")
    .style("border", "1px solid black");

// Load CSV data with row conversion function
d3.csv("assets/data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // '+' operator converts string to numeric type
    };
}).then(data => {
    // Step: Inspect dataset properties in console
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));

    // Sort dataset in descending order based on TV count
    data.sort((a, b) => b.count - a.count);

    // Call drawBarChart and pass the loaded and sorted data
    drawBarChart(data);
});

// Exercise 4.6: Draw horizontal bar chart using linear & band scales
const drawBarChart = data => {
    // Step 1: Linear scale for continuous numerical data (x-axis / bar width)
    const xScale = d3.scaleLinear()
        .domain([0, 1100])
        .range([0, 500]);

    // Step 2: Band scale for discrete categorical data (y-axis / bar thickness and spacing)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 500])
        .padding(0.1);

    // Bind data to rectangles and apply scales
    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 0)
        .attr("y", (d, i) => yScale(d.brand));
};
