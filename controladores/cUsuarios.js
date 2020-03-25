const {
    validationResult
} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../modelos/mUsuario");

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validación fallida.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const nombre = req.body.nombre;
    const password = req.body.password;
    try {
        const hashedPw = await bcrypt.hash(password, 12);

        const usuario = new Usuario({
            email: email,
            password: hashedPw,
            nombre: nombre
        });
        const result = await user.save();
        res.status(201).json({
            message: "Usuario creado!",
            usuarioId: result._id
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const usuario = await usuario.findOne({
            email: email
        });
        if (!usuario) {
            const error = new Error(`el usuario con email:${email} no existe`);
            error.statusCode = 401;
            throw error;
        }
        //UsuarioOK = usuario;
        const isEqual = await bcrypt.compare(password, usuario.password);
        if (!isEqual) {
            const error = new Error("password incorrecta!");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
                email: usuario.email,
                usuarioId: usuario._id.toString()
            },
            "primersabadocuarentena", {
                expiresIn: "1h"
            }
        );
        res
            .status(200)
            .json({
                token: token,
                usuarioId: loadedUser._id.toString()
            });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateUsuario = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.usuarioId);
        if (!usuario) {
            const error = new Error("Usuario no encontrado.");
            error.statusCode = 404;
            throw error;
        }

        usuario.permiso = permiso;
        await user.save();
        res.status(200).json({
            message: "Usuario actualizado."
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};