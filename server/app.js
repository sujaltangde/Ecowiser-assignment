const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const errorHandler = require('./middlewares/errorHandler.js')
const fileUpload = require('express-fileupload')



app.use(express.json({ limit: '10mb' }));
app.use(cors({
	origin: "*",
	credentials: true
}))
app.use(fileUpload())



// Routes Import
const user = require("./routes/userRoutes.js")
const recipe = require("./routes/recipeRoutes.js")


app.use("/api/", user);
app.use("/api/recipe/", recipe);

app.use(errorHandler);





// healthcheck
app.get("/api/test", (req, res) => {
	res.send(
		"Everything Fine"
	)
})



module.exports = app;