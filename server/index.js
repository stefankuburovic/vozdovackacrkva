const app = require('./app');
const setupRoutes = require('./routes/index');

const PORT = process.env.port || 3001;

setupRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});