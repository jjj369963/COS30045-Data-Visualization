# Exercise 4.3 – D3 Set Up

## Aim
Use D3 to generate a responsive SVG canvas and a test rectangle as the initial setup for creating charts from a CSV dataset.

## Implementation Steps
1. **Clean up Exercise 4.2 code**:
   - Removed previous D3 practice code and temporary elements, keeping the D3 library reference and JS script tag.
2. **Add responsive SVG container**:
   - Added `.responsive-svg-container` CSS class to `assets/css/style.css` (`margin: auto`, `width: 100%`, `max-width: 1200px`).
   - Added container `<div class="responsive-svg-container"></div>` to `d3demo.html`.
3. **Create SVG object using D3**:
   - Selected `.responsive-svg-container` using `d3.select()`.
   - Appended an `<svg>` element with `viewBox="0 0 1200 1600"` and a `1px solid black` border for visual boundary reference.
4. **Add test SVG rectangle**:
   - Appended a blue `<rect>` with attributes `x=10`, `y=10`, `width=414`, `height=16`.
