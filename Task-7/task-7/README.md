# Job Listing Application

A modern job listing application that fetches real job data from an API and displays it in a user-friendly interface.

## Features

- **API Integration**: Fetches job data from a real API endpoint
- **Job Listings**: Displays job cards with essential information
- **Sorting Options**: Sort jobs by newest, oldest, or most relevant
- **Detailed Job View**: Click on a job card to view detailed information
- **Error Handling**: Graceful handling of API errors and loading states
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Screenshots

### Instructions for Taking Screenshots

To complete the documentation, please take screenshots of the application:

1. Start the development server with `npm run dev`
2. Open http://localhost:3000 in your browser
3. Take a screenshot of the home page showing the job listings
4. Click on any job to view its details
5. Take a screenshot of the detailed job view
6. Save both screenshots in the `screenshots` folder
7. Update this README.md file to include the actual screenshot file paths

### Home Page

(Add your home page screenshot here)

### Detailed Job View

(Add your detailed job view screenshot here)

## Technologies Used

- **Next.js**: React framework for building the application
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling the components
- **Fetch API**: For making HTTP requests to the API endpoint

## API Integration

### Current Implementation

Due to issues with the original API, the application currently uses mock data from JSONPlaceholder:

- **Get all jobs**: `https://jsonplaceholder.typicode.com/users`
- **Get job by ID**: `https://jsonplaceholder.typicode.com/users/:id`

The application transforms this user data into job-like data for demonstration purposes.

### Original API (Currently Not Used)

The original API endpoints that were intended to be used:

- **Get all jobs**: `https://akil-backend.onrender.com/opportunities/search`
- **Get job by ID**: `https://akil-backend.onrender.com/opportunities/:id`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/app
  /components
    - Card.tsx            # Job card component
    - DetailedJob.tsx     # Detailed job view component
  /detailed
    - page.tsx            # Detailed job page
  - page.tsx              # Home page with job listings
  - layout.tsx            # Root layout component
```

## Implementation Details

### Job Listings

The home page fetches all jobs from the API and displays them as cards. Each card shows:

- Job title
- Organization name
- Location
- Brief description
- Categories and required skills

Users can sort the jobs by:
- Newest first (default)
- Oldest first
- Most relevant (based on view count)

### Job Details

Clicking on a job card navigates to a detailed view that shows comprehensive information about the job:

- Full description
- Responsibilities
- Requirements
- Ideal candidate traits
- When and where information
- Organization contact details
- Categories and required skills

### Error Handling

The application handles various error scenarios:

- Loading states with spinners
- API fetch errors with retry options
- Missing job data with appropriate messages

## Issues Fixed

### API Integration Issues

- **Original Issue**: The application was encountering an error "jobs isn't iterable" when trying to process data from the original API.
- **Root Cause**: The API response structure was not compatible with the expected format in the application.
- **Solution**: 
  1. Added robust error handling and type checking for API responses
  2. Implemented a fallback to use mock data from JSONPlaceholder API
  3. Added data transformation to convert user data into job-like data

### Code Structure Issues

- **Original Issue**: There were syntax errors in the page.tsx file with extra closing tags.
- **Root Cause**: Extra `</div>` and closing parenthesis at the end of the component.
- **Solution**: Removed the extra closing tags to fix the syntax error.

## Future Improvements

- Restore integration with the original API once its structure is confirmed
- Add search functionality
- Implement filtering by categories and skills
- Add pagination for large result sets
- Implement user authentication and job application features
