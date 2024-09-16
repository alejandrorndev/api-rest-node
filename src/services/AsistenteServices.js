const { getConnection } = require('../basededatos/mysql')
const eventService = require("./EventoServices")
const moment = require('moment');
require('moment/locale/es');
moment.locale('es');   

const ObtenerAsistentes = async() => { 

    const connection = await getConnection();
    const resultado = await connection.query('SELECT * FROM assistance');
    return resultado

} 

const ObtenerAsistentesPorEvento = async (eventoId) => {
    try {
        const connection = await getConnection();

        const resultado = await connection.query('SELECT * FROM assistance WHERE event_id = ?', [eventoId]);

        if (!resultado) {
            const error = new Error('No se encontraron asistentes para este evento');
            error.status = 404;
            throw error;
        }
        
        let asistentes = Array.isArray(resultado) ? resultado : [resultado];
       
        if (asistentes.length === 0) {
            const error = new Error('No se encontraron asistentes para este evento');
            error.status = 404;
            throw error;
        }

        return resultado;
    } catch (error) {
        throw error;
    }
};


const ObtenerAsistente = async (asistenteId) => {

const connection = await getConnection();
const resultado = await connection.query('SELECT * FROM assistance WHERE assistance_id = ?', [asistenteId]);
return resultado

};


const ObtenerAsistentesPorUsuario = async (usuarioId) => {
    try {
        const connection = await getConnection();

        const [resultado] = await connection.query('SELECT * FROM assistance WHERE user_id = ?', [usuarioId]);

        if (resultado.length === 0) {
            const error = new Error('No se encontraron asistentes para este usuario');
            error.status = 404;
            throw error;
        }

        return resultado;
    } catch (error) {

        throw error;
    }
};


const RegistrarAsistente = async (assistance) => { 

    const assistanceToRegister = {
        event_id: assistance.eventoId,
        user_id: assistance.usuarioId,
        date: assistance.date
    }

    const event = (await eventService.ObtenerEvento(assistance.eventoId))[0]

    if (event){
        const eventToUpdate = {
            event_id: event.event_id,
            user_id: event.user_id,
            name: event.name,
            description: event.description,
            created_date: event.created_date,
            location: event.location,
            assistance: event.assistance + 1 ,
            event_date: event.event_date
        }
    
        eventService.ActualizarEvento(event.event_id, eventToUpdate)
        
        const sql = `INSERT INTO assistance SET ?`;
        const connection = await getConnection();
        connection.query(sql, assistanceToRegister)
        return {message: "Asistencia registrada exitosamente Asistencia:", data: assistance}
    }
    else {
        
        return {message: "El evento no existe"}
    }
    

} 

const ActualizarAsistente = async (asistenteId, assistance) => { 
    try {
        const connection = await getConnection();

      
        const Fecha = await eventService.FormatearFecha(assistance.date);

        
        const eventResult = await connection.query('SELECT * FROM events WHERE event_id = ?', [assistance.eventoId]);
        if (eventResult.length === 0) {
            const error = new Error('El evento asociado no existe');
            error.status = 404;
            throw error;
        }

        const assistanceToRegister = {
            event_id: assistance.eventoId,
            user_id: assistance.usuarioId,
            date: Fecha
        };
        
       
        const updateResult = await connection.query('UPDATE assistance SET ? WHERE assistance_id = ?', [assistanceToRegister, asistenteId]);


        if (updateResult.affectedRows === 0) {
            const error = new Error('Asistente no encontrado o no actualizado');
            error.status = 404;
            throw error;
        }

        console.log("Asistencia actualizada exitosamente ID:", asistenteId);
        return {
            status: 'OK',
            message: 'Asistencia actualizada exitosamente',
            data: assistanceToRegister
        };
    } catch (error) {
      
        console.error('Error al actualizar la asistencia:', error.message);
        throw error;
    }
};

const EliminarAsistente = async (asistenteId) => { 
    const connection = await getConnection();

    // Primero, verifica si el asistente existe
    const asistente = await connection.query('SELECT * FROM assistance WHERE assistance_id = ?', [asistenteId]);
    if (asistente.length === 0) {
        // Si no se encuentra el asistente, lanza un error 404
        const error = new Error('Asistente no encontrado');
        error.status = 404;
        throw error;
    }

    // Si el asistente existe, procede a eliminarlo
    const sql = 'DELETE FROM assistance WHERE assistance_id = ?';
    await connection.query(sql, [asistenteId]);

    console.log("Asistencia eliminada exitosamente, ID:", asistenteId);

    return {
        status: 'OK',
        message: 'Asistencia eliminada exitosamente',
    };
};


const CalcularAsistenciaDiaria = async (events) => {
    let dailyAssistance = {
        'Domingo': 0,
        'Lunes': 0,
        'Martes': 0,
        'Miércoles': 0,
        'Jueves': 0,
        'Viernes': 0,
        'Sábado': 0
    };

    events.forEach(event => {
        let day = moment(event.event_date).format('dddd');
        day = day.charAt(0).toUpperCase() + day.slice(1);
        if (!dailyAssistance.hasOwnProperty(day)) {
            console.warn(`Día no encontrado: ${day}`);
            return;
        }
        dailyAssistance[day] += event.assistance || 0;
    });

    return dailyAssistance;
};


module.exports = {

    ObtenerAsistentes,
    ObtenerAsistentesPorEvento,
    ObtenerAsistente,
    ObtenerAsistentesPorUsuario,
    RegistrarAsistente,
    ActualizarAsistente,
    EliminarAsistente,
    CalcularAsistenciaDiaria

} 