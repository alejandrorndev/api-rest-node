const { getConnection } = require('../basededatos/mysql')
const eventService = require("./EventoServices")
const moment = require('moment');

const ObtenerAsistentes = async() => { 

    const connection = await getConnection();
    const resultado = await connection.query('SELECT * FROM assistance');
    return resultado

} 

const ObtenerAsistentesPorEvento = async (eventId) => {

    const connection = await getConnection();
    const resultado = await connection.query('SELECT * FROM assistance WHERE event_id = ?', [eventId]);
    return resultado

  };


const ObtenerAsistente = async (asistenteId) => {

const connection = await getConnection();
const resultado = await connection.query('SELECT * FROM assistance WHERE assistance_id = ?', [asistenteId]);
return resultado

};


const ObtenerAsistentesPorUsuario = async (userId) => {

    const connection = await getConnection();
    const resultado = await connection.query('SELECT * FROM assistance WHERE user_id = ?', [userId]);
    return resultado
    
};

const RegistrarAsistente = async (assistance) => { 

    const assistanceToRegister = {
        event_id: assistance.eventId,
        user_id: assistance.userId,
        date: assistance.date
    }

    const event = (await eventService.getEvent(assistance.eventId))[0]

    //console.log(event)

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
    
        eventService.updateEvent(event.event_id, eventToUpdate)
        
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

    const assistanceToRegister ={
        event_id: assistance.eventId,
        user_id: assistance.userId,
        date: assistance.date
    }
    const sql = `UPDATE assistance SET ? WHERE assistance_id = ?`;
    const connection = await getConnection();
    connection.query(sql, [assistanceToRegister, asistenteId])
    console.log("Asistencia actualizada exitosamente ID:", asistenteId)
} 
const EliminarAsistente =  async (asistenteId) => { 
    const sql = `DELETE FROM assistance WHERE assistance_id = ?`;
    const connection = await getConnection();
    connection.query(sql, asistenteId)
    console.log("Asistencia eliminada exitosamente, ID:", asistenteId)
}


const CalcularAsistenciaDiaria = async (events) => {

    let dailyAssistance = {
        'Domingo': 0,
        'Lunes': 0,
        'Martes': 0,
        'Miercoles': 0,
        'Jueves': 0,
        'Viernes': 0,
        'Sabado': 0
    };

    events.forEach(event => {
        let day = moment(event.date).format('dddd');
        dailyAssistance[day] += event.assistance;
    });

    return dailyAssistance
}

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