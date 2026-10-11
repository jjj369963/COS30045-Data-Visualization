# Exercise 4.2 – Manipulate and Add Elements to a Webpage with D3

## Aim
Become familiar with using D3.js (Data-Driven Documents) to change element appearances, manipulate styles, and dynamically append DOM and SVG elements to a webpage.

## Purpose
In this exercise, a dedicated JavaScript file (`assets/js/d3_main.js`) is created to house D3 code for the Appliance Energy Consumption website. This lab introduces fundamental D3 selection methods (`d3.select()`, `d3.selectAll()`), styling operations (`.style()`), attribute assignments (`.attr()`), and dynamic element generation (`.append()`, `.text()`) directly modifying the Document Object Model (DOM).

## Preparation
- Reviewed **Chapter 2 of Dufour and Meeks (2024)** (*D3.js in Action*) to understand D3 selections and DOM manipulation.
- Built upon the website structure established in Exercise 0.2 and SVG principles from Exercise 4.1.

## Folder Structure
```text
Exercise 4.2/
├── assets/
│   ├── css/
│   │   └── style.css          # Core stylesheet
│   ├── img/
│   │   └── PowerIcon.jpg      # Header brand logo
│   └── js/
│       ├── d3_main.js         # Dedicated D3 DOM & SVG manipulation script
│       └── main.js            # Standard JavaScript logic
├── d3demo.html                # Main demonstration webpage
└── README.md
```

## Implementation Steps

### 1. Step 1: Add a Dedicated JS File for D3
- Created `assets/js/d3_main.js` specifically for D3 code to maintain clean separation from general site scripting (`main.js`).
- Loaded the D3.js library (v7) via CDN in `d3demo.html`:
  ```html
  <script src="https://d3js.org/d3.v7.min.js"></script>
  ```
- Loaded `assets/js/d3_main.js` immediately after the D3 library script tag before the closing `</body>` tag:
  ```html
  <script src="assets/js/d3_main.js"></script>
  ```

### 2. Step 2: Apply Styles to HTML Elements Using D3
- Used `d3.select("h1")` to query and select the page's top-level header element.
- Changed its color dynamically using method chaining:
  ```javascript
  d3.select("h1")
      .style("color", "green");
  ```
- Experimented with multi-element selection using `d3.selectAll("h2")` to set section titles to a coordinating forest green shade (`#2e7d32`):
  ```javascript
  d3.selectAll("h2")
      .style("color", "#2e7d32");
  ```

### 3. Step 3: Append an HTML Element Using D3
- Added a target `<div>` container with class `container` in `d3demo.html`:
  ```html
  <div class="container">
      <p>General recommendations for households:</p>
  </div>
  ```
- Used D3 to dynamically append a new paragraph (`<p>`) with contextual energy-saving text:
  ```javascript
  d3.select(".container")
      .append("p")
      .text("Purchasing a low energy consumption TV will help with your energy bills!");
  ```
- Verified that D3 successfully inserted the `<p>` element at the end of the selected `.container` in the live DOM.

### 4. Step 4: Append and Style an SVG Graphic Using D3
- Added an empty `<svg>` element with defined boundary dimensions in `d3demo.html`:
  ```html
  <svg width="300" height="120" style="border: 1px solid #e0e0e0; background-color: #fbfbfb; display: block; margin-top: 10px;"></svg>
  ```
- Appended a `<rect>` element using `d3.select("svg").append("rect")`.
- Configured essential geometry and presentation attributes to make the SVG shape visible:
  ```javascript
  d3.select("svg")
      .append("rect")
      .attr("x", 50)
      .attr("y", 50)
      .attr("width", 100)
      .attr("height", 30)
      .style("fill", "green");
  ```
- Inspected developer tools / Elements inspector to verify that the SVG rectangle was injected with correct coordinate mappings (`x=50`, `y=50`, `width=100`, `height=30`, `fill=green`).

---

## Key D3 Methods Covered

| Method | Description | Usage Example |
|---|---|---|
| `d3.select(selector)` | Selects the first matching element in the DOM | `d3.select("h1")` |
| `d3.selectAll(selector)` | Selects all matching elements matching the selector | `d3.selectAll("h2")` |
| `.style(property, value)` | Sets an inline CSS style on selected elements | `.style("color", "green")` |
| `.attr(name, value)` | Sets an XML/HTML attribute (e.g., coordinates, dimensions) | `.attr("width", 100)` |
| `.append(type)` | Appends a new child element of the given tag name | `.append("rect")` |
| `.text(value)` | Sets the text content of the selected element | `.text("Message...")` |

---

## Generative AI Reflection

- **Tool(s) used:** ChatGPT
- **Purpose:** Referenced D3.js method syntax (`d3.select`, `.style()`, `.attr()`, `.append()`) and verified parameter conventions for SVG rectangles.
- **Adaptation:** Adapted raw code snippets into structured modular steps matching the Appliance Energy Consumption site layout and styling system.
