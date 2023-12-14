CREATE TABLE labeled_data (
  unique_id INT AUTO_INCREMENT PRIMARY KEY,
  image_blob MEDIUMBLOB NOT NULL,
  file_name VARCHAR(50),
  task_id INT,
  label VARCHAR(20),
  date_uploaded DATE
);

CREATE TABLE queue (
  unique_id INT AUTO_INCREMENT PRIMARY KEY,
  image_blob MEDIUMBLOB NOT NULL,
  file_name VARCHAR(50),
  task_id INT,
  label VARCHAR(20),
  date_uploaded DATE
);

CREATE TABLE tasks (
  task_id INT AUTO_INCREMENT PRIMARY KEY,
  task_name VARCHAR(50),
  size INT,
  items_remaining INT,
  user_id VARCHAR(50),
  instructions VARCHAR(200)
);

CREATE TABLE example_bin (
  unique_id INT AUTO_INCREMENT PRIMARY KEY,
  image_blob BLOB NOT NULL,
  file_name VARCHAR(50),
  task_id INT,
  label VARCHAR(20),
  date_uploaded DATE
);