import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, updateTaskStatus,fetchTasks } from '../store/slices/taskSlice';
import { Card, Badge, Button, Container, Row, Col, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { FaTrash, FaCheck } from 'react-icons/fa';

// Helper function for priority colors
const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'danger';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'secondary';
  }
};

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(null); // Track which task is being updated
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  // Add handleToggleCompletion function
  const handleToggleCompletion = async (taskId, currentStatus) => {
    try {
      setUpdateLoading(taskId); // Set loading state for this specific task
      await dispatch(updateTaskStatus({
        todoId: taskId, // Make sure to use todoId instead of id
        updates: {
          completed: !currentStatus
        }
      })).unwrap();
      // Refresh the tasks list after successful update
      await dispatch(fetchTasks());
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setUpdateLoading(null); // Clear loading state
    }
  };
  const handleDeleteClick = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteModal(true);
    setDeleteError(null);
  };

  const handleDeleteConfirm = async () => {
    if (!todoToDelete || !todoToDelete._id) {
      setDeleteError("Invalid task ID");
      return;
    }

    setDeleteLoading(true);
    setDeleteError(null);

    try {
      await dispatch(removeTask(todoToDelete._id)).unwrap();
      setShowDeleteModal(false);
      setTodoToDelete(null);
    } catch (error) {
      setDeleteError(error.message || 'Failed to delete task');
      console.error('Delete error:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setTodoToDelete(null);
    setDeleteError(null);
  };

  if (loading && !deleteLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container>
      {tasks.map((task) => (
        <Card 
          key={task._id} 
          className={`mb-3 task-card ${task.completed ? 'completed-task' : ''}`}
        >
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={1}>
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(task._id, task.completed)}
                  disabled={updateLoading === task._id}
                  className="task-checkbox"
                />
              </Col>
              <Col xs={8} md={9}>
                <div className={`task-content ${task.completed ? 'completed' : ''}`}>
                  <h5 className="task-title mb-2">
                    {task.title}
                  </h5>
                  <div className="task-metadata">
                    <Badge bg={getPriorityColor(task.priority)} className="me-2">
                      {task.priority}
                    </Badge>
                    {task.completed && (
                      <Badge bg="success">
                        <FaCheck className="me-1" />
                        Completed
                      </Badge>
                    )}
                    {updateLoading === task._id && (
                      <Spinner 
                        animation="border" 
                        size="sm" 
                        className="ms-2"
                      />
                    )}
                  </div>
                </div>
              </Col>
              <Col xs={3} md={2} className="text-end">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(task)}
                  className="delete-button"
                  disabled={deleteLoading && todoToDelete?._id === task._id}
                >
                  {deleteLoading && todoToDelete?._id === task._id ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaTrash />
                  )}
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteError && (
            <Alert variant="danger" className="mb-3">
              {deleteError}
            </Alert>
          )}
          <p>Are you sure you want to delete this task?</p>
          <p className="text-muted">
            Task: {todoToDelete?.title}<br/>
            ID: {todoToDelete?._id}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {!loading && tasks.length === 0 && (
        <Card className="text-center p-4">
          <Card.Body>
            <p className="text-muted">No tasks added yet. Start by adding a new task!</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default TaskList;