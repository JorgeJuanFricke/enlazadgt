
const jwt = require("jsonwebtoken");

exports.esAutenticado = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("No autenticado.");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "primersabadocuarentena");
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error("No autenticado.");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};

exports.esAutorizadoAñadir = (req, res, next) => {
    // if tipo.permiso === usuario.permiso || usuario.permiso === "ADMIN" 
    // next()
    // else throw ERROR NO AUTORIZADO
    next();
}

exports.esAutorizadoEditar = (req, res, next) => {
    // if recurso.autor = usuario.email || usuario.permiso === "ADMIN"
    // next()
    // else throw ERROR NO AUTORIZADO
    next();

}