# 📊 Personal Finance Visualizer

A modern, full-stack **Personal Finance Web App** built with **Next.js (App Router)**, **shadcn/ui**, **MongoDB**, and **Recharts**. It allows users to manage transactions, set monthly budgets, and track spending with clean UI and dark mode support.

---

## 🌐 Live Demo

👉 [(https://personal-finance-visualizer-seven-alpha.vercel.app/)/]((https://personal-finance-visualizer-seven-alpha.vercel.app/))

---

## ✨ Features

✅ **Transaction Management**  
✅ **Budgeting System**  
✅ **Monthly Spending Charts**  
✅ **Category-wise Pie Chart**  
✅ **Budget vs Actual Insights**  
✅ **Dark Mode Toggle**  
✅ **Responsive Design (Mobile Ready)**  
✅ **Modern shadcn/ui Components**

---

## 🛠️ Tech Stack

| Tech           | Description                          |
|----------------|--------------------------------------|
| **Next.js 15** | Fullstack React Framework (App Router) |
| **TypeScript** | Static Typing                        |
| **MongoDB**    | NoSQL Database                       |
| **Mongoose**   | MongoDB ODM                          |
| **shadcn/ui**  | Beautiful UI components              |
| **TailwindCSS**| Utility-first CSS framework          |
| **Recharts**   | Data Visualization                   |
| **Vercel**     | Hosting/Deployment                   |

---

## 📁 Folder Structure

├── app/
│ ├── page.tsx
│ ├── components/
│ └── api/
│ └── transactions/
│ └── [id]/route.ts
├── lib/
│ └── dbConnect.ts
├── models/
│ └── Transaction.ts
├── public/
│ └── favicon.ico
├── styles/
│ └── globals.css
├── .env.local
├── next.config.js
└── README.md


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PriyanshuChaudhary007/Personal-Finance-Visualizer.git
cd Personal-Finance-Visualizer

2. Install Dependencies
npm install

3. Configure Environment Variables
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net

4. Run the App
npm run dev

Development Notes
Built using Next.js App Router

Uses dynamic API routes for transactions and budgeting

MongoDB integrated via Mongoose

Recharts used for insights

Styled with shadcn/ui + TailwindCSS

🧭 Deployment
Hosted on Vercel

Set MONGODB_URI in Vercel's project environment variables

Auto-deployment on push to main

 Acknowledgements
Next.js

shadcn/ui

MongoDB Atlas

Recharts

Vercel

🧑‍💻 Author
Priyanshu Chaudhary
💼 GitHub
📫 priyanshurana814@gmail.com

📜 License
This project is licensed under the MIT License.

---

✅ Just save this as `README.md` in your project root, commit it, and push to GitHub:


git add README.md
git commit -m "Added professional README"
git push origin main
