const express = require('express');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction');
const dbConnect = require('./utils/dbConnect')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


const port = process.env.PORT || 5000;

const start = async () => {

    await dbConnect();
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

app.use('/api/user', userRoutes);
app.use('/api/transaction', transactionRoutes);

start();
