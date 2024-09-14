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

const ObtenerAsistentesPorEvento = async (req,res) => {
    
  try{
      const { eventoId } = req.params
      const resultado = await services.ObtenerAsistentesPorEvento(eventoId);
      res.send( { status: 'OK', data: resultado})
  } catch (error){
      res.status(500);
      res.send(error.message)
  }

}

const ObtenerAsistentesPorUsuario = async (req,res) => {
    
  try{
      const { usuarioId } = req.params
      const resultado = await services.ObtenerAsistentesPorUsuario(usuarioId);
      res.send( { status: 'OK', data: resultado})
  } catch (error){
      res.status(500);
      res.send(error.message)
  }

}

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

const ActualizarAsistente = (req,res) => {

    try {

        const { asistenteId } = req.params
        const  assistance  = req.body
        services.ActualizarAsistente(asistenteId, assistance)
        res.send( { status: 'OK', data: assistance})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const EliminarAsistente = (req,res) => {

     try {

        const { asistenteId } = req.params
        services.EliminarAsistente(asistenteId)
        res.send( { status: 'OK', data: "Asistencia eliminada exitosamente"})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

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