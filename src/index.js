require('dotenv').config();
const express = require("express");
const UsuariosRouter = require('./routes/UsuariosRoutes');
const EventosRouter = require('./routes/EventosRoutes');
const AsistenteRouter = require('./routes/AsistentesRoutes');
const { swaggerDocs } = require('./swagger');





const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/usuarios", UsuariosRouter)
app.use("/api/eventos", EventosRouter)
app.use("/api/asistentes", AsistenteRouter)




app.listen(PORT, () => {
    console.log(`Servidor en ejecucion en el puerto ${PORT}`)
    swaggerDocs(app, PORT);
});
