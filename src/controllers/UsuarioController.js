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
        const { userId } = req.params
        const result = await services.ObtenerUsuario(userId);
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

    services.ActualizarUsuario(req.params.userId, req.body)

    res.send( { status: 'OK', data: req.body})
}

const EliminarUsuario = (req,res) => {
    try {
        services.EliminarUsuario(req.params.userId)
        res.send( { status: 'OK', data: "Usuario eliminado exitosamente"})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }
}


module.exports = {
    ObtenerUsuarios,
    ObtenerUsuario,
    RegistrarUsuario,
    ActualizarUsuario,
    EliminarUsuario,
    InicioDeSesion
}