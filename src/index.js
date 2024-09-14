require('dotenv').config();
const express = require("express");
const UsuariosRouter = require('./routes/UsuariosRoutes');


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/users", UsuariosRouter)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
