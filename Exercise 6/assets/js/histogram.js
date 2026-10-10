// histogram.js - Histogram drawing functions for Exercise 6.1 (static) & Exercise 6.2 (interactive)

// Exercise 6.1: Static Histogram
const drawStaticHistogram = (data) => {
    const container = d3.select("#histogram_static");
    if (container.empty()) return;

    // Set the dimensions and margins
    const svg = container
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Generate bins for original dataset
    const bins = binGenerator(data);

    // Calculate domain bounds
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);

    // Set scale domains
    const staticXScale = d3.scaleLinear()
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    const staticYScale = d3.scaleLinear()
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // Draw bars
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => staticXScale(d.x0))
        .attr("y", d => staticYScale(d.length))
        .attr("width", d => staticXScale(d.x1) - staticXScale(d.x0))
        .attr("height", d => innerHeight - staticYScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    // Add x-axis
    const bottomAxis = d3.axisBottom(staticXScale);
    innerChart
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add y-axis
    const leftAxis = d3.axisLeft(staticYScale);
    innerChart
        .append("g")
        .attr("class", "y-axis")
        .call(leftAxis);

    // Labels
    svg.append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height - 5)
        .attr("class", "axis-title");

    svg.append("text")
        .text("Frequency")
        .attr("x", 5)
        .attr("y", 20)
        .attr("class", "axis-title");
};

// Exercise 6.2: Interactive Histogram (connected with filters)
const drawHistogram = (data) => {
    const container = d3.select("#histogram");
    if (container.empty()) return;

    // Set the dimensions and margins of the chart area
    const svg = container
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Get the bins for our data set using the shared bin generator
    const bins = binGenerator(data);

    // Calculate domain bounds
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);

    // Configure globally shared scales
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // Draw the bars of the histogram
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    // Construct and append x-axis
    const bottomAxis = d3.axisBottom(xScale);
    innerChart
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Construct and append y-axis
    const leftAxis = d3.axisLeft(yScale);
    innerChart
        .append("g")
        .attr("class", "y-axis")
        .call(leftAxis);

    // Add x-axis label
    svg.append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height - 5)
        .attr("class", "axis-title");

    // Add y-axis label
    svg.append("text")
        .text("Frequency")
        .attr("x", 5)
        .attr("y", 20)
        .attr("class", "axis-title");
};
