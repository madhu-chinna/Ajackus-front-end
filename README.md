# Employee Directory App

A responsive and interactive Employee Directory Web Interface built with HTML, CSS, JavaScript, and Freemarker templates. This project demonstrates modern front-end development principles, clean modular code, and user-friendly UI.

## Features
- Dashboard page with employee cards (ID, name, email, department, role)
- Add/Edit employee modal form with validation
- Filter, sort, and search employees (by name, email, department, role)
- Pagination (10, 25, 50, 100 per page)
- Responsive design for desktop, tablet, and mobile
- All data handled in-memory (no backend)
- Clean, modular code with comments
- Freemarker for dynamic rendering

## Project Structure
```
Ajackus/
├── templates/
│   └── dashboard.ftl         # Main Freemarker template
├── css/
│   └── styles.css            # Main CSS file
├── js/
│   └── app.js                # Main JavaScript file
├── assets/                   # (Optional) for images or fonts
└── README.md                 # Project documentation
```

## Setup & Run Instructions
1. Clone or download this repository.
2. Open the project in your IDE or a local server that supports Freemarker templates.
3. Ensure the directory structure is preserved.
4. Open `templates/dashboard.ftl` in your Freemarker-compatible environment, or convert it to `.html` for static testing.
5. All features work in the browser with no backend required.

## Screenshots
(See reference images in the repo or provided by the assignment.)

## Reflection
**Challenges faced:**
- Ensuring the UI matches the provided reference images pixel-perfectly.
- Managing all data and UI state in-memory without backend support.
- Handling responsive design for all device sizes.

**Improvements for the future:**
- Add persistent storage (localStorage or backend API).
- Add user authentication and role-based access.
- Enhance accessibility and add more animations.

---
© 2025 Employee Directory App. All rights reserved. 