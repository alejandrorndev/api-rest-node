const EventoServices = require('../services/EventoServices')

const ObtenerEventos = async (req,res) => {
    
    try{
        const result = await EventoServices.ObtenerEventos();
        res.send( { status: 'OK', data: result})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const ObtenerEvento = async (req,res) => {
    
    try{
        const { eventoId } = req.params
        const result = await EventoServices.ObtenerEvento(eventoId);
        res.send( { status: 'OK', data: result})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const UbicacionesCercanas = async (req,res) => {

  try{
      const { lon, lat, range } = req.body
      const result = await EventoServices.UbicacionesCercanas(lon, lat, range);
      res.send( { status: 'OK', data: result})
  } catch (error){
      res.status(500);
      res.send(error.message)
  }
}

const ObtenerUbicacionesCercanasAlEvento = async (req,res) => {

  try{
      const { eventoId, range } = req.body
      const event = await EventoServices.ObtenerEvento(eventoId)

      if (event.length === 0) {
        return res.status(404).json({ message: "El evento no existe" });
    }
   
      const result = await EventoServices.ObtenerUbicacionesCercanasAlEvento(event[0].location, range);
      res.send( { status: 'OK', data: result})
  } catch (error){
      res.status(500);
      res.send(error.message)
  }
}

const CrearEvento = (req,res) => {

    try {

        const event  = req.body
        EventoServices.CrearEvento(event)
        res.send( { status: 'OK', data: event})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const CreacionMasivaEventos = async (req,res) => {
  try {

    if (!req.file) {
      return res.status(400).send('No se ha enviado ningún archivo');
    }

    EventoServices.CreacionMasivaEventos(req.file.buffer)
    res.status(200).send({Status: 'OK', Message: 'Archivo Excel procesado correctamente'});

  } catch (e){
    console.error('Error al procesar el archivo Excel:', error);
    res.status(500).send('Error al procesar el archivo Excel');
  }
}

const ActualizarEvento = (req,res) => {

    try {

        const { eventoId } = req.params
        const event  = req.body
        EventoServices.ActualizarEvento(eventoId, event)
        res.send( { status: 'OK', data: event})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const EliminarEvento = (req,res) => {

     try {

        const { eventoId } = req.params
        EventoServices.EliminarEvento(eventoId)
        res.send( { status: 'OK', data: "Evento eliminado exitosamente"})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}


module.exports = {
    ObtenerEventos,
    ObtenerEvento,
    CrearEvento,
    ActualizarEvento,
    EliminarEvento,
    CreacionMasivaEventos,
    UbicacionesCercanas,
    ObtenerUbicacionesCercanasAlEvento
}