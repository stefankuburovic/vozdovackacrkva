const express = require("express");
const {response} = require("express");
const {join, resolve} = require("path");

const PORT = process.env.port || 3001;

const app = express();
app.use('/assets', express.static(resolve(__dirname, '../build', 'assets')));
app.use('/css', express.static(resolve(__dirname, '../build', 'css')));
app.use('/js', express.static(resolve(__dirname, '../build', 'js')));
app.use('/static', express.static(resolve(__dirname, '../build', 'static')));
app.use('/', express.static(resolve(__dirname, '../build', '')));

app.get('/', function(req, res){
    res.sendFile(join(__dirname, '../build', 'index.html'));
});

app.get("/api", (req, res) => {
    res.json({message: "Hello from server!"});
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

