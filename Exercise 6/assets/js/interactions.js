// interactions.js - Functions for managing filters and interactivity (Exercise 6.2 & Extension)

// 1. Populate screen technology filter buttons
const populateFilters = (data) => {
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked screen tech filter:", d);

            if (!d.isActive) {
                activeScreenTech = d.id;

                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id;
                });

                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id);

                updateHistogram(data);
            }
        });
};

// 2. Extension: Populate screen size filter buttons
const populateSizeFilters = (data) => {
    d3.select("#filters_size")
        .selectAll(".filter")
        .data(filters_size)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked screen size filter:", d);

            if (!d.isActive) {
                activeScreenSize = d.id;

                filters_size.forEach(filter => {
                    filter.isActive = d.id === filter.id;
                });

                d3.selectAll("#filters_size .filter")
                    .classed("active", filter => filter.id === d.id);

                updateHistogram(data);
            }
        });
};

// 3. Update the histogram based on both active filters
const updateHistogram = (data) => {
    // Filter data matching both screenTech and screenSize
    const updatedData = data.filter(tv => {
        const matchTech = activeScreenTech === "all" || tv.screenTech === activeScreenTech;
        const matchSize = activeScreenSize === "all" || tv.screenSize === +activeScreenSize;
        return matchTech && matchSize;
    });

    // Re-bin filtered data
    const updatedBins = binGenerator(updatedData);

    // Smoothly transition histogram bars
    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
};

// Exercise 6.4: Tooltips for Scatterplot

// 1. Create and format the tooltip element appended to scatterplot's innerChartS
const createTooltip = (data) => {
    if (!innerChartS) return;

    // Append tooltip group with initial opacity 0
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Append tooltip background rectangle
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    // Append tooltip text
    tooltip
        .append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};

// 2. React to mouse events on scatterplot circles
const handleMouseEvents = () => {
    if (!innerChartS) return;

    innerChartS
        .selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            // Step 1: Update text in tooltip with screenSize
            d3.select(".tooltip text")
                .text(d.screenSize);

            // Step 2: Get cx and cy of target circle
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // Step 3: Move tooltip above circle and animate opacity to 1
            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // Step 4: Hide tooltip and move away from view
            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0, 500)`);
        });
};
