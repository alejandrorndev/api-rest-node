const services = require('../services/UsuarioServices')


const ObtenerUsuarios = async (req,res) => {
    
    try{
        const result = await services.ObtenerUsuarios();
        res.json(result)
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const ObtenerUsuario = async (req,res) => {

    try{
        const { usuarioId } = req.params
        const result = await services.ObtenerUsuario(usuarioId);
        res.json(result)
    } catch (error){
        res.status(500);
        res.send(error.message)
    }
   
}

const RegistrarUsuario = async (req,res) => {

    try {
        
        const userRegistered = await services.RegistrarUsuario(req.body)
        res.send( { status: 'OK', data: userRegistered})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    
}


const InicioDeSesion = async (req,res) => {

    try {
        
        const token = await services.InicioDeSesion(req.body)
        res.send( { status: 'OK', data: token})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    
}

const ActualizarUsuario =  (req,res) => {

    services.ActualizarUsuario(req.params.usuarioId, req.body)

    res.send( { status: 'OK', data: req.body})
}

const EliminarUsuario = async (req, res) => {
    try {
      const result = await services.EliminarUsuario(req.params.usuarioId);
  
      res.status(200).json(result);
  
    } catch (e) {
      console.error(e);
  
      if (e.message.includes('No se pudo verificar la existencia del usuario')) {
        res.status(500).json({ error: 'Error interno del servidor' });
      } else if (e.message.includes('Usuario con ID')) {
        res.status(404).json({ error: e.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  };
  


module.exports = {
    ObtenerUsuarios,
    ObtenerUsuario,
    RegistrarUsuario,
    ActualizarUsuario,
    EliminarUsuario,
    InicioDeSesion
}