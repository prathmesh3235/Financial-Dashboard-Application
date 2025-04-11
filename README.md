# Financial Dashboard Application

A modern frontend financial dashboard built with React that provides real-time financial data visualization and analysis tools. This is a client-side application focused on providing an intuitive user interface for financial data visualization.

## Features
- Interactive charts and graphs
- Responsive design for all devices
- Client-side state management
- Modern UI components

## Prerequisites

Choose one of the following setup methods:

### Option 1: Docker Setup (Recommended)
- Docker Desktop installed on your machine

### Option 2: Local Setup
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn

## Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd financial-dashboard
```

2. Build and start the application using Docker:
```bash
# Build the Docker image
docker build -t financial-dashboard .

# Run the container
docker run -p 3000:3000 financial-dashboard
```

The application will be available at [http://localhost:3000](http://localhost:3000).

To stop the application:
```bash
# Press Ctrl+C in the terminal where the container is running
# Or find and stop the container using:
docker ps
docker stop <container-id>
```

## Local Development Setup

If you prefer to run the application without Docker:

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
financial-dashboard/
├── src/                    # Source directory
│   ├── components/        # Reusable UI components
│   ├── utils/            # Frontend utility functions
│   └── pages/            # Application routes
├── public/                # Static assets
├── Dockerfile            # Docker configuration
└── .dockerignore         # Docker ignore file
```

## Technologies Used

Frontend Stack:
- React 18 (Create React App)
- JavaScript
- Tailwind CSS (Styling)
- Chart.js & React-ChartJS-2 (Data Visualization)
- D3.js (Advanced Data Visualization)
- Docker (Containerization)

## Development Assumptions

1. The application is designed to run in a modern web browser with JavaScript enabled
2. This is a frontend-only application - you'll need to connect it to your own backend API
3. Docker Desktop is installed and running (for Docker setup)
4. Port 3000 is available on your machine for the frontend server

## Environment Variables

The following environment variables can be configured for connecting to your backend:

```env
REACT_APP_API_URL=http://localhost:3000  # Your backend API URL
```

These can be passed to Docker using the -e flag or configured in `.env` for local development:
```bash
docker run -p 3000:3000 -e REACT_APP_API_URL=http://your-api-url financial-dashboard
```

## Building for Production

### Using Docker:
```bash
# Build the production image
docker build -t financial-dashboard:prod --target production .

# Run the production container
docker run -p 3000:3000 financial-dashboard:prod
```

### Local Build:
```bash
npm run build
npm run start
# or
yarn build
yarn start
```