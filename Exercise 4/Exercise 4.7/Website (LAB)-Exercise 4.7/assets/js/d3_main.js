// d3_main.js - COS30045 Exercise 4.7: Adding labels
// Lim Jun Xian

// Step Preparation: Responsive SVG Container with viewBox scaled to 500x500
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 500")
    .style("border", "1px solid black");

// Load CSV data with row conversion function
d3.csv("../data/tvBrandCount.csv", d => {
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

// Exercise 4.7: Draw horizontal bar chart with labels
const drawBarChart = data => {
    // Step 1: Linear scale for bar width (change range to 350 to leave room for labels & numbers)
    const xScale = d3.scaleLinear()
        .domain([0, 1100])
        .range([0, 350]);

    // Step 2: Band scale for discrete categories
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 500])
        .padding(0.1);

    // Step 2: Create a group container for our labels and bars
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // Step 3: Add back the rectangles (x = 100 to leave room for labels, y = 0)
    barAndLabel
        .append("rect")
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 100)
        .attr("y", 0);

    // Step 4: Add the category label text (brand names)
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 90)
        .attr("y", 13)
        .attr("text-anchor", "end")
        .style("font-size", "12px");

    // Step 5: Add the value number text (counts at end of bars)
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 4)
        .attr("y", 13)
        .style("font-size", "12px");
};
