// Shared constants for Exercise 6

// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800; // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Set up inner chart variable for scatterplot (Exercise 6.3)
let innerChartS;

// Set up tooltip dimensions (for Exercise 6.4)
const tooltipWidth = 65;
const tooltipHeight = 32;

// Set up colors accessible globally
const barColor = "#606464";
const bodyBackgroundColor = "#ffffff";

// Set up the histogram scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Set up the scatterplot scales and color scale (Exercise 6.3)
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Create a bin generator using d3.bin
const binGenerator = d3.bin()
    .value(d => d.energyConsumption); // Accessor for energyConsumption

// Array of filter options for screen types
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Array of filter options for screen sizes (Extension)
const filters_size = [
    { id: "all", label: "All Sizes", isActive: true },
    { id: "24", label: "24\"", size: 24, isActive: false },
    { id: "32", label: "32\"", size: 32, isActive: false },
    { id: "55", label: "55\"", size: 55, isActive: false },
    { id: "65", label: "65\"", size: 65, isActive: false },
    { id: "98", label: "98\"", size: 98, isActive: false }
];

// Current filter state trackers
let activeScreenTech = "all";
let activeScreenSize = "all";
