// d3_main.js - COS30045 Exercise 4.5: D3 Binding and drawing with data
// Lim Jun Xian

// Responsive SVG Container setup from Exercise 4.3
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Exercise 4.5: Bind data to rectangles and draw horizontal bar chart
const drawBarChart = data => {
    const barHeight = 20;
    const barSpacing = 5;

    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => {
            console.log(d);
            return `bar bar-${d.count}`;
        })
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + barSpacing))
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "blue");
};

// Step 1 & 2: Load CSV data with row conversion function
d3.csv("../data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // '+' operator converts string to numeric type
    };
}).then(data => {
    // Step 3: Inspect dataset properties in console
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count)); // Array with [min, max]

    // Sort dataset in descending order based on TV count
    data.sort((a, b) => b.count - a.count);
    console.log("Sorted data (descending):", data);

    // Call drawBarChart and pass the loaded and sorted data
    drawBarChart(data);
});
