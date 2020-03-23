
function muestraEnlaza(sujeto) {

    d3.event.preventDefault();
    // tenemos el tipo objeto con sus relaciones

    d3.json('api/categorias')
    .then(function(categorias) {
        let treeCategorias = d3.stratify()
            .id(function(d) { return d.codigo})
            .parentId(function(d) { return d.padre })(categorias);
        d3.select('#sujeto').property('value', sujeto._id);
        d3.select('#nombre').property('value', sujeto.nombre);
        //d3.select("#sujeto").val(sujeto._id);
        //d3.select("#nombre").val(sujeto.nombre);
        if (sujeto.tipo.tiposPermitidos.length > 0) {
           let select1 = d3.select('#relaciones');
            select1.on("change", muestraRecursosRelacion);
            select1.selectAll("option").remove();
            sujeto.tipo.tiposPermitidos.forEach(function (d, i) {
                select1.append('option').property("selected", i === 0)
                    .attr('value', d)
                    .text(d);
            });
            //select1.property("selected", function(d){ return d === ; })
            // $("#relaciones").find('option:eq(0)').prop('selected', true);

            let select2 = d3.select('#categorias');
            select2.selectAll("option").remove();
            select2.on("change", muestraRecursosRelacion);


            /*
            treeCategorias.forEach(function (i) {
                select2.append('option')
                .attr('value', i.data._id)
                .text((depth * " " ) + i.id);
            });
            */
            $('#modalEnlaza').modal('show');
        } else  {
            alert("No existen relaciones permitidas");
        }

    });

}




function muestraRecursosRelacion() {

    d3.event.preventDefault();

    //let categoria = $('#categorias').children("option:selected").val();
    let categoria = "dgt";
    let tipo = $("#relaciones").children("option:selected").val();
    let query = `?tipo=${tipo}&categoria=${categoria}`;
    d3.json('api/enlaza/recursos' + query)
    .then(function(recursos) {
        if (recursos.length === 0) {
            alert("No existen recursos")
        } else {
            let select3 = d3.select("#recursos");
            recursos.forEach(function (i) {
                select3.append('option')
                    .attr('value', i._id)
                    .text(i.nombre);
            });
        }

    });

}
