let config = require('./configuracion.js');
//const createError = require('http-errors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const logger = require('morgan');


const app = express();

/**** directorios  ***************/
const fs = require('fs');
const dataDir = __dirname + '/upload';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);



/*** logger **********************/

app.use(logger('combined'));



/*******  body parsers ****************/

const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));





/********* mongo ******************/
const env = require('dotenv').config();
console.log(process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
    case 'desarrollo':
        try {
            db = mongoose.connect(config.desarrollo, {
                useNewUrlParser: true
            });
        } catch (error) {
            console.log(error);
        }
        break;

    case 'produccion':
        try {
            db = mongoose.connect(config.produccion, {
                useNewUrlParser: true
            });
        } catch (error) {
            console.log(error);
        }
        break;

    default:
        throw new Error('entorno de ejecución desconocido: ' + app.get('env'));
}







/****** express validator *****************/
const expressValidator = require('express-validator');
app.use(expressValidator());






/********** static ******************/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));







/********  handlebars ***********************/

const hbs = require('hbs');

app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'hbs');

hbs.create({
    defaultLayout: 'main'

});

const section = function (name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
};

hbs.registerHelper('section', section);



const isEqual = function (a, b, opts) {
    if (a == b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
};

hbs.registerHelper('if_eq', isEqual);


hbs.registerHelper('if_Propietario', function (usuario, autor, opts) {
    if (usuario && (usuario.admin || usuario.email === autor)) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
});



hbs.registerHelper('if_admin', function (usuario, options) {
    if (usuario && usuario.admin) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});



hbs.registerHelper("margen", (depth, options) => {
    return ('_'.repeat(parseInt(depth)));

});


hbs.registerHelper("espacio2Guion", (frase, options) => {
    return frase = frase.replace(" ", "-");

});


const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(hbs);



let vListaOpciones = require('./vistas/partials/vListaOpciones.hbs');
let vList = require('./vistas/partials/vList.hbs');
let vJumbotron = require('./vistas/partials/vJumbotron.hbs');
let vTexto = require('./vistas/partials/vTexto.hbs');
let vNorma = require('./vistas/partials/vNorma.hbs');
let vTasaSancion = require('./vistas/partials/vTasaSancion.hbs');
let vPersona = require('./vistas/partials/vPersona.hbs');

hbs.registerPartial('listaOpciones', vListaOpciones);
hbs.registerPartial('Texto', vTexto);
hbs.registerPartial('Norma', vNorma);
hbs.registerPartial('TasaSancion', vTasaSancion);
hbs.registerPartial('Persona', vPersona);
hbs.registerPartial('Lista', vList);
hbs.registerPartial('jumbotron', vJumbotron);



/*** usuario actual para handlebars *************/
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});



const jqupload = require('jquery-file-upload-middleware');
app.use('/upload', function (req, res, next) {

    jqupload.fileHandler({
        uploadDir: function () {
            return config.upLoadDir;
        },
        uploadUrl: function () {
            return config.upLoadUrl;
        }
    })(req, res, next);

    // enviar json (con nombre y path)
});





/****** routers *************************/
const recursosRouter = require('./rutas/rRecursos.js');
const indexRouter = require('./rutas/rIndex.js');
const adminRouter = require('./rutas/rAdmin.js');
const enlacesRouter = require('./rutas/rEnlaces');
const usuariosRouter = require('./rutas/rUsuarios');




app.use('/recurso', recursosRouter);
app.use('/admin', adminRouter);
app.use('/usuario', usuariosRouter);
app.use('/enlace', enlacesRouter);
app.use('/', indexRouter);



/****** error 404 *******************/
app.use(function (req, res, next) {
    let err = new Error('404: Not Found ' + req.originalUrl);
    if (req.xhr) {
        res.status(404).send({
            error: '404 not found!'
        });
    } else {
        err.status = 404;
        next(err);
    }

});


/********  error 500 ***************/
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'desarrollo' ? err : {};
    if (req.xhr) {
        //res.status(500).json({ error: err.message });
        // mandarlo a la pagina
        res.render('vError.hbs', {
            layout: null
        });
    } else {
        // render the error page
        res.status(err.status || 500);
        res.render('vError.hbs', {
            layout: null
        });

    }

});



module.exports = app;