# 🏥 Hospital Management System

A simple Admin-only Hospital Management System built using the MEAN stack (MongoDB, Express.js, Angular,
Node.js). This system allows an administrator to manage hospital data such as doctors, patients, and appointments from
a single dashboard.

## 🧠 Features

### ✅ Admin Panel
- Add/view Doctors
- Add/view Patients
- Add/view Appointments
- Dashboard with charts and summary statistics


# 🚫 Note: There is no login or registration the system is meant to be accessed by an admin directly without authentication.


### ✅ Dashboard & Visualization
- Charts powered by ApexCharts
 - Appointments over a week
 - Patient growth over last 7 days
 - Doctor specialization 
 - Summary:
 - Total doctors
 - Total patients
 - Total appointments


### ✅ Responsive Design
- Fully responsive UI using Angular Material
- Clean and modern dashboard layout

---

## 🛠️ Tech Stack

| Layer        | Tech                                |
|--------------|-------------------------------------|
| Frontend     | Angular, Angular Material           |
| Backend      | Node.js, Express.js                 |
| Database     | MongoDB + Mongoose                  |
| Charts       | ApexCharts                          |

---

## 📂 Folder Structure

```
hospital-management/
├── backend/                 # Node.js + Express + MongoDB (Mongoose)
│   ├── routes/
│   ├── controllers/
│   ├── db/
│   └── index.js
├── frontend/                # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── interface/
|   |   |   ├── modules/
|   |   |   ├── services/
│   │   │   └── app.module.ts
│   └── angular.json
├── README.md

```

---

## 📦 Getting Started

### 🔧 Prerequisites
- Node.js
- Angular CLI
- MongoDB Atlas (or local MongoDB)

---

### ▶️ Run Backend

```bash
cd backend
npm install
node index.js
```

### ▶️ Run Frontend

```bash
cd frontend
npm install
ng serve
```

## 🛡️ Environment Variables

Create `.env` in `backend/` folder with the following:

```env
PORT=3000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

---

## Admin Functions (No Auth)

Functionality          | Description
-----------------------|------------------------------
Add/View Doctors       | Name, specialization, contact
Add/View Patients      | Name, gender, contact
Add/View Appointments  | Date, doctor, patient
Dashboard              | Stats & visual charts

---

## 🙋‍♂️ Author

Built with by **[Sabari Suresh]**  
🔗 [GitHub](https://github.com/SabariiSuresh)
