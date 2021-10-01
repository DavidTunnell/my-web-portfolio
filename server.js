const express = require("express");
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

//allow api to use json and url encoding
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/email", function (req, res) {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
