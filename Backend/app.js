const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to database 
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/uploads', uploadRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
