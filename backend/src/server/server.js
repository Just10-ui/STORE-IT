import express from 'express';
import dotenv from 'dotenv';
import router from '../router/router.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use('/api', router);

app.listen(port, () => {
  console.log(`Port is running on http://localhost:${port}`);
});