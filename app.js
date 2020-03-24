
let config = require('./configuracion.js');
//const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const setUpPassport = require("./handlers/setupPassport");
const app = express();

/**** directorios  ***************/
const fs = require('fs');
const dataDir = __dirname + '/upload';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);




/*** logger **********************/

app.use(logger('combined'));



/*******  body parser ****************/


app.use(bodyParser.urlencoded({ extended: true }));





/********* mongo ******************/
const env = require('dotenv').config();
console.log(process.env.NODE_ENV);

switch(process.env.NODE_ENV){
//switch(app.get('NODE_ENV')){

    case 'desarrollo':
        try {
            db = mongoose.connect(config.desarrollo, {useNewUrlParser: true});
        } catch (error) {
            console.log(error);
        }
        break;

    case 'produccion':
        try {
            db = mongoose.connect(config.produccion, {useNewUrlParser: true});
        } catch (error) {
            console.log(error);
        }
        break;

    default:
        throw new Error('entorno de ejecución desconocido: ' + app.get('env'));
}


/********** sesión *****************/

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
    resave: true,
    secret: 'foo19580518',
    store: new MongoStore({mongooseConnection: mongoose.connection}),
}));




/*********** autenticación passport **********/
const passport = require("passport");
setUpPassport();
app.use(passport.initialize());
app.use(passport.session());






/*** para producción ***
var sess = {
    secret: 'keyboard cat',
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
***************************************/





/****** express validator *****************/
const expressValidator = require('express-validator');
app.use(expressValidator());





app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/********** static ******************/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));







/********  handlebars ***********************/

const hbs = require('hbs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.create({
    defaultLayout:'main'

});

const section = function(name, options){
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
};

hbs.registerHelper('section', section);



const isEqual = function(a, b, opts) {
    if (a == b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
};

hbs.registerHelper('if_eq', isEqual);


hbs.registerHelper('if_Propietario', function(usuario, autor, opts) {
    if (usuario && (usuario.admin || usuario.email === autor)) {
       return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
});



hbs.registerHelper('if_admin', function(usuario, options) {
    if(usuario && usuario.admin) {
        return options.fn(this);}
    else {
        return options.inverse(this);}
});



hbs.registerHelper("margen", function(depth, options) {
    return ('_'.repeat(parseInt(depth)));

});




hbs.registerHelper('icono', function(options) {

        switch (options.fn(this)) {
        case '/texto/legal':
            return new hbs.SafeString('<i class="fas fa-balance-scale"></i>');

        case '/texto/texto':
            return new hbs.SafeString('<i class="fas fa-book"></i>');

        case '/procedimiento/tramiteConductores':
            return new hbs.SafeString('<i class="fas fa-address-card"></i>');

        case '/procedimiento/tramiteVehiculos':
            return new hbs.SafeString('<i class="fas fa-car"></i>');

        case '/procedimiento/info':
            return new hbs.SafeString('<i class="fas fa-desktop"></i>');

        case '/procedimiento/examinador':
            return new hbs.SafeString('<i class="fas fa-user-graduate"></i>');

        case '/procedimiento/agente':
            return new hbs.SafeString('<i class="fas fa-user"></i>');

        }

});

const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(hbs);



let vListaOpciones = require('./views/partials/vListaOpciones.hbs');
let vList = require('./views/partials/vList.hbs');
let vListaTipos = require('./views/partials/vListaTipos.hbs');
let vTexto = require('./views/partials/vTexto.hbs');
let vNorma = require('./views/partials/vNorma.hbs');
let vTasaSancion = require('./views/partials/vTasaSancion.hbs');
let vPersona = require('./views/partials/vPersona.hbs');
hbs.registerPartial('listaOpciones', vListaOpciones);
hbs.registerPartial('Texto', vTexto);
hbs.registerPartial('Norma', vNorma);
hbs.registerPartial('TasaSancion', vTasaSancion);
hbs.registerPartial('Persona', vPersona);
hbs.registerPartial('Lista', vList);
hbs.registerPartial('ListaTipos', vListaTipos);




/*** flash mensajes *********************/

const flash = require("express-flash");
app.use(flash());



/*** usuario actual para handlebars *************/
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/*** mensajes flash *************************/
app.use(function(req,res,next) {
    res.locals.errores = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

/**** anterior
// flash message middleware
app.use(function(req, res, next){
    // if there's a flash message, transfer
    // it to the context, then clear it
    res.locals.flash = req.session.flash;
    res.locals.logeado = req.session.user;
    delete req.session.flash;
    next();
});
****/

const jqupload = require('jquery-file-upload-middleware');
app.use('/upload', function(req, res, next) {

    jqupload.fileHandler(
        {
            uploadDir: function() {
                return  config.upLoadDir;
            },
            uploadUrl: function() {
                return config.upLoadUrl;
            }
        })(req, res, next);

    // enviar json (con nombre y path)
});





/****** routers *************************/
const recursosRouter = require('./rutas/rRecursos.js');
const indexRouter = require('./rutas/rIndex.js');
const apiRouter = require('./rutas/rApi.js');
const adminRouter = require('./admin/rAdmin.js');
const enlacesRouter = require('./rutas/rEnlaces');




app.use('/recurso', recursosRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter);



/****** error 404 *******************/
app.use(function (req, res, next) {
    let err = new Error('404: Not Found ' + req.originalUrl);
    if (req.xhr) {
        res.status(404).send({ error: '404 not found!' });
    } else {
        err.status = 404;
        next(err);
    }

});


/********  error 500 ***************/
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'desarrollo' ? err : {};
    if (req.xhr) {
        //res.status(500).json({ error: err.message });
        // mandarlo a la pagina
        res.render('vError.hbs', {layout: null});
    } else {
        // render the error page
        res.status(err.status || 500);
        res.render('vError.hbs', {layout: null});

    }

});



module.exports = app;
