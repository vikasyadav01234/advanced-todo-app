import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTask } from '../store/slices/taskSlice';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    try {
      await dispatch(addNewTask({
        title: title.trim(),
        priority,
        completed: false,
      })).unwrap();
      
      setTitle('');
      setPriority('Medium');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="my-4">
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new task..."
              className="mb-2"
            />
          </Col>
          <Col xs={12} md={4}>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mb-2"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={2}>
            <Button type="submit" variant="primary" className="w-100">
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TaskInput;