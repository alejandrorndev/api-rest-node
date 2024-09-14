require('dotenv').config();
const express = require("express");
const UsuariosRouter = require('./routes/UsuariosRoutes');
const EventosRouter = require('./routes/EventosRoutes');



const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/usuarios", UsuariosRouter)
app.use("/api/eventos", EventosRouter)



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
