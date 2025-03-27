import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import { logout } from '../store/slices/authSlice';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import ProgressBar from './ProgressBar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  // Get the current user from auth state
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Redirect to login if no user is found
    if (!user) {
      navigate('/login');
    }

    return () => clearInterval(timer);
  }, [user, navigate]);

  const formatDateTime = (date) => {
    const pad = (num) => String(num).padStart(2, '0');
    
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    return null; // or return a loading spinner
  }

  return (
    <Container>
      <Card className="my-4 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Todo Dashboard</h1>
            <span className="me-3 text-muted">Welcome, {user.username}!</span>
          </div>
          <div>
            
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Card>
      <ProgressBar />
      <TaskInput />
      <TaskList />
    </Container>
  );
};

export default Dashboard;