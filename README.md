# Secret Santa Generator

A web application built with Next.js that helps organize Secret Santa gift exchanges. Upload your participants' data in Excel, and get randomized Secret Santa assignments while ensuring no one gets the same person as last year!

## Tech Stack

- **Frontend:** Next.js with TypeScript
- **Styling:** Tailwind CSS with shadcn/ui components
- **State Management:** React Hooks (Custom hooks for modularity)
- **Testing:** Vitest

## Features

- Upload participant data via Excel file
- Generate Secret Santa assignments with constraints:
  - No self-assignments
  - No repeat assignments from previous year
- Download results as Excel file
- Clean, modern UI with shadcn components
- Responsive design

## Project Structure

### Frontend
- Custom hooks for better code organization:
  - `useXLSX`: Handles Excel file processing
  - `useSecretSanta`: Manages Secret Santa logic and API calls

### Backend
- API endpoint for Secret Santa generation
- Object-Oriented implementation with two main classes:
  - `SecretSantaEmployee`: Manages individual participant data
  - `SecretSantaManager`: Handles assignment generation algorithm

## How to Use

1. Prepare your Excel file with the following format:
   - Required columns: Employee_Name, Employee_EmailID
   - Optional columns: Secret_Child_Name, Secret_Child_EmailID

2. Upload the Excel file through the web interface

3. The system will:
   - Validate the file format
   - Generate new Secret Santa assignments
   - Ensure no one gets the same person as last year
   - Return assignments that you can download as Excel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

## Algorithm

The Secret Santa assignment uses:
- Adjacency Matrix for tracking valid assignments
- DFS (Depth-First Search) with backtracking to find valid assignments
- Hamiltonian Cycle to ensure everyone gives and receives exactly one gift
