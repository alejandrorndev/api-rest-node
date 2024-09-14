const express = require("express");
const router = express.Router();
const usersController = require('../controllers/UsuarioController')
const authToken = require("../utils/Autenticacion")


router.post("/", usersController.registerUser)

router.post("/auth/login", usersController.login)

router.get("/", authToken,  usersController.getAllUsers)

router.get("/:userId", authToken, usersController.getUser)

router.put("/:userId", authToken, usersController.updateUser)

router.delete("/:userId", authToken, usersController.deleteUser);



module.exports = router;
