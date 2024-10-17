const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");

const fe_localhost = "http://localhost:3000";
const fe_remote = [
	"whatcanicookonline.vercel.app",
	"what-can-i-cook-api-git-development-olegangelos-projects.vercel.app",
	"what-can-i-cook-nsxsehnfj-olegangelos-projects.vercel.app",
];

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

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.listen(process.env.PORT || port);

console.log(`Server on port ${port}`);

module.exports = app;
