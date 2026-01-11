require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./Routes/userRoutes');
const newsRoutes = require('./Routes/newsRoutes');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/news', newsRoutes);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;