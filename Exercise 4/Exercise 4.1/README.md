# Exercise 4.1 – Drawing Shapes with SVG

## Aim
Understand Scalable Vector Graphics (SVG) coordinate systems and visual elements by constructing and modifying a vector graphic of a house.

## Implementation Details

### 1. Fundamental SVG Elements
- **House Base**: `<rect>` defining the main structure of the building.
- **Roof**: `<polygon>` with coordinate vertices forming a triangular roof.
- **Windows**: `<rect>` elements positioned symmetrically.
- **Door & Doorknob**: `<rect>` for the entrance door and `<circle>` for the door handle.
- **Garden Pathway**: `<path>` using quadratic Bézier curves (`Q` command) to create smooth curved lines extending to the garden foreground.
- **Text Label**: `<text>` element labeling the structure.

### 2. Modification & Exploration
- Adjusted coordinates and color styling to explore SVG attributes (`fill`, `stroke`, `stroke-width`).
- Provided an interactive side-by-side comparison page (`svg-house.html`) showcasing both the baseline SVG house and modified variations alongside detailed property changes.
