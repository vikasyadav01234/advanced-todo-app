import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

const ProgressBar = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="progress-section mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span>Progress ({progressPercentage}%)</span>
        <span>{completedTasks}/{totalTasks} tasks completed</span>
      </div>
      <BootstrapProgressBar>
        <BootstrapProgressBar 
          variant="success" 
          now={progressPercentage} 
          label={`${progressPercentage}%`}
        />
      </BootstrapProgressBar>
    </div>
  );
};

export default ProgressBar;