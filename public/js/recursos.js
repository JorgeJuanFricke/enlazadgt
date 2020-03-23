function listaRecursos(tipo, categoria) {

    d3.event.preventDefault();
    let query = `?tipo=${tipo}&categoria=${categoria}`;


    d3.json('api/recursos' + query)
    .then(function(data) {

       d3.select("article").selectAll("div").remove();
       let filas = d3.select("#listaRecursos").selectAll("div.data")
           .data(data, function (d) {
                 return d._id;});


       let seleccionExit = filas.exit();
        seleccionExit.remove();

       let seleccionEnter = filas.enter();


        let fila = seleccionEnter.append("div")
            .attr("class", "data")
            .style("top", function(d,i) {return (40 + (i * 40)) + "px"});

        fila.append("span")
             .append("a")
             .attr("href", "#")
             .on("click", function(d) {
                muestraRecursoyEnlaces(d._id)
             })
             .text(function (d) {
                return d.nombre
             });

        fila.append("span")
            .append("a")
            .attr("href", "#")

            .on("click", function(d) {
                console.log(d);
                muestraEnlaza(d.tipo)
            })
            .text("EMLAZA");



    });
}




function muestraRecursoyEnlaces(recurso) {

    d3.event.preventDefault();
    d3.select("article").selectAll("div").remove();
    d3.json('api/recurso/' + recurso)
    .then(function(data) {
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
                    .text
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