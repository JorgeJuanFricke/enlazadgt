function listaRecursos(tipo) {

    d3.event.preventDefault();
    let categoria = $('#categoria').children("option:selected").val();
    let tipo = tipo.codigo;
    let query = `?tipo=${tipo}&categoria=${categoria}`;
    // tal vez post para tipo y categoria y query para limits y skips

    d3.json('/recursos' + query)
        .then(function (data) {

            d3.select("article").selectAll("div").remove();
            let filas = d3.select("#listaRecursos").selectAll("div.data")
                .data(data, function (d) {
                    return d._id;
                });


            let seleccionExit = filas.exit();
            seleccionExit.remove();

            let seleccionEnter = filas.enter();


            let fila = seleccionEnter.append("div")
                .attr("class", "data")
                .style("top", function (d, i) {
                    return (40 + (i * 40)) + "px"
                });

            fila.append("span")
                .append("a")
                .attr("href", "#")
                .on("click", function (d) {
                    muestraRecursoyEnlaces(d)
                })
                .text(function (d) {
                    return d.nombre
                });

            fila.append("span")
                .append("a")
                .attr("href", "#")

                .on("click", function (d) {
                    console.log(d);
                    muestraEnlaza(d)
                })
                .text("ENL");

            fila.append("span")
                .append("a")
                .attr("href", "#")

                .on("click", function (d) {
                    console.log(d);
                    deleteRecurso(d)
                })
                .text("DEL");



        });
}




function muestraRecursoyEnlaces(data) {

    d3.event.preventDefault();
    d3.select("article").selectAll("div").remove();
    recurso = data.id
    d3.json('api/recurso/' + recurso)
        .then(function (data) {
            if (data) {

                let divRecurso = d3.select("article")
                    .append("div")
                    .attr("class", "divRecurso");


                let cabecera = divRecurso.append("div")
                    .attr("class", "card border-primary")
                    .append("div").attr("class", "card-header")
                    .append("h2").text(data.nombre).attr("class", "bg-success");

                let cuerpo = cabecera.append("div").attr("class", "card-body bg-light text-primary")
                    .append("h4").text(data.categoria);

                cuerpo.append("p").attr("class", "card-text")
                    .append("span").text(data.updatedAt)
                    .append("span").text(data.autor);

                cuerpo.append("br");
                cuerpo.append("p").html(data.descripcion);

                // eliminar enlaces y refencias anteriores??
                //d3.select("#Enlaces").selectAll("div").remove();

                cuerpo.append("div")
                    .append("h3")
                    .text("Enlaces")
                    .append("a")
                    .attr("class", "btn")
                    .attr("href", "#")
                    .attr("role", "button")
                    .attr("aria-expanded", false)

                    .on("click", function (d) {
                        muestraEnlaza(data)
                    })
                    .text("+");



                let color = d3.scaleOrdinal(d3.schemeCategory10);
                if (data.enlaces) {

                    // OBTENER GRUPOS Y ASIGNAR COLORES



                    let Enlaces = cuerpo.selectAll("span.Enlaces")
                        .data(data.enlaces, function (d) {
                            return d._id;
                        });


                    Enlaces.exit().remove();

                    Enlaces.enter().append("span.Enlaces")
                        .append("span")
                        .attr("class", "Enlaces")
                        .attr("background-color", function (d, i) {
                            return color(i);
                        })
                        .text("E")
                        .append("a")
                        .attr("href", "#")
                        .on("click", function (d) {
                            console.log(d);
                            muestraRecursoyEnlaces(d.objetoId);

                        })
                        //.attr("background-color", )
                        .attr("class", "badge badge-pill")
                        .text(function (d) {
                            return d.objetoTipo.sigla + " " + d.objetoNombre;
                        });

                }

                if (data.referencias) {
                    cuerpo.append("div")
                        .append("h3")
                        .text("Referencias");


                    let Referencias = cuerpo.selectAll("span.Referencias")
                        .data(data.referencias, function (d) {
                            return d._id;
                        });


                    Referencias.exit().remove();

                    Referencias.enter().append("span.Referencias")
                        .append("span")
                        .attr("class", "Referencias")
                        .attr("background-color", function (d, i) {
                            return color(i);
                        })
                        .text
                        .append("a")
                        .attr("href", "#")
                        .on("click", function (d) {
                            console.log(d);
                            muestraRecursoyEnlaces(d.sujetoId);

                        })
                        //.attr("background-color", )
                        .attr("class", "badge badge-pill")
                        .text(function (d) {

                            return d.sujetoTipo.sigla + " " + d.sujetoNombre;
                        });

                }
            }

        });

}



const editaRecurso = (recurso) => {
    fetch('http://localhost:3000/recurso:/' + recurso, {
            method: 'POST',
            headers: {
                'csrf-token': csrf
            }
        })
        .then(result => {
            return result.json();
        })
        .then(data => {

            var source = document.getElementById("templateRecurso").innerHTML;
            var template = Handlebars.compile(source);
            var html = template(data);

            document.getElementById("body").innerHTML = html;
            console.log(html);

        })
        .catch(err => {
            console.log(err);
        });
};


/*
function muestraRecursos() {
    let $recursos = $('article');
    let $template = $('#tptListaRecursos').html();
    let $tipo = $("#tipo").children("option:selected");
    let $categoria = $('#categoria').children("option:selected");


    $.get('/api', {
            tipo: $tipo.val(),
            categoria: $categoria.val()
        }, function (data, textStatus, jqXHR) {

            if (data.length > 0) {
                $templateRecursos = Handlebars.compile($template);
                $recursos.html($templateRecursos(data));
            } else
                $recursos.html('<h3>No existen registros</h3>');

        })
        .fail(function () {
            alert('error recuperando recursos')
        })

}
*/




const nuevoRecurso = (tipo) => {
    try {
        // tipo y categoria
        recurso.tipo = tipo.codigo;
        recurso.categoria = $('#categoria').children("option:selected").val();
        recurso.urlTipo = tipo.url;
        var source = document.getElementById("templateRecurso").innerHTML;
        var template = Handlebars.compile(source);
        var html = template(recurso);

        document.getElementById("body").innerHTML = html;
        console.log(html);

    } catch (err) {
        console.log(err);
    };
};


const borraRecurso = (data) => {
    // para input
    // delete solo admin
    // csrf-token en main?
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    const productElement = btn.closest('article');

    fetch('/admin/product/' + prodId, {
            method: 'DELETE',
            headers: {
                'csrf-token': csrf
            }
        })
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
            productElement.parentNode.removeChild(productElement);
        })
        .catch(err => {
            console.log(err);
        });
};