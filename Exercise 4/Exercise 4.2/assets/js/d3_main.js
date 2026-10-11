// d3_main.js - COS30045 Exercise 4.2
// Lim Jun Xian
// D3 manipulation and element creation

// Step 2: Apply a style to html element using D3
d3.select("h1")
    .style("color", "green");

// Experiment with selecting other elements and changing their appearance
d3.selectAll("h2")
    .style("color", "#2e7d32");

// Step 3: Append an element using D3
// Select the container div specifically so the text appends to the target block
d3.select(".container")
    .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Step 4: Append a svg rectangle using D3 and make it visible with attributes
d3.select("svg")
    .append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", 100)
    .attr("height", 30)
    .style("fill", "green");
