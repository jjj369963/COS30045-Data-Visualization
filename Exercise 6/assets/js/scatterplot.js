// scatterplot.js - Exercise 6.3: Scatterplot with colour coding and legend

const drawScatterplot = (data) => {
    // 1. Set the dimensions and margins of the chart area
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`); // Responsive SVG

    // 2. Create an inner chart group with margins
    // Note: innerChartS is declared in shared-constants.js
    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 3. Set up x and y scales
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth])
        .nice();

    yScaleS
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    // 4. Set up colour scale using categorical hues
    colorScale
        .domain(data.map(d => d.screenTech)) // Unique screenTech categories: LED, LCD, OLED
        .range(d3.schemeCategory10); // Standard categorical colour palette

    // 5. Draw the circles
    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 3.5)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5); // Semi-transparent to reveal dense overlapping

    // 6. Add bottom and left axis
    const bottomAxis = d3.axisBottom(xScaleS);
    innerChartS
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    const leftAxis = d3.axisLeft(yScaleS);
    innerChartS
        .append("g")
        .attr("class", "y-axis")
        .call(leftAxis);

    // X-axis label
    svg.append("text")
        .text("Star Rating")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height - 5)
        .attr("class", "axis-title");

    // Y-axis label
    svg.append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("x", 10)
        .attr("y", 22)
        .attr("class", "axis-title");

    // 7. Add legend for colour scale in the top right corner
    const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 100}, ${margin.top})`);

    // Loop through colour scale domain to create legend rows
    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`); // Space rows vertically

        // Colored rectangle
        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        // Label text next to rectangle
        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .style("font-family", "Arial, sans-serif")
            .style("font-size", "11px")
            .style("fill", "#333")
            .text(screenTech);
    });
};
