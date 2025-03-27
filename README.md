# Advanced Todo Application

A feature-rich Todo application built with React, Redux Toolkit, and Bootstrap that includes user authentication, real-time UTC clock, task management with priorities, and a progress tracking system.

## Features

### User Authentication
- Secure login system
- Persistent user sessions
- Protected routes
- User-specific todo lists

### Task Management
- Create new tasks with priorities (High, Medium, Low)
- Delete tasks with confirmation
- Mark tasks as complete/incomplete
- Task priority color coding:
  - High: Red
  - Medium: Yellow
  - Low: Green


### UI/UX Features
- Clean and responsive design
- Loading states and animations
- Error handling and user feedback
- Confirmation modals for destructive actions
- Progress tracking
- Task completion statistics

## Technologies Used

- **Frontend Framework**: React
- **State Management**: Redux Toolkit
- **UI Framework**: React Bootstrap
- **Routing**: React Router v6
- **API Integration**: REST API
- **Styling**: CSS3 with Bootstrap 5
- **Icons**: React Icons

## API Integration

The application uses the following API endpoints:
```javascript
BASE_URL: 'https://api.freeapi.app/api/v1/todos'

Endpoints:
- GET    /todos         - Fetch all todos
- POST   /todos         - Create new todo
- DELETE /todos/:id     - Delete todo
- PUT    /todos/:id     - Update todo
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vikasyadav01234/advanced-todo-app.git
```

2. Install dependencies:
```bash
cd advanced-todo-app
npm install
```

3. Start the development server:
```bash
npm start
```

## Project Structure

```
advanced-todo-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── TaskInput.js
│   │   ├── TaskList.js
│   │   └── ProgressBar.js
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── taskSlice.js
│   │   └── index.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Usage

1. **Login**:
   - Enter your username
   - Enter your password
   - Click "Login"

2. **Add a Task**:
   - Enter task title
   - Select priority
   - Click "Add Task"

3. **Manage Tasks**:
   - Check/uncheck to toggle completion
   - Click trash icon to delete
   - View progress in the progress bar

4. **Monitor Progress**:
   - See total tasks vs completed tasks
   - Watch the progress bar update
   - View task statistics

## Features in Detail

### Task Management
- Create tasks with different priority levels
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- View task details and status

### Progress Tracking
- Visual progress bar
- Completion percentage
- Total vs completed tasks counter
- Priority-based statistics

### User Interface
- Responsive design for all screen sizes
- Interactive elements with hover states
- Loading animations
- Error message displays
- Success notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

- React Bootstrap for UI components
- Redux Toolkit for state management
- FreeAPI.app for the TODO API