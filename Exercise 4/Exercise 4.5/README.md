# Exercise 4.5 – D3 Binding and Drawing with Data

## Aim
Use the data in the dataset to draw SVGs for visualisation.

## Purpose
Bind the imported and sorted dataset to a set of SVG rectangles (`<rect>`) which become the bars in our horizontal bar chart.

## Folder Structure
```text
Exercise 4.5/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── data/
│   │   └── tvBrandCount.csv
│   ├── img/
│   │   └── PowerIcon.jpg
│   └── js/
│       ├── d3_main.js
│       └── main.js
├── d3demo.html
└── README.md
```

## Implementation Steps
1. **Step 1: Bind Data to DOM Elements**:
   - Defined the `drawBarChart(data)` function.
   - Selected SVG elements and joined rectangles using `svg.selectAll("rect").data(data).join("rect")`.
   - Assigned dynamic class names with `.attr("class", d => `bar bar-${d.count}`)` to associate each rectangle with its count value.

2. **Step 2: Add Width, Height, and Fill**:
   - Defined a constant for bar height: `const barHeight = 20;`.
   - Configured `.attr("width", d => d.count)` so rectangle lengths correspond to the count of TVs.
   - Configured `.attr("height", barHeight)`.
   - Added `.attr("fill", "blue")` to make bars visually distinguishable.

3. **Step 3: Space Out the Bars (Positioning)**:
   - Defined a constant for vertical spacing: `const barSpacing = 5;`.
   - Anchored horizontal origin using `.attr("x", 0)`.
   - Positioned bars along the Y-axis using the formula `.attr("y", (d, i) => i * (barHeight + barSpacing))`.
