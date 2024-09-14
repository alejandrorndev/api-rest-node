const EventoServices = require('../services/EventoServices')

const getAllEvents = async (req,res) => {
    
    try{
        const result = await EventoServices.getAllEvents();
        res.send( { status: 'OK', data: result})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const getEvent = async (req,res) => {
    
    try{
        const { eventId } = req.params
        const result = await EventoServices.getEvent(eventId);
        res.send( { status: 'OK', data: result})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const getNearLocations = async (req,res) => {

  try{
      const { lon, lat, range } = req.body
      const result = await EventoServices.getNearLocations(lon, lat, range);
      res.send( { status: 'OK', data: result})
  } catch (error){
      res.status(500);
      res.send(error.message)
  }
}

const getNearLocationsFromEvent = async (req,res) => {

  try{
      const { eventId, range } = req.body
      const event = await EventoServices.getEvent(eventId)

      if (event.length === 0) {
        return res.status(404).json({ message: "El evento no existe" });
    }
   
      const result = await EventoServices.getNearLocationsFromEvent(event[0].location, range);
      res.send( { status: 'OK', data: result})
  } catch (error){
      res.status(500);
      res.send(error.message)
  }
}


const createEvent = (req,res) => {

    try {

        const event  = req.body
        EventoServices.createEvent(event)
        res.send( { status: 'OK', data: event})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const massiveCreationEvents = async (req,res) => {
  try {

    if (!req.file) {
      return res.status(400).send('No se ha enviado ningún archivo');
    }

    EventoServices.massiveCreationEvents(req.file.buffer)
    res.status(200).send({Status: 'OK', Message: 'Archivo Excel procesado correctamente'});

  } catch (e){
    console.error('Error al procesar el archivo Excel:', error);
    res.status(500).send('Error al procesar el archivo Excel');
  }
}

const updateEvent = (req,res) => {

    try {

        const { eventId } = req.params
        const event  = req.body
        EventoServices.updateEvent(eventId, event)
        res.send( { status: 'OK', data: event})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const deleteEvent = (req,res) => {

     try {

        const { eventId } = req.params
        EventoServices.deleteEvent(eventId)
        res.send( { status: 'OK', data: "Evento eliminado exitosamente"})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}


module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    massiveCreationEvents,
    getNearLocations,
    getNearLocationsFromEvent
}