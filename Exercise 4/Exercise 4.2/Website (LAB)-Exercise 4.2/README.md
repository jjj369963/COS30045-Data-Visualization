# Appliance Energy Consumption Website

A multi-page website built for COS30045 – Data Visualization (Swinburne University of Technology).

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Overview, energy calculator, FAQ accordion |
| Televisions | `televisions.html` | TV model comparison table and energy tips |
| About Us | `about.html` | Project info, technologies, GenAI reflection |

## Folder Structure

```
/
├── index.html
├── televisions.html
├── about.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── PowerIcon.jpg
└── README.md
```

## Features

- Responsive navigation with logo, hover effects, and active page indicator
- FAQ accordion (JavaScript – hidden by default, toggle on click)
- Interactive Appliance Energy Calculator:
  - Preset appliance dropdown (auto-fills wattage)
  - Computes daily / monthly / yearly kWh and AUD cost
  - Client-side input validation with user-friendly error messages
  - Results update dynamically without page reload
- External CSS only (no inline styles)
- Footer with current year, author name, and GenAI acknowledgement

## Live URL (Mercury Server)

```
http://mercury.swin.edu.au/cos30045/s106730497/
```

---

## Generative AI Reflection

**Tool(s) used:** ChatGPT

**What I used it for:**
I used ChatGPT a few times when I was unsure about syntax — mainly for the JavaScript parts like how to loop through elements with `querySelectorAll` and how `.classList.add` / `.remove` works. I also asked it to explain what `e.preventDefault()` does so I understood it before using it in the form handler.

**What I changed or adapted:**
The JavaScript suggestions it gave me weren't quite right for what I needed. For example the accordion it described would open multiple answers at the same time, so I changed the logic to close all items first before opening the one I clicked. I also added the part that checks whether it was already open so clicking again closes it. The colour values and layout I did myself by looking at the logo and adjusting the CSS manually.

**What I learned:**
It helped me understand some concepts faster than just reading documentation. But the code it produced usually needed changes to fit exactly what the task asked for, so I still had to understand what each part was doing.

**Limitations:**
Sometimes the explanations were a bit generic and didn't account for the specific structure of my HTML, so I had to adapt them. It also sometimes suggested using libraries which I couldn't use for this task.

