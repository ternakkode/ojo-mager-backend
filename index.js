require('dotenv').config();

const express = require('express');
const cors = require('cors');

const sequelize = require('./database/connection');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

sequelize.authenticate().then(() => {
    console.log('Connection to postgresql database has been established successfully.');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is listening on http://127.0.0.1:${port}`);
    })
}).catch(error => {
    console.error('Unable to connect to the database:', error);
})
