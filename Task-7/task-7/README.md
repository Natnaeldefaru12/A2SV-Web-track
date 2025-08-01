# Job Listing Application

A modern job listing application that fetches real job data from an API and displays it in a user-friendly interface.

## Features

- **API Integration**: Fetches job data from a real API endpoint
- **Job Listings**: Displays job cards with essential information
- **Sorting Options**: Sort jobs by newest, oldest, or most relevant
- **Detailed Job View**: Click on a job card to view detailed information
- **Error Handling**: Graceful handling of API errors and loading states
- **Responsive Design**: Works on mobile, tablet, and desktop devices



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

