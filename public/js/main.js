$(document).ready(function () {

    /*JUMBOTRON DE TIPOS

    //d3.json('/api/tipos')
    //    .then(function(data) {

    data = data.filter(function (d) {
        return d.padre !== null
    });
    
    let stratify = d3.stratify()
            .id(d => d.codigo)
            .parentId(d => d.padre);
    let root = stratify(data);
    

    let tiposNested = d3.nest()
        .key(function (d) {
            return (d.padre);
        }).sortKeys(d3.ascending)
        .entries(data);


    let tipos = tiposNested.filter(function (d) {
        return d.key !== "recurso"
    });
    console.log(tipos);

*/

    let jumbotron = d3.select("#jumbotron")
        .append("div")
        .attr("class", "accordion");

    let titulo = d3.selectAll("div.titulo")
        .data(res.locals.treeTipos)
        .enter()
        .append("div")
        .attr("class", "titulo");

    let boton = titulo.append("a")
        .attr("class", "btn btn-primary")
        .attr("data-toggle", "collapse")
        .attr("href", function (d) {
            return ("#" + d.key.replace(" ", "-"))
        })
        .attr("role", "button")
        .attr("aria-expanded", false)
        .attr("aria-controls", function (d) {
            return d.key.replace(" ", "-")
        })

        .attr("class", "data")
        .text(function (d) {
            return d.key
        });

    // colapside

    let colapside = titulo.append("ul")
        .attr("class", "collapse")
        .attr("id", function (d) {
            return d.key.replace(" ", "-")
        });



        
    let tipo = colapside.selectAll("li.tipo")
        .data(function (d) {
            return d.values
        })
        .enter()
        .append("li")
        .attr("class", "tipo");


    tipo.append("a")
        .attr("class", "lista-recursos")
        .attr("href", function (d) {
            return d.codigo
        })
        .on("click", function (d) {
            let categoria = $('#categoria').children("option:selected").val();
            listaRecursos(d.codigo, categoria)
        })
        .text(function (d) {
            return d.codigo
        });

    // NUEVO RECURSO
    tipo.append("span").append("a")
        .attr("class", "nuevoRecurso")
        .attr("href", function (d) {
            let categoria = $('#categoria').children("option:selected").val();
            return d.url + `?tipo=${d.codigo}&categoria=${categoria}`;
        })
        //.on("click", function(d) {nuevoRecurso(d.url, d._id)})
        .attr("i", "fas fa-pen-alt")
        .text("Nuevo");



    tipo.append("span").append("a")
        .attr("class", "update")
        .attr("href", "#")
        .on("click", function (d) {
            muestraTipo(d)
        })
        .attr("i", "fas fa-pen-alt")
        .text("update");

});









$(document).ready(function () {
    $("#login").click(function () {
        $('#modalLogin').modal({
            show: true
        })

    });
});









$(document).ready(function () {
    $('#categoria').on('change', function () {
        let categoria = $('#categoria').children("option:selected").val();
        let tipo = $('ul#tipos > li.selected a').val();
        let path = $("#tipos").children("option:selected").data("url");
        this.href = path + "?tipo=" + tipo + "categoria=" + categoria;
        $.get(url);

    });
});






$(document).ready(function () {
    $('#modalTipo').on("submit", function () {
        let tiposPermitidos = [];
        tiposPermitidos = $('#permitidos').val();
    });
});






/*** on submit texto *************************/
$(document).ready(function () {
    $('#texto').on('submit', function () {
        let texto = this.val();
        $("#texto").attr("action", "texto=" + texto);
    });
});