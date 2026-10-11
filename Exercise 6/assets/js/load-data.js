// Data loading and initialization script for Exercise 6

// Load the CSV file with a row conversion function
d3.csv("assets/data/Ex6_TVdata_withStar.csv", d => {
    return {
        brand: d.brand,
        model: d.model,
        screenSize: +d.screenSize, // Convert screenSize to a number
        screenTech: d.screenTech,
        energyConsumption: +d.energyConsumption, // Convert energyConsumption to a number
        star: +d.star // Convert to number
    };
}).then(data => {
    // Log the processed data to the console
    console.log("Processed Data:", data);

    // 1. Exercise 6.1: Render static histogram (non-interactive baseline)
    drawStaticHistogram(data);

    // 2. Exercise 6.2: Render interactive histogram and cross-filters
    drawHistogram(data);
    populateFilters(data);
    populateSizeFilters(data);

    // 3. Exercise 6.3: Render scatterplot
    drawScatterplot(data);

    // Call tooltip functions (Exercise 6.4)
    createTooltip();
    handleMouseEvents();
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});
