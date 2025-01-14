# Password Pals Manager

A simple and secure password manager built with modern web technologies. This application allows users to safely store and manage their passwords with an intuitive interface.

## Project Overview

Password Pals Manager is a frontend-only password management solution that provides a clean, card-based interface for storing and managing passwords. All data is stored locally in the browser's memory for demonstration purposes.

### Design Inspiration:

- Clean card-based layout similar to LastPass
- Modern, professional color scheme with focus on security and trust
- Smooth animations for interactions
- Responsive grid layout

### Features:

- Password Card Grid
- Create/Edit/Delete Password Cards
- Show/Hide Password Toggle
- Copy Password to Clipboard
- Search by Name
- Basic Card Fields (URL, Name, Username, Password)

### Styling:

- Colors: Professional blues and grays with accent colors for actions
- Animations: Smooth transitions for card interactions
- Layout: Responsive grid with proper spacing
- Typography: Clean, readable font for security-focused content

## Architecture and Approach

### Component Structure:

- **PasswordCard**: Reusable component for displaying individual password entries
- **PasswordDialog**: Handles creation and editing of password entries
- **Index**: Main page component that manages the password grid and search functionality

### Design Decisions:

- Components are kept small and focused for better maintainability
- State management is handled locally since this is a frontend-only demo
- UI components from shadcn/ui are used for consistent design

### Assumptions and Limitations:

- Data persistence is not implemented (data is lost on page refresh)
- No backend integration or real security measures
- Designed for demonstration purposes only

### Backend Integration

The application includes an API service layer built with Axios for handling HTTP requests and utilizes React Query for efficient data fetching and cache management. CRUD operations are prepared to work with a backend API.

#### Supported Endpoints:

- **GET** `/passwords`: Retrieve all stored passwords
- **POST** `/passwords`: Add a new password
- **PUT** `/passwords/:id`: Update an existing password
- **DELETE** `/passwords/:id`: Delete a password

#### Enhancements:

- Added loading states and error handling with toast notifications
- Optimized data fetching and caching using React Query

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: UI component library
- **Lucide React**: Icon library
- **Vite**: Build tool and development server
- **Axios**: HTTP client for API communication
- **React Query**: Data fetching and cache management

## Running the Project

1. Clone the repository:

```bash
git clone git@github.com:GabriellCastro/password-pals-manager.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Development

The project uses Vite for fast development and building. Available commands:

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
