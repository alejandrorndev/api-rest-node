const { getConnection } = require("../basededatos/mysql");
const bcrypt = require("../utils/CifrarContrasena");
const jwt = require("jsonwebtoken");

const ObtenerUsuarios = async () => {
  const connection = await getConnection();
  const result = await connection.query("SELECT * FROM users");
  return result;
};

const ObtenerUsuario = async (usuarioId) => {
  const connection = await getConnection();
  const result = await connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    [usuarioId]
  );
  return result;
};

const ObtenerUsuarioPorEmail = async (email) => {
  const connection = await getConnection();
  const result = await connection.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return result;
};

const RegistrarUsuario = async (user) => {
  const { email, password, name } = user;

  const date = Date.now();
  const date_time = new Date(date);

  const userExist = await ObtenerUsuarioPorEmail(email);

  if (userExist.length === 0) {
    const userRegistered = {
      email,
      password: await bcrypt.encrypt(password),
      name,
      registration_date: date_time,
    };

    const sql = `INSERT INTO users SET ?`;
    const connection = await getConnection();
    connection.query(sql, userRegistered);
    return userRegistered;
  }
  return "El usuario ya existe";
};

const InicioDeSesion = async (user) => {
  const { email, password } = user;

  const databaseUser = await ObtenerUsuarioPorEmail(email);

  if (databaseUser) {
    const validPassword = bcrypt.compare(password, databaseUser[0].password);

    if (validPassword) {
      const accessToken = jwt.sign(
        {
          name: user.name,
          id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
      );

      const refreshToken = jwt.sign(
        {
          name: user.name,
          id: user._id,
        },
        process.env.REFRESH_TOKEN_SECRET
      );
      return { accessToken, refreshToken };
    }
    return "Contraseña incorrecta";
  }
  return "Usuario no encontrado";
};

const ActualizarUsuario = async (usuarioId, user) => {
  const databaseUser = await ObtenerUsuarioPorEmail(user.email);
  
  const userRegistered = {
    user_id: usuarioId,
    email: user.email,
    password: await bcrypt.encrypt(user.password),
    name: user.name,
    registration_date: databaseUser[0].registration_date,
  };

  const sql = `UPDATE users SET ? WHERE user_id = ?`;
  const connection = await getConnection();
  connection.query(sql, [userRegistered, usuarioId]);
  console.log("Usuario actualizado exitosamente ID:", usuarioId);
};

const EliminarUsuario = async (usuarioId) => {
  const connection = await getConnection();

  try {
    // Paso 1: Verificar si el usuario existe
    const verificarUsuarioSql = `SELECT COUNT(*) AS count FROM users WHERE user_id = ?`;
    const resultadoVerificacion = await connection.query(verificarUsuarioSql, [usuarioId]);
    //console.log("resultadoVerificacion",resultadoVerificacion)
    if (!Array.isArray(resultadoVerificacion) || resultadoVerificacion.length === 0 || resultadoVerificacion[0].count === undefined) {
      return { error: `No se pudo verificar la existencia del usuario con ID ${usuarioId}` };
    }

    const count  = resultadoVerificacion[0];
    if (count === 0) {
      return { error: `Usuario con ID ${usuarioId} no encontrado` };
    }

    // Paso 2: Eliminar el usuario si existe
    const eliminarUsuarioSql = `DELETE FROM users WHERE user_id = ?`;
    await connection.query(eliminarUsuarioSql, [usuarioId]);

    return { status: "OK", message: "Usuario eliminado exitosamente" };

  } catch (error) {
    // Manejar el error sin lanzarlo, devolviendo un mensaje adecuado
    return { error: 'Error interno del servidor' };
  }
};



module.exports = {
  ObtenerUsuarios,
  ObtenerUsuarioPorEmail,
  ObtenerUsuario,
  RegistrarUsuario,
  ActualizarUsuario,
  EliminarUsuario,
  InicioDeSesion,
};
