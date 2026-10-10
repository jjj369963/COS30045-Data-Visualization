# Exercise 4.6 – Scaling Charts

## Aim
Make chart adaptable to different size svgs.

## Purpose
Sometimes charts cannot take up the whole window and need to fit within a specified SVG size. If data is mapped 1:1 with pixels, bars will exceed the SVG container boundary.
Using D3 scales ensures the chart always fits into the available space:
- `d3.scaleLinear()`: For continuous numeric data (mapping count values to rectangle width).
- `d3.scaleBand()`: For discrete categorical data (calculating bar positions and thickness based on categories).

## Folder Structure
```
Exercise 4.6/
├── data/
│   └── tvBrandCount.csv
├── Website (LAB)-Exercise 4.6/
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── img/
│   │   └── js/
│   │       ├── d3_main.js
│   │       └── main.js
│   ├── d3demo.html
│   └── README.md
└── README.md
```

## Implementation Steps
1. **Preparation: Update SVG viewBox**:
   - Adjusted the SVG container's viewBox to `"0 0 500 500"`:
     ```javascript
     const svg = d3.select(".responsive-svg-container")
         .append("svg")
         .attr("viewBox", "0 0 500 500")
         .style("border", "1px solid black");
     ```

2. **Step 1: Add Linear Scale for Count Data (`xScale`)**:
   - Configured `d3.scaleLinear()`:
     - Domain: `[0, 1100]` (accommodating the maximum data value ~1050 with extra room at the end).
     - Range: `[0, 500]` (constrained to the viewBox width).
   - Updated `.attr("width", d => xScale(d.count))` to calculate bar width dynamically via the linear scale.

3. **Step 2: Add Band Scale for Categories (`yScale`)**:
   - Replaced fixed `barHeight` and `barSpacing` with `d3.scaleBand()`:
     - Domain: `data.map(d => d.brand)` (list of TV brand categories).
     - Range: `[0, 500]` (fitting within viewBox height).
     - Padding: `.padding(0.1)` (creates a gap between adjacent bars).
   - Dynamically set bar thickness: `.attr("height", yScale.bandwidth())`.
   - Dynamically set bar Y position: `.attr("y", (d, i) => yScale(d.brand))`.
