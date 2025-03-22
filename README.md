# Admin Dashboard 

This is an Admin Dashboard built as part of the internship assignment. It utilizes **Next.js** with TypeScript, **TailwindCSS**, and **ShadCN** for UI components. The dashboard includes a mock user login for testing purposes.

## Technologies Used


- **Next.js** (with TypeScript)
- **TailwindCSS** for styling
- **ShadCN** for UI components
- **Mock JWT Authentication** with `localStorage` for token management
- **JSONPlaceholder API** for dynamic data fetching

## Features

- **Mock User Login**:
  - Email: `user@example.com`
  - Password: `password`
- **Dynamic Data Fetching**: Fetches and displays posts from **JSONPlaceholder API** with search, filter, and pagination.
- **Server Components**: Utilized Server Components for fetching initial data server-side.
- **Dark Mode**: Added a toggle for switching between dark and light modes.
- **Error Handling**: Displays error messages in case the API fetch fails.
- **Reusable Components**: Modular components like **Header**, **Sidebar**, and **Table** for easier management and scaling.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/admin-dashboard.git

2. Navigate into the project directory:

    ```bash
    cd admin-dashboard

3. Install the dependencies:

    ```bash
    npm install 
4. Run the development server:

    ```bash
    npm run dev
    