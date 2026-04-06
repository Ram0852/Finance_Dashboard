# 💰 Finance Dashboard UI

A clean and interactive finance dashboard built using React.
This project focuses on presenting financial data clearly, managing state effectively, and building an intuitive user interface.

---

## 🚀 Overview

This dashboard allows users to:

* View financial summaries (balance, income, expenses)
* Explore and filter transactions
* Understand spending patterns through visualizations
* Interact with role-based UI (Admin vs Viewer)

The project is built with a focus on simplicity, clarity, and structured frontend design.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Charts:** Recharts
* **State Management:** React Context API

---

## ✨ Features

### 📊 Dashboard Overview

* Summary cards for:

  * Total Balance
  * Income
  * Expenses
* Category-based spending chart (Pie Chart)
* Monthly expense trend (Line Chart)

---

### 📋 Transactions Section

* Displays:

  * Date
  * Category
  * Amount
  * Type (Income/Expense)
* Features:

  * Filter by type (All / Income / Expense)
  * Search by category
  * Clean and readable list layout

---

### 🔐 Role-Based UI

* Role switcher (Viewer / Admin)
* Admin can:

  * Add new transactions
* Viewer:

  * Can only view data

---

### 📈 Insights

* Highest spending category
* Real-time updates based on transactions

---

### 🧠 State Management

* Centralized state using Context API:

  * Transactions data
  * Filters
  * Role management
* Derived data handled inside components for consistency

---

### 🎨 UI / UX

* Clean and minimal design
* Responsive layout
* Proper spacing and visual hierarchy
* Handles empty states gracefully

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the development server

```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── Dashboard/
│   ├── Transactions/
│   ├── RoleSwitcher.jsx
│
├── context/
│   └── AppContext.jsx
│
├── data/
│   └── transactions.js
│
├── App.jsx
├── main.jsx
```

---

## 💡 Key Design Decisions

* **Context API** was used to avoid prop drilling and maintain global state cleanly.
* **Derived values** (like totals and insights) are computed instead of stored to prevent inconsistency.
* **Component structure** is kept modular for scalability.
* **Tailwind CSS** ensures fast and consistent UI styling.

---

## 📌 Assumptions

* Data is static/mock (no backend integration)
* Role-based behavior is simulated on the frontend
* Transactions are stored in memory (no persistence)

---

## 🚀 Future Improvements

* Dark mode support
* Local storage / backend integration
* Advanced filtering and sorting
* Export functionality (CSV/JSON)

---

## 📷 Demo

*(Add screenshots or deployment link here if available)*

---

## 🧾 Conclusion

This project demonstrates a structured approach to building a frontend application with React, focusing on state management, UI clarity, and user interaction.

---
