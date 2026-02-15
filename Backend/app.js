const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const groupRoutes = require('./routes/groupRoutes');
const groupExpenseRoutes = require('./routes/groupExpenseRoutes');
const groupInviteRoutes = require('./routes/groupInviteRoutes');
const ExpressError = require("./utils/ExpressError.js");
const methoodsoverride = require('method-override');
dotenv.config();

const app = express();
// Connect to database 
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methoodsoverride('_method'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/user-profiles', userProfileRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/group-expenses', groupExpenseRoutes);
app.use('/api/group-invites', groupInviteRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
});
// --------ERROR HANDLING--------
app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});


module.exports = app;
