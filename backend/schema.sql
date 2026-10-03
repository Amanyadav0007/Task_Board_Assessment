-- Create database if not exists
CREATE DATABASE IF NOT EXISTS mini_task_board;
USE mini_task_board;

-- Create tasks table with restricted status: ('todo', 'in-progress', 'done')
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status ENUM('todo', 'in-progress', 'done') DEFAULT 'todo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial data
INSERT INTO tasks (title, status) VALUES 
('Setup Backend API', 'done'),
('Configure MySQL Database', 'done'),
('Create Task Routes and Controllers', 'in-progress'),
('Connect Frontend UI', 'todo');
