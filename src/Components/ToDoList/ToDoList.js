import React, { useState, useEffect } from 'react';
import { List, Input, Button, Card, message } from 'antd';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      const parsedData = JSON.parse(storedTasks);
      setTasks(parsedData || []);
    } catch (error) {
      console.error('Error reading data from storage:', error);
      message.error('Error reading data from storage. Please check the console for details.');
    }
  }, []);

  function writeDataToStorage(data) {
    try {
      localStorage.setItem('tasks', JSON.stringify(data));
    } catch (error) {
      console.error('Error writing data to storage:', error);
      message.error('Error writing data to storage. Please check the console for details.');
    }
  }

  const addTask = () => {
    if (task.trim() === '') {
      message.warning('Please enter a task.');
      return;
    }

    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setTask('');

    writeDataToStorage(newTasks);
  };

  const clearAll = () => {
    const newTasks = [];
    setTasks(newTasks);

    writeDataToStorage(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

    writeDataToStorage(newTasks);
  };

  return (
    <Card
      title="Basic Todo List"
      bordered={true}
      style={{
        width: 550,
        margin: '0 auto',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="todo-app">
        <div className="input-container">
          <Input
            id="calculatorInput"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={addTask}>
          Add Task
        </Button>
        <Button type="primary" style={{ marginLeft: '5px' }} onClick={clearAll}>
          Clear all
        </Button>
        <List
          bordered
          dataSource={tasks}
          style={{
            marginTop: '15px',
          }}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  style={{ marginTop: '-5px' }}
                  danger
                  onClick={() => removeTask(index)}
                >
                  Delete
                </Button>,
              ]}
            >
              {index + 1}. {item}
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
}

export default ToDoList;
