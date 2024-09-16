const { getConnection } = require('../basededatos/mysql')
const UsuarioServices = require("../services/UsuarioServices")
const ExcelJS = require('exceljs');
const axios = require('axios');

const ObtenerEventos = async () => { 

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM events');
    return result

} 

const ObtenerEvento = async (eventoId) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM events WHERE event_id = ?', [eventoId]);
        // Verifica si rows contiene datos
        if (rows.length === 0) {
            throw new Error(`Evento con ID ${eventoId} no encontrado`);
        }

        return rows;
    } catch (error) {
        // Propaga el error al controlador
        throw error;
    }
};

const CrearEvento = async (event) => { 

    const sql = `INSERT INTO events SET ?`;

    const dateToday = Date.now();
    const date_time = new Date(dateToday)
    const user = await UsuarioServices.ObtenerUsuarioPorEmail(event.email);
    const coordenates = await getCoordenates(event.location)
    console.log(" event.date:", event.date)
    const eventToRegister = {
        user_id: user[0].user_id,
        name: event.name,
        description: event.description,
        created_date: date_time,
        location: coordenates[0] + ',' + coordenates [1],
        assistance: 0,
        event_date: event.date
    }

    const connection = await getConnection();
    connection.query(sql, eventToRegister)
    console.log("Evento creado exitosamente Evento:", eventToRegister)

} 

const CreacionMasivaEventos = async (file) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.worksheets[0];

    worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
      if (rowNumber !== 1) {  // Omitir la primera fila (encabezados)

        const dateToday = Date.now();
        const date_time = new Date(dateToday);
    
        const [emptydata, email, name, description, location, event_date] = row.values; 
        if (!email) {
         // console.warn(`Usuario no encontrado para el email: ${email} en la fila ${rowNumber}`);
          return;
        }

        const user = await UsuarioServices.ObtenerUsuarioPorEmail(email);
        
        if (!user || user.length === 0) {
          //console.warn(`Usuario no encontrado para el email: ${email} en la fila ${rowNumber}`);
          return;
        }

        //console.log("Usuario encontrado:", user[0]);

        const coordenates = await getCoordenates(location);

        const eventToRegister = {
            user_id: user[0].user_id,
            name,
            description,
            created_date: date_time,
            location: `${coordenates[0]},${coordenates[1]}`,
            assistance: 0,
            event_date
        };

        const connection = await getConnection();
        const sql = `INSERT INTO events SET ?`;
        connection.query(sql, [eventToRegister]);

        //console.log(`Evento registrado para el usuario ${user[0].user_id} en la fila ${rowNumber}`);
      }
    });
};

function FormatearFecha(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    
    // Crear una fecha con el último día del mes
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    
    // Ajustar el día si es mayor que el último día del mes
    const correctedDay = Math.min(day, lastDayOfMonth);

    // Devolver la fecha corregida en formato YYYY-MM-DD
    return `${year}-${String(month).padStart(2, '0')}-${String(correctedDay).padStart(2, '0')} 00:00:00`;
}

const ActualizarEvento = async (eventoId, event) => { 


    const dateToday = Date.now();
    const date_time = new Date(dateToday)
    const user = await UsuarioServices.ObtenerUsuarioPorEmail(event.email);
    const coordenates = await getCoordenates(event.location)
    
    if (event.user_id){

        const eventToRegister = {
            user_id: event.user_id,
            name: event.name,
            description: event.description,
            created_date: date_time,
            location: coordenates[0] + ',' + coordenates [1],
            assistance: event.assistance,
            event_date: event.event_date
        }

        const sql = `UPDATE events SET ? WHERE event_id = ?`;
        const connection = await getConnection();
        connection.query(sql, [eventToRegister, eventoId])
        console.log("Evento actualizado dentro del if exitosamente ID:", eventoId)
    } else {
        const fechaformateada = await FormatearFecha(event.date)
        const eventToRegister = {
            user_id: user[0].user_id,
            name: event.name,
            description: event.description,
            created_date: date_time,
            location: coordenates[0] + ',' + coordenates [1],
            assistance: 0,
            event_date: fechaformateada
        }

        const sql = `UPDATE events SET ? WHERE event_id = ?`;
        const connection = await getConnection();
        connection.query(sql, [eventToRegister, eventoId])
        console.log("Evento actualizado exitosamente ID:", eventoId)

    }
    



} 

const EliminarEvento =  async (eventoId) => { 
    const sql = `DELETE FROM events WHERE event_id = ?`;
    const connection = await getConnection();
    connection.query(sql, eventoId)
    console.log("Evento eliminado exitosamente, ID:", eventoId)
}

const getCoordenates = async (address) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
    const params = {
        access_token: process.env.MAPBOX_ACCESS_TOKEN
    };

    try {
        const response = await axios.get(url, { params });
        const lugar = response.data.features[0];
        return lugar.center;
    } catch (error) {
        console.error(error);
    }

}

const UbicacionesCercanas = async (lon, lat, range) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json`;
    const params = {
        proximity: `${lon},${lat}`,
        types: 'poi',
        limit: 10,
        radius: range,
        access_token: process.env.MAPBOX_ACCESS_TOKEN
    };

    try {
        const response = await axios.get(url, { params });
        return response.data.features;
    } catch (error) {
        console.error(error);
    }
}


const ObtenerUbicacionesCercanasAlEvento = async (coordenates, range) => {

    try {

        let listCoordenates = coordenates.split(',');
        let lon = parseFloat(listCoordenates[0]);
        let lat = parseFloat(listCoordenates[1]);
        const response = await UbicacionesCercanas(lon, lat, range)
        return response;
    } catch (error) {
        console.error(error);
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
    ObtenerUbicacionesCercanasAlEvento,
    FormatearFecha

}