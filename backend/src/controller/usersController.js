import pool from '../database/db.js';
import bcrypt from 'bcrypt';

export const userSignup = async (req, res) => {
  const { username, email, password} = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;', [username, email, hash]);

    res.status(201).json({message: 'Account has been created', user: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const userSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users;');
    
    for (const value of result.rows) {
      const match = await bcrypt.compare(password, value.password);

      if (match && email == value.email) {
        return res.status(200).json({message: `Welcome back ${value.username}`, user: value});
      }
    }

    res.status(404).json({message: 'Invalid Credentials'});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};