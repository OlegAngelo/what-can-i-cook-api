const port = 3000
const express = require('express');
// const cors = require('cors')

const app = express();
// app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use(require('./routes/index'));

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.listen(3000);

console.log(`Server on port ${port}`);