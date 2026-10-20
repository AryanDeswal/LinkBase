# LinkBase

A project document portal for an architecture and interior design firm. Staff keep client details and every drawing, approval, estimate and site photo for a project in one place.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_4-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?logo=mongodb&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS-S3-FF9900?logo=amazonaws&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## About

LinkBase was built for Mayur Gandhi & Associates. It replaces scattered folders with one web app for **architectural** and **interior** projects. Each project holds its client and site details plus categorised file sections, such as floor plans, sections, elevations, sanction drawings, electrical layouts, furniture, estimates and bills. Files are uploaded to AWS S3 and their links are stored in MongoDB. Staff accounts are approved by an admin, and admins have their own dashboard to manage users and projects.

## Features

- **Staff accounts.** Signup collects name, email, DOB, phone, a family phone number and an address. The 6-digit verification code is emailed to the firm's admin, not to the user, so an admin approves each new account. Login returns a 24-hour JWT.
- **Account recovery.** "Forgot password" emails a reset link that expires after 1 hour. "Forgot email" looks up the account's email from its phone number.
- **Architectural projects.** Client details (client, site address, GST, PAN, Aadhaar, PIN, project head, lead firm, RCC designer) plus about 28 document categories, from area calculations and centre-line drawings to completion letters and consultancy fees.
- **Interior projects.** Client details plus categories for ceiling, electrical, plumbing, flooring, furniture, laminates, veneer, hinges, door handles, curtains, 3D models, estimates, bills and site photos.
- **File handling.** Upload files to S3 for each category, then download them or copy their links to the clipboard. Deleting a project also deletes its files from S3.
- **Project lists.** Search projects by client name and open, edit or delete them.
- **Admin dashboard.** Separate admin login. Admins view, search, edit and delete users, and view and manage all architectural and interior projects.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Front end | React 18 (Create React App), React Router 6, Tailwind CSS 3, Axios, React Toastify, Font Awesome, React Icons, FileSaver |
| Back end | Node.js, Express 4, Mongoose 8, JSON Web Tokens, bcrypt / bcryptjs, express-validator, Multer, AWS SDK (S3), Nodemailer (Gmail) |
| Database | MongoDB |
| Storage | AWS S3 (two buckets) |

## Project Structure

```
LinkBase/
├── public/                 # CRA static files (index.html, images, manifest)
├── src/                    # React front end
│   ├── App.js              # Client-side routes
│   ├── Components/
│   │   ├── Login/          # Login, Signup, OTP verification, Admin login
│   │   └── Dashboard/      # Staff dashboard: add/view/show projects
│   ├── admin/              # Admin dashboard and its views
│   ├── forget/             # Forgot email / forgot password / reset password
│   └── context/            # Auth and Admin React contexts
├── server/                 # Express API
│   └── src/
│       ├── server.js       # App entry point
│       ├── config/         # MongoDB connection, Nodemailer email helpers
│       ├── routes/         # auth, architecture, interior, admin routes
│       ├── controllers/    # Route handlers, S3 upload/delete
│       ├── models/         # User, Admin, Architecture, Interior schemas
│       ├── middleware/     # JWT auth middleware
│       └── utils/          # express-validator rules
├── tailwind.config.js
└── package.json            # Front-end package
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database (local or Atlas)
- An AWS account with two S3 buckets and an access key
- A Gmail account with an app password, used to send emails

### Installation

```bash
git clone https://github.com/AryanDeswal/LinkBase.git
cd LinkBase

# Front end
npm install

# Back end
cd server
npm install
```

### Environment Variables

The server loads `server/.env.<NODE_ENV>`, which is `server/.env.development` by default or `server/.env.production`. Create that file with:

| Variable | Purpose |
| --- | --- |
| `PORT` | Port for the API server (defaults to `3000`; set it to something else, such as `8000`, so it does not clash with the React dev server) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing staff login tokens |
| `ADMIN_JWT` | Secret for signing admin login tokens |
| `EMAIL_USER` | Gmail address used to send emails |
| `EMAIL_PASS` | Gmail app password for `EMAIL_USER` |
| `ADMIN_EMAIL` | Address that receives new-user verification codes |
| `AWS_ACCESS_KEY_ID` | AWS access key for S3 |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key for S3 |
| `AWS_REGION` | Region of the S3 buckets |
| `AWS_BUCKET_NAME` | Bucket for files uploaded through `/api/auth/upload` |
| `AWS_BUCKET_NAME2` | Bucket for files uploaded through `/api/auth/uploadarchitecture` |

### Running

```bash
# API (from server/)
npm run start:dev      # NODE_ENV=development, loads .env.development
npm run start:prod     # NODE_ENV=production, loads .env.production
npm run dev            # nodemon with auto-reload (loads .env.development)

# Front end (from the repo root)
npm start              # http://localhost:3000
npm run build          # production build in build/
```

> **Note:** The front end calls a deployed API at `https://projectassociate-fld7.onrender.com`, which is hard-coded in the components under `src/`. To use your local API, replace that base URL with your server's address (for example `http://localhost:8000`). Password-reset emails link to `https://www.mga2002.in/resetpassword`; change this in `server/src/config/email.js` if you need a different front-end URL.

## API Reference

### Auth and users: `/api/auth`

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Register a user. The verification code is emailed to `ADMIN_EMAIL` |
| POST | `/api/auth/verify` | Verify a user with `{ email, verificationCode }` |
| POST | `/api/auth/login` | Log in and get a JWT (24 h) |
| GET | `/api/auth/users` | List all users (password and code excluded) |
| PATCH | `/api/auth/users/:id` | Edit a user |
| DELETE | `/api/auth/users/:id` | Delete a user |
| POST | `/api/auth/forgot-password` | Email a password-reset link |
| POST | `/api/auth/reset-password` | Reset a password with `{ token, newPassword }` |
| POST | `/api/auth/forgot-email` | Look up an account email by `{ phone }` |
| POST | `/api/auth/upload` | Upload a file (`multipart`, field `file`) to `AWS_BUCKET_NAME` and return its URL |
| POST | `/api/auth/uploadarchitecture` | Upload a file (field `file`) to `AWS_BUCKET_NAME2` and return its URL |
| DELETE | `/api/auth/file/:s3Url` | Delete a file from S3 by its URL-encoded S3 URL |

### Architectural projects: `/api/architecture`

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/architecture/upload` | Create a project |
| PUT | `/api/architecture/update/:id` | Update a project |
| DELETE | `/api/architecture/upload/:id` | Delete a project and its S3 files |
| GET | `/api/architecture/modal/:id` | Get a project by ID |
| GET | `/api/architecture/data/:id?` | Get all projects, or one project if `id` is given |

### Interior projects: `/api/interior`

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/interior/interiors` | Create a project |
| PUT | `/api/interior/update/interiors/:id` | Update a project |
| DELETE | `/api/interior/interiors/:id` | Delete a project and its S3 files |
| GET | `/api/interior` | Get all projects |
| GET | `/api/interior/interior/:id` | Get a project by ID |

### Admin

| Method | Route | Description |
| --- | --- | --- |
| POST | `/signupadmin` | Create an admin account `{ email, password }` |
| POST | `/signinadmin` | Admin login and get an admin JWT |

## License

Released under the [MIT License](LICENSE).
