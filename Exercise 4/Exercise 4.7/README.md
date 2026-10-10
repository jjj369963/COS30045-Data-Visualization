# Exercise 4.7 – Adding Labels

## Aim
Add labels to chart.

## Purpose
A chart without labels is not very useful. In this exercise, labels (brand categories and count numbers) are added to the bar chart created in Exercise 4.6:
- **Category labels (`brand`)**: Displayed to the left of each bar, right-justified.
- **Value labels (`count`)**: Displayed to the right of each bar, indicating the exact count.
- **SVG Group (`<g>`)**: Used as a container to keep each rectangle and its associated labels grouped together, allowing them to transform and move together.

## Folder Structure
```
Exercise 4.7/
├── data/
│   └── tvBrandCount.csv
├── Website (LAB)-Exercise 4.7/
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

1. **Step 1: Make room for labels**
   - Shift the starting position of the bar rectangles to `x = 100`, creating at least 100px of margin on the left side of the chart to fit brand name labels.
   - Set `xScale.range([0, 350])`: Adjusting the range from 500 to 350 reserves 100px on the left for brand labels and ~50px on the right for count numbers. This ensures the longest bar (Samsung: 1096) and its value label do not overflow past the 500px SVG boundary.

2. **Step 2: Create a group container for our labels**
   - Bind data to SVG group elements (`<g>`) using `.selectAll("g").data(data).join("g")`.
   - Apply a vertical transform translate: `.attr("transform", d => `translate(0, ${yScale(d.brand)})`)`.
   - All elements appended to this group move together relative to `yScale`.

3. **Step 3: Add back the rectangles**
   - Append `<rect>` to `barAndLabel`.
   - Set `.attr("x", 100)` to shift the bar rightward by 100px.
   - Set `.attr("y", 0)` because the vertical position is already specified by the group translation.

4. **Step 4: Add the column category text**
   - Append `<text>` to `barAndLabel` displaying `d.brand`.
   - Position at `.attr("x", 90)` with `.attr("text-anchor", "end")` for right alignment.
   - Align vertically at `.attr("y", 13)` with `.style("font-size", "12px")`.

5. **Step 5: Add the value number**
   - Append a second `<text>` to `barAndLabel` displaying `d.count`.
   - Position at `.attr("x", d => 100 + xScale(d.count) + 4)`.
   - Align vertically at `.attr("y", 13)` with `.style("font-size", "12px")`.
