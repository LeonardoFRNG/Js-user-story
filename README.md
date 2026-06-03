# TaskFlowSPA

Single Page Application (SPA) project focused on understanding frontend architecture, improving code organization, and consuming APIs in a clean and scalable way.

---

## Project Structure

The project is divided into two main parts:

* **/TaskFlowSPA**: Contains the user interface built with Vite and Tailwind CSS.
* **/TaskFlowBack**: Simulates a backend using JSON Server.

```
.
├── TaskFlowBack
│   ├── database.json
│
├── TaskFlowSPA
│   ├── index.html
│   ├── public
│   │   └── favicon.ico
│   ├── src
│   │   ├── components      # Reusable UI components
│   │   ├── main.js         # App entry point
│   │   ├── router          # SPA navigation system
│   │   ├── services        # API communication layer
│   │   ├── styles          # Global styles (Tailwind)
│   │   ├── utils           # Helper functions
│   │   └── views           # Application views
│   └── vite.config.ts
│
├── LICENSE
└── README.md
```

---

## Technologies Used

### Frontend

* HTML5
* JavaScript (ES6+)
* Tailwind CSS

### Build Tool

* Vite

### Backend (Simulated)

* JSON Server

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/LeonardoFRNG/Js-user-story.git
cd TaskFlowSPA
```

### 2. Install and run the client or the TaskFlowSPA

```bash
cd TaskFlowSPA
npm install
npm run dev
```

### 3. Setup and run the TaskFlowBack

```bash
cd ../TaskFlowBack
npm install
npx json-server database.json
```

---

## Features

* SPA navigation without page reloads
* Modular architecture (MVC-inspired structure)
* API consumption using fetch
* CRUD operations for tasks
* Clean separation of concerns (views, services, etc...)

---

## Learning Goals

* Understand how a SPA works internally
* Improve project structure and scalability
* Practice API consumption and asynchronous JavaScript
* Apply clean code principles in frontend development

---

## Author

* GitHub: LeonardoFRNG: https://github.com/LeonardoFRNG
* Email: leonardojim321@gmail.com

---

## License

This project is intended for educational and personal use.
