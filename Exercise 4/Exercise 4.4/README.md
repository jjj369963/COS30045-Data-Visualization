# Exercise 4.4 – Load Data from CSV

## Aim
Learn how to load and format tabular data from a CSV file using D3.js, convert string attributes into proper numerical data types, inspect dataset statistics, and prepare the data for charting.

## Preparation
1. **KNIME Data Preparation**:
   - Opened and executed the KNIME workflow `2026 TV Data.knwf` which processes raw TV data (`tv_2026_02_15.csv`).
   - The workflow filters columns, standardizes brand text, groups data by `brand` using a **GroupBy** node, and counts occurrences.
   - Appended a **CSV Writer** node configured to:
     - Output location: `Relative to` -> `Current workflow data area`
     - File name: `tvBrandCount.csv`
     - Advanced settings: `Quote values: Never` (to prevent strings/numbers from being enclosed in quotes).
2. **Repository Data Folder**:
   - Created the `data` folder at `assets/data/`.
   - Saved `tvBrandCount.csv` inside `assets/data/`.

## Implementation Steps
1. **Load Data with Row Conversion**:
   - Used `d3.csv("assets/data/tvBrandCount.csv", d => { ... })` to load the dataset.
   - Converted the `count` field from string to number using the unary plus operator (`+d.count`).
2. **Inspect Dataset Properties (Console)**:
   - `console.log(data)` – Full array of JavaScript objects.
   - `console.log(data.length)` – Total number of brands (25 brands in 2026 dataset).
   - `console.log(d3.max(data, d => d.count))` – Maximum count (`1096`, Samsung).
   - `console.log(d3.min(data, d => d.count))` – Minimum count (`24`, Walton/Skyworth).
   - `console.log(d3.extent(data, d => d.count))` – Value range `[24, 1096]`.
3. **Sort Dataset**:
   - Sorted the array in descending order using `data.sort((a, b) => b.count - a.count)`.
4. **Pass to Chart Function**:
   - Defined and called `drawBarChart(data)` inside the `.then()` promise chain to prepare for Exercise 4.5.
