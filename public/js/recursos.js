listaRecursos = () => {
    let categoria = $("#categoria")
        .children("option:selected")
        .val();
    let tipo = $('#jumbotron li.selected a.recurso').text();;
    let query = `?tipo=${tipo}&categoria=${categoria}`;
    let pagina = "";

    // tal vez post para tipo y categoria y query para limits y skips

    d3.json("/recursos" + query).then(function (data) {
        d3.select("article")
            .selectAll("div")
            .remove();
        let filas = d3
            .select("#listaRecursos")
            .selectAll("div.data")
            .data(data, function (d) {
                return d._id;
            });

        let seleccionExit = filas.exit();
        seleccionExit.remove();

        let seleccionEnter = filas.enter();

        let fila = seleccionEnter
            .append("div")
            .attr("class", "data")
            .style("top", function (d, i) {
                return 40 + i * 40 + "px";
            });

        fila
            .append("span")
            .append("a")
            .attr("href", "#")
            .on("click", function (d) {
                muestraRecurso(d);
            })
            .text(function (d) {
                return d.nombre;
            });

        fila
            .append("span")
            .append("a")
            .attr("href", "#")

            .on("click", function (d) {
                console.log(d);
                enlazaRecurso(d);
            })
            .text("ENL");

        fila
            .append("span")
            .append("a")
            .attr("href", "#")

            .on("click", function (d) {
                console.log(d);
                borraRecurso(d);
            })
            .text("DEL");
    });
}

function muestraRecurso(recurso) {
    d3.event.preventDefault();
    d3.select("article")
        .selectAll("div")
        .remove();
    recurso = recurso.id;
    d3.json("api/recurso/" + recurso).then(function (data) {
        if (data) {
            let divRecurso = d3
                .select("article")
                .append("div")
                .attr("class", "divRecurso");

            let cabecera = divRecurso
                .append("div")
                .attr("class", "card border-primary")
                .append("div")
                .attr("class", "card-header")
                .append("h2")
                .text(data.nombre)
                .attr("class", "bg-success");

            let cuerpo = cabecera
                .append("div")
                .attr("class", "card-body bg-light text-primary")
                .append("h4")
                .text(data.categoria);

            cuerpo
                .append("p")
                .attr("class", "card-text")
                .append("span")
                .text(data.updatedAt)
                .append("span")
                .text(data.autor);

            cuerpo.append("br");
            cuerpo.append("p").html(data.descripcion);

            // eliminar enlaces y refencias anteriores??
            //d3.select("#Enlaces").selectAll("div").remove();

            cuerpo
                .append("div")
                .append("h3")
                .text("Enlaces")
                .append("a")
                .attr("class", "btn")
                .attr("href", "#")
                .attr("role", "button")
                .attr("aria-expanded", false)

                .on("click", function (d) {
                    muestraEnlaza(data);
                })
                .text("+");

            let color = d3.scaleOrdinal(d3.schemeCategory10);
            if (data.enlaces) {
                // OBTENER GRUPOS Y ASIGNAR COLORES

                let Enlaces = cuerpo
                    .selectAll("span.Enlaces")
                    .data(data.enlaces, function (d) {
                        return d._id;
                    });

                Enlaces.exit().remove();

                Enlaces.enter()
                    .append("span.Enlaces")
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
                cuerpo
                    .append("div")
                    .append("h3")
                    .text("Referencias");

                let Referencias = cuerpo
                    .selectAll("span.Referencias")
                    .data(data.referencias, function (d) {
                        return d._id;
                    });

                Referencias.exit().remove();

                Referencias.enter()
                    .append("span.Referencias")
                    .append("span")
                    .attr("class", "Referencias")
                    .attr("background-color", function (d, i) {
                        return color(i);
                    })
                    .text.append("a")
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

const postRecurso = (this) => {
    recurso = $(this).val();
    fetch("http://localhost:3000/recurso:/" + recurso, {
            method: "POST",
            headers: {
                "csrf-token": csrf
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

const putRecurso = () => {
    fetch("http://localhost:3000/recurso:/", {
            method: "PUT",
            headers: {
                "csrf-token": csrf
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

const nuevoRecurso = (this) => {
    try {
        // tipo y categoria
        recurso.tipo = $(this).val();
        recurso.categoria = $("#categoria")
            .children("option:selected")
            .val();
        recurso.urlTipo = $(this).data("url");

        var source = document.getElementById("templateRecurso").innerHTML;
        var template = Handlebars.compile(source);
        var html = template(recurso);

        document.getElementById("body").innerHTML = html;
        console.log(html);
    } catch (err) {
        console.log(err);
    }
};




const editaRecurso = (recurso) => {

    fetch('http://localhost:3000/recurso:/' + recurso, {
            method: 'GET',
            headers: {
                'csrf-token': csrf
            }
        })
        .then(result => {
            return result.json();
        })
        .then(recurso => {
            var source = document.getElementById("templateRecurso").innerHTML;
            var template = Handlebars.compile(source);
            var html = template(recurso);

            document.getElementById("body").innerHTML = html;
            console.log(html);
        }).catch(err) {
            console.log(err);
        }

};
const borraRecurso = (this) => {
    // para input
    // delete solo admin
    // csrf-token en main?
    let recurso = $(this).val();

    //const prodId = btn.parentNode.querySelector('[name=productId]').value;
    //const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    //const productElement = btn.closest('article');

    fetch("https://localhost:3000/recurso/" + recurso, {
            method: "DELETE",
            headers: {
                "csrf-token": csrf
            }
        })
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
            listaRecursos;
        })
        .catch(err => {
            console.log(err);
        });
};