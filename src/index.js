const port = 3000
const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
// const cors = require('cors')

const app = express();
// app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//temporary storage
const userIngredients = {};

//middleware to check if user has ingredients
app.use((req, res, next) => {
    if (!req.cookies.userId) {
        // Create a new user ID and set it as a cookie
        const userId = uuidv4();
        res.cookie('userId', userId, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
            httpOnly: true, // Accessible only by the server
        });
        // usersIngredients[userId] = []; // Initialize empty ingredients list for the user
    }
    next();
});




//routes
app.use(require('./routes/index'));
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.listen(port);

console.log(`Server on port ${port}`);