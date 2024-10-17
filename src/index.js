const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");

const fe_localhost = "http://localhost:3000";
const fe_remote = "whatcanicookonline.vercel.app";

const corsOptions = {
	origin: fe_remote,
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(require("./routes/index"));

app.listen(port);

console.log(`Server on port ${port}`);
