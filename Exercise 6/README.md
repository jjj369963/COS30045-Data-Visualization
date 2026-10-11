# Exercise 6 – Interactive Visualisations

## Overview
In this exercise, interactive data visualisations are built using **D3.js (v7)** based on the Jan 2026 Australian TV energy rating dataset (`Ex6_TVdata_withStar.csv`). This project explores fundamental web-based data interaction patterns including categorical filtering, animated transitions, multi-dimensional cross-filtering, and hover tooltips.

---

## Folder Structure
```text
Exercise 6/
├── index.html                 # Main webpage containing all exercise visualisations
├── assets/
│   ├── css/
│   │   ├── base.css           # Global typography, layout & Appliance Energy theme
│   │   ├── style.css          # Core site styling
│   │   └── visualisation.css  # SVG containers, axes & custom interactive filter buttons
│   ├── data/
│   │   └── Ex6_TVdata_withStar.csv # Australian TV energy rating dataset (4,233 records)
│   ├── img/
│   │   └── PowerIcon.jpg      # Brand logo
│   └── js/
│       ├── shared-constants.js # Dimensions, scales, binGenerator & filter state trackers
│       ├── histogram.js       # Static (6.1) and interactive (6.2) histogram rendering
│       ├── scatterplot.js     # Scatterplot (6.3) with categorical colour coding & legend
│       ├── interactions.js    # Filter handlers, transitions & tooltip event listeners (6.4)
│       └── load-data.js       # Data loading, parsing & initialization pipeline
└── README.md
```

---

## Exercises & Implementation Summary

### Exercise 6.1 – Histogram (Static Baseline)
- **Objective**: Construct a baseline histogram visualising the frequency distribution of TV energy consumption (`energyConsumption`).
- **Implementation**:
  - Configured `d3.bin().value(d => d.energyConsumption)` with continuous linear scales (`xScale`, `yScale`).
  - Rendered 14 bins with rectangular bars (`fill: #606464`, white stroke separation for visual clarity).
  - Constructed bottom X-axis (`Labeled Energy Consumption (kWh/year)`) and left Y-axis (`Frequency`).
  - Serves as the static benchmark prior to implementing interactive features.

### Exercise 6.2 – Interactive Histogram: Filters (& Extension)
- **Objective**: Add interactive filtering buttons with smooth animated transitions to allow users to explore subsets of the data.
- **Implementation**:
  - **Screen Technology Filter**: Added buttons (`All`, `LED`, `LCD`, `OLED`) that filter data dynamically and update button active classes using D3's `.classed("active", ...)`.
  - **Animated Transitions**: Applied `.transition().duration(500).ease(d3.easeCubicInOut)` to smoothly resize and animate bar heights upon user selection.
  - **Extension (Screen Size Filter)**: Added a secondary filter group below the chart (`All Sizes`, `24"`, `32"`, `55"`, `65"`, `98"`) supporting cross-category filtering (e.g. inspecting 55" OLED models).
  - **Reflection on Axis Rescaling (Pros & Cons)**:
    - *Pros*: Dynamically rescaling the Y-axis (`rescale`) allows smaller subsets (e.g. niche 98" or OLED screens with fewer entries) to fully occupy the chart height, highlighting their internal distribution shape.
    - *Cons*: Rescaling introduces "baseline drift", making users lose the sense of absolute market volume and risking cognitive misinterpretation of category scale.
    - *Decision*: A stable global baseline was maintained in accordance with the lecture specification to preserve comparative integrity across categories.

### Exercise 6.3 – Scatterplot: Colour Coding & Legend
- **Objective**: Plot TV Star Ratings against Energy Consumption with categorical colour coding.
- **Implementation**:
  - Plotted `Star Rating` (X-axis, 0–8) vs `Labeled Energy Consumption` (Y-axis, 0–2600 kWh/year).
  - Mapped `screenTech` categories (`LED`, `LCD`, `OLED`) to distinct categorical hues using `d3.schemeCategory10`.
  - Applied `.attr("opacity", 0.5)` with no circle stroke to effectively reveal dense overlapping clusters among 4,233 records.
  - Constructed an SVG legend in the top-right corner with coloured swatches and labels.

### Exercise 6.4 – Interactive Tooltips
- **Objective**: Provide contextual details on demand when users hover over scatterplot data points.
- **Implementation**:
  - Initialised a `<g class="tooltip">` element with a rounded, semi-transparent background rectangle (`rx: 3, ry: 3, opacity: 0.75`) and bold centered white text.
  - Bound `mouseenter` and `mouseleave` event listeners to all scatterplot circles using `.on()`.
  - On hover, dynamically retrieved `cx` and `cy` coordinates via `e.target.getAttribute` to translate the tooltip directly above the hovered point, updating text with the TV's `screenSize` accompanied by a 200ms smooth fade-in.
  - On mouse leave, smoothly faded out and translated the tooltip away from the view.

---

## Design System & Accessibility
- Styled in accordance with the established **Appliance Energy Consumption** design system (`--primary: #6b4f10`, `--accent: #d08a15`, `--border: #e0e0e0`).
- Interactive filter buttons incorporate tactile press feedback (`:active { transform: translateY(1px); }`) and meet WCAG AA contrast standards.
- Fully responsive layout through SVG `viewBox` scaling.
