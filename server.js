const express = require("express")
const exphbs = require("express-handlebars")
const mongojs = require("mongojs")

const databaseUrl = "tracker"
const collections = ["exercises"]
const db = mongojs(databaseUrl, collections)

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"))

app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

db.on("error", error => {
    console.log("Database Error:", error)
})

require("./routes/html_routes")(app);

app.listen(PORT, function () {
    console.log("Server listening on PORT " + PORT);
});
