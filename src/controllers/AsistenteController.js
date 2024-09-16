const services = require('../services/AsistenteServices')
const eventServices = require("../services/EventoServices")

const ObtenerAsistentes = async (req,res) => {
    
    try{
        const resultado = await services.ObtenerAsistentes();
        res.send( { status: 'OK', data: resultado})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const ObtenerAsistente = async (req,res) => {
    
    try{
        const { asistenteId } = req.params
        const resultado = await services.ObtenerAsistente(asistenteId);
        res.send( { status: 'OK', data: resultado})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const ObtenerAsistentesPorEvento = async (req, res) => {
    try {
        const eventoId = parseInt(req.params.eventoId, 10);

        // Verifica si el eventoId es válido
        if (isNaN(eventoId) || eventoId < 1) {
            return res.status(400).json({
                message: 'ID de evento inválido'
            });
        }

        // Obtiene los asistentes para el evento
        const asistentes = await services.ObtenerAsistentesPorEvento(eventoId);

        res.status(200).json({
            status: 'OK',
            data: asistentes
        });
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({
                message: error.message
            });
        } else {
            res.status(500).json({
                message: 'Error al obtener los asistentes del evento'
            });
        }
    }
};


const ObtenerAsistentesPorUsuario = async (req, res) => {
  try {
      const usuarioId = parseInt(req.params.usuarioId, 10);
      const asistentes = await services.ObtenerAsistentesPorUsuario(usuarioId);

      res.status(200).json({
          status: 'OK',
          data: asistentes
      });
  } catch (error) {
      if (error.status === 404) {
          res.status(404).json({
              message: error.message
          });
      } else {
          res.status(500).json({
              message: 'Error al obtener los asistentes del usuario'
          });
      }
  }
};


const RegistrarAsistente = async (req,res) => {

    try {

        const assistance  = req.body
        const resultado = await services.RegistrarAsistente(assistance)
        res.send( { status: 'OK', data: resultado})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const ActualizarAsistente = async (req, res) => {
  try {
      const { asistenteId } = req.params;
      const assistance = req.body;
      console.log("assistance",assistance)

      const result = await services.ActualizarAsistente(asistenteId, assistance);

      res.send({ status: 'OK', data: result });
  } catch (e) {
       if (e.status === 404) {
          res.status(404).json({ error: e.message });
      } else {
          res.status(500).json({ error: 'Error interno del servidor' });
      }
  }
};

const EliminarAsistente = async (req, res) => {
  try {
      const { asistenteId } = req.params;
      
      await services.EliminarAsistente(asistenteId);
      
      res.status(200).json({
          status: 'OK',
          message: 'Asistencia eliminada exitosamente'
      });
  } catch (error) {
      if (error.status === 404) {
          res.status(404).json({
              error: error.message || 'Asistente no encontrado'
          });
      } else {
          // Maneja errores generales o internos del servidor
          console.error('Error al eliminar el asistente:', error.message);
          res.status(500).json({
              error: error.message || 'Error interno del servidor'
          });
      }
  }
};


const ObtenerAsistenciaDiaria = async (req,res) => {

  try {
    
    const events = await eventServices.ObtenerEventos()
    
    const resultados = await services.CalcularAsistenciaDiaria( events )

    res.send( { status: 'OK', data: resultados})

  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  ObtenerAsistentes,
  ObtenerAsistente,
  ObtenerAsistentesPorEvento,
  ObtenerAsistentesPorUsuario,
  RegistrarAsistente,
  ActualizarAsistente,
  EliminarAsistente,
  ObtenerAsistenciaDiaria
  
}