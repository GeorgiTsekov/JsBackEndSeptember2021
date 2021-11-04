const express = require('express');
const cors = require('cors');

const cubeRouter = require('./routes/cube');
const userRouter = require('./routes/user');
const { connectDB } = require('./config/database');
const app = express();

connectDB()

app.use(express.json());
app.use(cors());

app.use('/api/cube', cubeRouter);
app.use('/api', userRouter);

app.listen(4000, () => {
    console.log('Rest API is running on port 4000...');
});