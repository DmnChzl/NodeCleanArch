export const CREATE_TABLE_USERS = `
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(8) PRIMARY KEY,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE
  );
`;

export const CREATE_USER = `
  INSERT INTO users (id, first_name, last_name, email)
  VALUES (?, ?, ?, ?)
`;

export const SELECT_ALL_USERS = `
  SELECT * FROM users
`;

export const SELECT_USER = `
  SELECT * FROM users WHERE id = ?
`;

export const UPDATE_USER = `
  UPDATE users
  SET first_name = ? ,
      last_name = ? ,
      email = ?
  WHERE id = ?
`;

export const DELETE_USER = `
  DELETE FROM users WHERE id = ?
`;
