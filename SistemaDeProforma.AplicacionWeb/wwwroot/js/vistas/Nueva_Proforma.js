// ---------------------------------------------------SECCION PARA TENER EL TIPO DE PROFORMA
$(document).ready(function () {

    

    fetch("/Proformar/ListaTipoProforma")
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {
            if (responseJson.length > 0) {
                responseJson.forEach((item) => {
                    $("#cboTipoProforma").append(
                        $("<option>").val(item.idTipoProforma).text(item.descripcion)
                    )
                    
                })
            }
        })

    // Define a variable to store the previous value of #txtCodigoInfima
    let previousTxtCodigoInfimaValue;

    const selectElement = document.getElementById('cboTipoProforma');
    selectElement.addEventListener('change', function () {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const selectedText = selectedOption.text;

        console.log('Selected Text:', selectedText);

        if (selectedText === "General" || selectedText === "Subasta") {
            // Store the previous value before setting it to 0
            previousTxtCodigoInfimaValue = $("#txtCodigoInfima").val();
            $("#txtCodigoInfima").val(0);
        } else {
            // If not "General" or "Subasta", restore the previous value
            if (previousTxtCodigoInfimaValue !== undefined) {
                $("#txtCodigoInfima").val(previousTxtCodigoInfimaValue);
            }
        }
    });


    limitInputLength('txtCvpGMC', 44);
    limitInputLength('txtCvpIMS', 44);
    limitInputLength('txtCvpGER', 44);
    limitInputLength('txtFpagoGMC', 42);
    limitInputLength('txtFpagoIMS', 42);
    limitInputLength('txtFpagoGER', 42);
    limitInputLength('txtCtecnicaGMC', 36);
    limitInputLength('txtCtecnicaIMS', 36);
    limitInputLength('txtCtecnicaGER', 36);
    limitInputLength('txtTentregaGMC', 62);
    limitInputLength('txtTentregaIMS', 62);
    limitInputLength('txtTentregaGER', 62);
    limitInputLength('txtObservacionGMC', 500);
    limitInputLength('txtObservacionIMS', 500);
    limitInputLength('txtObservacionGER', 500);
    limitInputLength('prueba', 6);
    limitInputLength('txtCodigoInfima', 5);
})

function limitInputLength(inputId, maxLength) {
    $('#' + inputId).on('input', function () {
        if ($(this).val().length > maxLength) {
            $(this).val($(this).val().substring(0, maxLength));
            toastr.warning("Pasaste el límite de caracteres", "");
        }
    });
}

$(document).on("select2:open", function () {
    document.querySelector(".select2-search__field").focus();
})



//---------------------------------SECCION PARA BUSCAR EL HOSPITAL, OBTENER INFORMACION Y RELLENAR LA PROFORMA

$("#cboBuscarHospital").select2({
    ajax: {
        url:"/Proformar/ObtenerHospital",
        dataType: 'json',
        contentType:"application/json;charset=utf-8",
        delay: 250,
        data: function (params) {
            return {
                pesquisa: params.term, // search term

            };
        },
        processResults: function (data) {

            return {
                results: data.map((item) => (
                    {
                        id:item.idHospital,
                        text:item.hospital1,
                        ruc: item.ruc,
                        direccion: item.direccion,
                        canton: item.canton

                    }
                ))
                
            };
        }
    },
    language:"es",
    placeholder: 'Buscar Hospital...',
    minimumInputLength: 1,
    templateResult: formatoResultados
    
});

//---------------------------------SECCION PARA MOSTRAR EL CONTENIDO CUANDO BUSCAS UN HOSPITAL
function formatoResultados(data) {

    if (data.loading)
        return data.text;

    var contenedor = $(
        `<table width="100%">
            <tr>
                <td>
                    <p style="font-weight:bolder;margin:2px">${data.text}</p>
                    <p style="margin:2px">${data.ruc}</p>
                </td>
            </tr>
        </table>`
    );

    return contenedor;
}
$(document).on("select2:open", function () {
    document.querySelector(".select2-search__field").focus();
})

//---------------------------------SECCION PARA PONER INFORMACION EN LOS TEXTBOX CUANDO SELECCION UN HOSPITAL

$("#cboBuscarHospital").on("select2:select", function (e) {
    const data = e.params.data;
    const d = new Date();
    let year = d.getFullYear();

    console.log(data)
    $("#txtRuc").val(data.ruc)
    $("#txtRazonSocial").val(data.text)
    $("#txtCanton").val(data.canton)
    $("#txtDireccion").val(data.direccion)
    const cod_inf = data.ruc + "-" + year + "-"  
    $("#cboCodigoInfima").text(`${cod_inf}`)

    $("#cboBuscarHospital").val("").trigger("change")
})





/*---------------------------------------------------SECCION PARA BUSCAR EL PRODUCTO, PONER INFORMACION, Y RELLENAR LA TABLA */
/*-----BUSCADOR-PARA-LAS-3-PROFORMAS-----*/
$("#cboBuscarProducto").select2({
    ajax: {
        url: "/Proformar/ObtenerProductos",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        delay: 250,
        data: function (params) {
            return {
                busqueda: params.term, // search term

            };
        },
        processResults: function (data) {

            return {
                results: data.map((item) => (
                    {
                        id: item.idProducto,
                        cpcvalor: item.cpcvalor,
                        text: item.medicamento,
                        ff: item.ff,
                        concentracion: item.concentracion,
                        presentacion: item.presentacion,
                        iva: item.iva,
                        cum: item.cum


                    }
                ))
                
            };
        }
    },
    language: "es",
    placeholder: 'Buscar Producto...',
    minimumInputLength: 1,
    templateResult: formatoProductosResultados

});
/*-----BUSCADOR-PARA-PROFORMA-GMC-----*/
$("#cboBuscarProductoGMC").select2({
    ajax: {
        url: "/Proformar/ObtenerProductos",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        delay: 250,
        data: function (params) {
            return {
                busqueda: params.term, // search term

            };
        },
        processResults: function (data) {

            return {
                results: data.map((item) => (
                    {
                        id: item.idProducto,
                        cpcvalor: item.cpcvalor,
                        text: item.medicamento,
                        ff: item.ff,
                        concentracion: item.concentracion,
                        presentacion: item.presentacion,
                        iva: item.iva,
                        cum: item.cum

                    }
                ))

            };
        }
    },
    language: "es",
    placeholder: 'Buscar Producto...',
    minimumInputLength: 1,
    templateResult: formatoProductosResultados

});
/*-----BUSCADOR-PARA-PROFORMA-IMS-----*/
$("#cboBuscarProductoIMS").select2({
    ajax: {
        url: "/Proformar/ObtenerProductos",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        delay: 250,
        data: function (params) {
            return {
                busqueda: params.term, // search term

            };
        },
        processResults: function (data) {

            return {
                results: data.map((item) => (
                    {
                        id: item.idProducto,
                        cpcvalor: item.cpcvalor,
                        text: item.medicamento,
                        ff: item.ff,
                        concentracion: item.concentracion,
                        presentacion: item.presentacion,
                        iva: item.iva,
                        cum: item.cum


                    }
                ))

            };
        }
    },
    language: "es",
    placeholder: 'Buscar Producto...',
    minimumInputLength: 1,
    templateResult: formatoProductosResultados

});
/*-----BUSCADOR-PARA-PROFORMA-GER-----*/
$("#cboBuscarProductoGER").select2({
    ajax: {
        url: "/Proformar/ObtenerProductos",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        delay: 250,
        data: function (params) {
            return {
                busqueda: params.term, // search term

            };
        },
        processResults: function (data) {

            return {
                results: data.map((item) => (
                    {
                        id: item.idProducto,
                        cpcvalor: item.cpcvalor,
                        text: item.medicamento,
                        ff: item.ff,
                        concentracion: item.concentracion,
                        presentacion: item.presentacion,
                        iva: item.iva,
                        cum: item.cum


                    }
                ))

            };
        }
    },
    language: "es",
    placeholder: 'Buscar Producto...',
    minimumInputLength: 1,
    templateResult: formatoProductosResultados

});

/*FUNCION PARA MOSTRAR LOS DATOS AL BUSCAR UN PRODUCTO*/
function formatoProductosResultados(data) {

    if (data.loading)
        return data.text;

    var deposito = $(
        `<table width="100%">
            <tr>
                <td>
                    <p style="font-weight:bolder;margin:2px">${data.text}</p>
                    <p style="margin:2px">${data.ff}</p>
                    <p style="margin:2px">${data.concentracion}</p>
                    <p style="margin:2px">${data.presentacion}</p>
                </td>
            </tr>
        </table>`
    );

    return deposito;
}


/*---------------------------------------------------REGION 3 EMPRESAS PARA INGRESAR PRODUCTOS */
let ProductosParaProformaA = [];
let ProductosParaProformaB = [];
let ProductosParaProformaC = [];
$("#cboBuscarProducto").on("select2:select", function (e) {
    const data = e.params.data; 
  
    let producto_encontradoGMC = ProductosParaProformaA.filter(p => p.idProducto == data.id)
    if (producto_encontradoGMC.length>0) {
        $("#cboBuscarProducto").val("").trigger("change")
        toastr.warning("", "El producto ya fue agregado")
        return false
    }
    let producto_encontradoIMS = ProductosParaProformaB.filter(p => p.idProducto == data.id)
    if (producto_encontradoIMS.length > 0) {
        $("#cboBuscarProducto").val("").trigger("change")
        toastr.warning("", "El producto ya fue agregado")
        return false
    }
    let producto_encontradoGER = ProductosParaProformaC.filter(p => p.idProducto == data.id)
    if (producto_encontradoGER.length > 0) {
        $("#cboBuscarProducto").val("").trigger("change")
        toastr.warning("", "El producto ya fue agregado")
        return false
    }

    swal.fire({
        title: "Agrege la Información",
        text: data.text,
        html:
            
            '<input type="text" id="inputField2" class="swal2-input" placeholder="CANTIDAD">' +
            '<input type="text" id="inputField3" class="swal2-input" placeholder="PRECIO GMC">' +
            '<input type="text" id="inputField4" class="swal2-input" placeholder="PRECIO IMSUMED">' +
            '<input type="text" id="inputField5" class="swal2-input" placeholder="PRECIO GERMEDIC">',
        confirmButtonClass: "btn-success",
        cancelButtonText: "No Ingresar Producto",
        confirmButtonText: "Ingresar Producto",
        showCancelButton: true,
        closeOnCancel: true,
        preConfirm: function () {
            
            const cant = document.getElementById('inputField2');
            const pregmc = document.getElementById('inputField3');
            const preims = document.getElementById('inputField4');
            const preger = document.getElementById('inputField5');


            
            const cantvalor = cant.value;
            const pregmcvalor = pregmc.value;
            const preimsvalor = preims.value;
            const pregervalor = preger.value;


           
            if (cantvalor === false) return false;
            if (pregmcvalor === false) return false;
            if (preimsvalor === false) return false;
            if (pregervalor === false) return false;


            
            if (cantvalor === "") {
                toastr.warning("", "Necesita ingresar la cantidad")
                return false;
            }
            if (pregmcvalor === "") {
                toastr.warning("", "Necesita ingresar el precio gmc")
                return false;
            }
            if (preimsvalor === "") {
                toastr.warning("", "Necesita ingresar el precio de imsumed")
                return false;
            }
            if (pregervalor === "") {
                toastr.warning("", "Necesita ingresar el precio de germedic")
                return false;
            }


            if (isNaN(parseInt(cantvalor))) {
                toast.warning("", "Debe ingresar un valor numerico")
                return false;
            }
            if (isNaN(parseFloat(pregmcvalor))) {
                toast.warning("", "Debe ingresar un precio gmc en numeros")
                return false;
            }
            if (isNaN(parseFloat(preimsvalor))) {
                toast.warning("", "Debe ingresar un precio imsumed en numeros")
                return false;
            }
            if (isNaN(parseFloat(pregervalor))) {
                toast.warning("", "Debe ingresar un precio germedic en numeros")
                return false;
            }

            let producto = {
                idProducto: data.id,
                cpc: data.cpcvalor,
                medicamento: data.text.toString(),
                ff: data.ff.toString(),
                dc: (data.text).toString() + "-" + (data.ff).toString() + "-" + (data.concentracion).toString() + "-" + (data.presentacion).toString(),
                fc: (data.ff).toString() + "-" + (data.concentracion).toString(),
                concentracion: data.concentracion.toString(),
                presentacion: data.presentacion.toString(),
                iva: data.iva.toString(),
                cantidad: parseInt(cantvalor),
                precioGmc: parseFloat(pregmcvalor).toString(),
                precioIms: parseFloat(preimsvalor).toString(),
                precioGer: parseFloat(pregervalor).toString(),
                totalUgmc: (parseFloat(pregmcvalor) * parseInt(cantvalor)).toString(),
                totalUims: (parseFloat(preimsvalor) * parseInt(cantvalor)).toString(),
                totalUger: (parseFloat(pregervalor) * parseInt(cantvalor)).toString(),
                cum: data.cum
            }

            ProductosParaProformaA.push(producto)
            ProductosParaProformaB.push(producto)
            ProductosParaProformaC.push(producto)

            mostrarProducto_Precios();
            $("#cboBuscarProducto").val("").trigger("change")

            
        }
    })

})

function mostrarProducto_Precios() {

    let subtotal = 0;
    let iva = 0;
    let total = 0;
    $("#tbProducto tbody").html("")

    ProductosParaProformaA.forEach((item) => {

        subtotal = subtotal + parseFloat(item.totalUgmc)
        iva = iva + (parseFloat(item.totalUgmc) * parseFloat(item.iva) )
        total = subtotal + iva
        $("#tbProducto tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProducto", item.idProducto)
                ),
                $("<td>").text(item.cantidad),
                $("<td>").text(item.medicamento),
                $("<td>").text(item.ff),
                $("<td>").text(item.concentracion),
                $("<td>").text(item.presentacion),
                $("<td>").text(item.iva),
                $("<td>").text(item.precioGmc),
                $("<td>").text(item.totalUgmc)
            )

        )
    })
    $("#txtSubTotalGMC").val(subtotal.toFixed(4))
    $("#txtIVAGMC").val(iva.toFixed(4))
    $("#txtTotalGMC").val(total.toFixed(4))

    ///*------imsumed---------------*/

    let subtotalims = 0;
    let ivaims = 0;
    let totalims = 0;
    $("#tbimsProducto tbody").html("")

    ProductosParaProformaB.forEach((item) => {

        subtotalims = subtotalims + parseFloat(item.totalUims)
        ivaims = ivaims + (parseFloat(item.totalUims) * parseFloat(item.iva))
        totalims = subtotalims + ivaims
        $("#tbimsProducto tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProducto", item.idProducto)
                ),
                $("<td>").text(item.medicamento),
                $("<td>").text(item.fc),
                $("<td>").text(item.presentacion),
                $("<td>").text(item.iva),
                $("<td>").text(item.precioIms),
                $("<td>").text(item.cantidad),
                $("<td>").text(item.totalUims)

            )

        )
    })
    $("#txtSubTotalIMS").val(subtotalims.toFixed(4))
    $("#txtIVAIMS").val(ivaims.toFixed(4))
    $("#txtTotalIMS").val(totalims.toFixed(4))

    ///*------germedic---------------*/

    let subtotalger = 0;
    let ivager = 0;
    let totalger = 0;
    $("#tbgerProducto tbody").html("")

    ProductosParaProformaC.forEach((item) => {

        subtotalger = subtotalger + parseFloat(item.totalUger)
        ivager = ivager + (parseFloat(item.totalUger) * parseFloat(item.iva))
        totalger = subtotalger + ivager
        $("#tbgerProducto tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProducto", item.idProducto)
                ),
                $("<td>").text(item.dc),
                $("<td>").text(item.cantidad),
                $("<td>").text(item.precioGer),
                $("<td>").text(item.iva),
                $("<td>").text(item.totalUger)

            )

        )
    })
    $("#txtSubTotalGER").val(subtotalger.toFixed(4))
    $("#txtIVAGER").val(ivager.toFixed(4))
    $("#txtTotalGER").val(totalger.toFixed(4))

}

/*---------------------------------------------------REGION GMC PARA INGRESAR PRODUCTOS */
let ProductosParaProformaGMC = [];
$("#cboBuscarProductoGMC").on("select2:select", function (e) {
    const data = e.params.data;

    let producto_encontrado = ProductosParaProformaGMC.filter(p => p.idProducto == data.id)
    if (producto_encontrado.length > 0) {
        $("#cboBuscarProductoGMC").val("").trigger("change")
        toastr.warning("", "El producto ya fue agregado")
        return false
    }

    swal.fire({
        title: "Agrege la Informacion",
        text: data.text,
        html:
           
            '<input type="text" id="inputField7" class="swal2-input" placeholder="CANTIDAD">' +
            '<input type="text" id="inputField8" class="swal2-input" placeholder="PRECIO GMC">' ,
        confirmButtonClass: "btn-success",
        cancelButtonText: "No Ingresar Producto",
        confirmButtonText: "Ingresar Producto",
        showCancelButton: true,
        closeOnCancel: true,
        preConfirm: function () {
            
            const cant = document.getElementById('inputField7');
            const pregmc = document.getElementById('inputField8');



           
            const cantvalor = cant.value;
            const pregmcvalor = pregmc.value;



           
            if (cantvalor === false) return false;
            if (pregmcvalor === false) return false;



            
            if (cantvalor === "") {
                toastr.warning("", "Necesita ingresar la cantidad")
                return false;
            }
            if (pregmcvalor === "") {
                toastr.warning("", "Necesita ingresar el precio gmc")
                return false;
            }



            if (isNaN(parseInt(cantvalor))) {
                toast.warning("", "Debe ingresar un valor numerico")
                return false;
            }
            if (isNaN(parseFloat(pregmcvalor))) {
                toast.warning("", "Debe ingresar un precio gmc en numeros")
                return false;
            }


            let producto = {
                idProducto: data.id,
                cpc: data.cpcvalor,
                medicamento: data.text.toString(),
                ff: data.ff.toString(),
                dc: (data.text).toString() + "-" + (data.ff).toString() + "-" + (data.concentracion).toString() + "-" + (data.presentacion).toString(),
                fc: (data.ff).toString() + "-" + (data.concentracion).toString(),
                concentracion: data.concentracion.toString(),
                presentacion: data.presentacion.toString(),
                iva: data.iva.toString(),
                cantidad: parseInt(cantvalor),
                precioGmc: parseFloat(pregmcvalor).toString(),
                precioIms: "0",
                precioGer: "0",
                totalUgmc: (parseFloat(pregmcvalor) * parseInt(cantvalor)).toString(),
                totalUims: "0",
                totalUger: "0",
                cum: data.cum
            }

            ProductosParaProformaGMC.push(producto)
            mostrarProducto_PreciosGMC();
            
            $("#cboBuscarProductoGMC").val("").trigger("change")


        }
    })

})

function mostrarProducto_PreciosGMC() {

    let subtotalGMC = 0;
    let ivaGMC = 0;
    let totalGMC = 0;
    $("#tbProducto tbody").html("")

    ProductosParaProformaGMC.forEach((item) => {

        subtotalGMC = subtotalGMC + parseFloat(item.totalUgmc)
        ivaGMC = ivaGMC + (parseFloat(item.totalUgmc) * parseFloat(item.iva))
        totalGMC = subtotalGMC + ivaGMC
        $("#tbProducto tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProducto", item.idProducto)
                ),
                $("<td>").text(item.cantidad),
                $("<td>").text(item.medicamento),
                $("<td>").text(item.ff),
                $("<td>").text(item.concentracion),
                $("<td>").text(item.presentacion),
                $("<td>").text(item.iva),
                $("<td>").text(item.precioGmc),
                $("<td>").text(item.totalUgmc)
            )

        )
    })
    $("#txtSubTotalGMC").val(subtotalGMC.toFixed(4))
    $("#txtIVAGMC").val(ivaGMC.toFixed(4))
    $("#txtTotalGMC").val(totalGMC.toFixed(4))
}

/*---------------------------------------------------REGION IMSUMED PARA INGRESAR PRODUCTOS */

let ProductosParaProformaIMS = [];
$("#cboBuscarProductoIMS").on("select2:select", function (e) {
    const data = e.params.data;

    let producto_encontrado = ProductosParaProformaIMS.filter(p => p.idProducto == data.id)
    if (producto_encontrado.length > 0) {
        $("#cboBuscarProductoIMS").val("").trigger("change")
        toastr.warning("", "El producto ya fue agregado")
        return false
    }

    swal.fire({
        title: "Agrege la Informacion",
        text: data.text,
        html:
            
            '<input type="text" id="inputField10" class="swal2-input" placeholder="CANTIDAD">' +
            '<input type="text" id="inputField11" class="swal2-input" placeholder="PRECIO IMSUMED">',
        confirmButtonClass: "btn-success",
        cancelButtonText: "No Ingresar Producto",
        confirmButtonText: "Ingresar Producto",
        showCancelButton: true,
        closeOnCancel: true,
        preConfirm: function () {
            
            const cant = document.getElementById('inputField10');
            const preims = document.getElementById('inputField11');



           
            const cantvalor = cant.value;
            const preimsvalor = preims.value;



           
            if (cantvalor === false) return false;
            if (preimsvalor === false) return false;



            
            if (cantvalor === "") {
                toastr.warning("", "Necesita ingresar la cantidad")
                return false;
            }
            if (preimsvalor === "") {
                toastr.warning("", "Necesita ingresar el precio imsumed")
                return false;
            }



            if (isNaN(parseInt(cantvalor))) {
                toast.warning("", "Debe ingresar un valor numerico")
                return false;
            }
            if (isNaN(parseFloat(preimsvalor))) {
                toast.warning("", "Debe ingresar un precio imsumed en numeros")
                return false;
            }

            //mi lead es que cuando cambio Proformagmc o ims a proforma si sale pero no se guarda las cosas.
            let producto = {
                idProducto: data.id,
                cpc: data.cpcvalor,
                medicamento: data.text.toString(),
                ff: data.ff.toString(),
                concentracion: data.concentracion.toString(),
                presentacion: data.presentacion.toString(),
                iva: data.iva.toString(),
                cantidad: parseInt(cantvalor),
                precioIms: parseFloat(preimsvalor).toString(),
                precioGmc: "0",
                precioGer: "0",
                totalUims: (parseFloat(preimsvalor) * parseInt(cantvalor)).toString(),
                totalUgmc: "0",
                totalUger: "0",
                fc: (data.ff).toString() + "-" + (data.concentracion).toString(),
                dc: (data.text).toString() + "-" + (data.ff).toString() + "-" + (data.concentracion).toString() + "-" + (data.presentacion).toString(),  
                cum: data.cum
            }

            ProductosParaProformaIMS.push(producto)

            mostrarProducto_PreciosIMS();
            $("#cboBuscarProductoIMS").val("").trigger("change")


        }
    })

})

function mostrarProducto_PreciosIMS() {

    let subtotalims = 0;
    let ivaims = 0;
    let totalims = 0;
    $("#tbimsProducto tbody").html("")

    ProductosParaProformaIMS.forEach((item) => {

        subtotalims = subtotalims + parseFloat(item.totalUims)
        ivaims = ivaims + (parseFloat(item.totalUims) * parseFloat(item.iva))
        totalims = subtotalims + ivaims
        $("#tbimsProducto tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProducto", item.idProducto)
                ),
                $("<td>").text(item.medicamento),
                $("<td>").text(item.fc),
                $("<td>").text(item.presentacion),
                $("<td>").text(item.iva),
                $("<td>").text(item.precioIms),
                $("<td>").text(item.cantidad),
                $("<td>").text(item.totalUims)

            )

        )
    })
    $("#txtSubTotalIMS").val(subtotalims.toFixed(4))
    $("#txtIVAIMS").val(ivaims.toFixed(4))
    $("#txtTotalIMS").val(totalims.toFixed(4))
}

/*---------------------------------------------------REGION GERMEDIC PARA INGRESAR PRODUCTOS */

let ProductosParaProformaGER = [];
$("#cboBuscarProductoGER").on("select2:select", function (e) {
    const data = e.params.data;

    let producto_encontrado = ProductosParaProformaGER.filter(p => p.idProducto == data.id)
    if (producto_encontrado.length > 0) {
        $("#cboBuscarProductoGER").val("").trigger("change")
        toastr.warning("", "El producto ya fue agregado")
        return false
    }

    swal.fire({
        title: "Agrege la Informacion",
        text: data.text,
        html:
           
            '<input type="text" id="inputField13" class="swal2-input" placeholder="CANTIDAD">' +
            '<input type="text" id="inputField14" class="swal2-input" placeholder="PRECIO GERMEDIC">',
        confirmButtonClass: "btn-success",
        cancelButtonText: "No Ingresar Producto",
        confirmButtonText: "Ingresar Producto",
        showCancelButton: true,
        closeOnCancel: true,
        preConfirm: function () {
         
            const cant = document.getElementById('inputField13');
            const preger = document.getElementById('inputField14');



           
            const cantvalor = cant.value;
            const pregervalor = preger.value;



            
            if (cantvalor === false) return false;
            if (pregervalor === false) return false;



            
            if (cantvalor === "") {
                toastr.warning("", "Necesita ingresar la cantidad")
                return false;
            }
            if (pregervalor === "") {
                toastr.warning("", "Necesita ingresar el precio germedic")
                return false;
            }



            if (isNaN(parseInt(cantvalor))) {
                toast.warning("", "Debe ingresar un valor numerico")
                return false;
            }
            if (isNaN(parseFloat(pregervalor))) {
                toast.warning("", "Debe ingresar un precio germedic en numeros")
                return false;
            }


            let producto = {
                idProducto: data.id,
                cpc: data.cpcvalor,
                medicamento: data.text.toString(),
                ff: data.ff.toString(),
                dc: (data.text).toString() + "-" + (data.ff).toString() + "-" + (data.concentracion).toString() + "-" + (data.presentacion).toString(),
                fc: (data.ff).toString() + "-" + (data.concentracion).toString(),
                concentracion: data.concentracion.toString(),
                presentacion: data.presentacion.toString(),
                iva: data.iva.toString(),
                cantidad: parseInt(cantvalor),
                precioGmc: "0",
                precioIms: "0",
                precioGer: parseFloat(pregervalor).toString(),
                totalUgmc: "0",
                totalUims: "0",
                totalUger: (parseFloat(pregervalor) * parseInt(cantvalor)).toString(),
                cum: data.cum
            }

            ProductosParaProformaGER.push(producto)

            mostrarProducto_PreciosGER();
            $("#cboBuscarProductoGER").val("").trigger("change")


        }
    })

})

function mostrarProducto_PreciosGER() {

    let subtotalger = 0;
    let ivager = 0;
    let totalger = 0;
    $("#tbgerProducto tbody").html("")

    ProductosParaProformaGER.forEach((item) => {

        subtotalger = subtotalger + parseFloat(item.totalUger)
        ivager = ivager + (parseFloat(item.totalUger) * parseFloat(item.iva))
        totalger = subtotalger + ivager
        $("#tbgerProducto tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProducto", item.idProducto)
                ),
                $("<td>").text(item.dc),
                $("<td>").text(item.cantidad),
                $("<td>").text(item.precioGer),
                $("<td>").text(item.iva),
                $("<td>").text(item.totalUger)

            )

        )
    })
    $("#txtSubTotalGER").val(subtotalger.toFixed(4))
    $("#txtIVAGER").val(ivager.toFixed(4))
    $("#txtTotalGER").val(totalger.toFixed(4))


}


/*#SECCION PARA ELIMINAR UN RECORD */
$(document).on("click", "button.btn-eliminar", function () {

    const _idproducto = $(this).data("idProducto")
    ProductosParaProformaA = ProductosParaProformaA.filter(p => p.idProducto != _idproducto);
    ProductosParaProformaB = ProductosParaProformaB.filter(p => p.idProducto != _idproducto);
    ProductosParaProformaC = ProductosParaProformaC.filter(p => p.idProducto != _idproducto);
    ProductosParaProformaGMC = ProductosParaProformaGMC.filter(p => p.idProducto != _idproducto);
    ProductosParaProformaIMS = ProductosParaProformaIMS.filter(p => p.idProducto != _idproducto);
    ProductosParaProformaGER = ProductosParaProformaGER.filter(p => p.idProducto != _idproducto);
    mostrarProducto_Precios();
    mostrarProducto_PreciosGMC();
    mostrarProducto_PreciosIMS();
    mostrarProducto_PreciosGER();
})



function registrarProforma(proformaData) {
    $("#btnTerminarProforma").LoadingOverlay("show");

    fetch("/Proformar/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(proformaData)
    })
        .then(response => {
            $("#btnTerminarProforma").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {
            if (responseJson.estado) {
                console.log(JSON.stringify(proformaData));
                ProductosParaProformaA = [];
                mostrarProducto_Precios();

                $("#txtRazonSocial").val("");
                $("#txtRuc").val("");
                $("#txtDireccion").val("");
                $("#txtCanton").val("");
                $("#txtCodigoInfima").val("");
                $("#cboCodigoInfima").text("");
                $("#cboTipoProforma").val($("#cboTipoProforma option:first").val());

                swal.fire("Registrado!", `Numero de Proforma: ${responseJson.objeto.numeroProforma}`, "success");
            } else {
                console.log(JSON.stringify(proformaData));
                swal.fire("Lo sentimos!", `No se pudo registrar la proforma de ${proformaData.detalleTipoEmpresa}`, "error");
            }
        });
}


/*---------------------------------------------------SECCION PARA TERMINAR LA PROFORMA */
let vmDetalleProductoProforma = [];

$("#btnTerminarProforma").click(function () {

   
    var inputrs = document.getElementById('txtRazonSocial')

    if (inputrs.value === "") {
        toastr.warning("", "Debe Ingresar el hospital")
        return;
    }

    
    //se quedara en ProductosParaProformaGMC por que sirve tambien para germedic e imsumed
    if (ProductosParaProformaA.length < 1) {
        toastr.warning("", "Debe Ingresar productos")
        return;
    }

    vmDetalleProductoProforma = ProductosParaProformaA;

    console.log(vmDetalleProductoProforma)

    const ProformaGMC = {
        idTipoProforma: $("#cboTipoProforma").val(),
        razonSocial: $("#txtRazonSocial").val(),
        rucRS: $("#txtRuc").val(),
        direccionRS: $("#txtDireccion").val(),
        cantonRS: $("#txtCanton").val(),
        codigoInfima: $("#cboCodigoInfima").text() + $("#txtCodigoInfima").val(),
        cvp: $("#txtCvpGMC").val(),
        fpago: $("#txtFpagoGMC").val(),
        gtecnica: $("#txtCtecnicaGMC").val(),
        obervacion: $("#txtObservacionGMC").val(),
        etiquetaGmc: $("#txtCodigoInfima").val(),
        tiempoEntregaGmc: $("#txtTentregaGMC").val(),
        subtotalGmc: $("#txtSubTotalGMC").val(),
        ivaTotalGMC: $("#txtIVAGMC").val(),
        totalGmc: $("#txtTotalGMC").val(),
        detalleTipoEmpresa: "GMC",
        detalleProductoProformas: vmDetalleProductoProforma
    }
    //hice un cambio de D a d en detalleproductoproformas
    console.log(ProformaGMC);

    $("#btnTerminarProforma").LoadingOverlay("show");

    fetch("/Proformar/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(ProformaGMC)
    })
        .then(response => {
            $("#btnTerminarProforma").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
            
        })
        .then(responseJson => {
            if (responseJson.estado) {
                ProductosParaProformaA = [];
                mostrarProducto_Precios();

                console.log(JSON.stringify(ProformaGMC));
                $("#txtRazonSocial").val("")
                $("#txtRuc").val("")
                $("#txtDireccion").val("")
                $("#txtCanton").val("")
                $("#txtCodigoInfima").val("")
                $("#cboCodigoInfima").text("")
                $("#cboTipoProforma").val($("#cboTipoProforma option:first").val())
                $("#txtCvpGMC").val("90 Días")
                $("#txtCvpIMS").val("90 Días")
                $("#txtCvpGER").val("90 Días")
                $("#txtFpagoGMC").val("Contra-Entrega")
                $("#txtFpagoIMS").val("Contra-Entrega")
                $("#txtFpagoGER").val("CONTRA-ENTREGA")
                $("#txtCtecnicaGMC").val("1 Año")
                $("#txtCtecnicaIMS").val("12 MESES")
                $("#txtCtecnicaGER").val("1 AÑO")
                $("#txtTentregaGMC").val("5 días a la entrega de la orden de compra")
                $("#txtTentregaIMS").val("10 días calendario")
                $("#txtTentregaGER").val("5 días a la entrega de la orden de compra")
                $("#txtObservacionGMC").val("")
                $("#txtObservacionIMS").val("")
                $("#txtObservacionGER").val("")
                
                swal.fire("Registrado!", `Numero de Proforma de las 3 EMPRESAS: ${responseJson.objeto.numeroProforma}`, "success")

            } else {
                console.log(JSON.stringify(ProformaGMC));
                swal.fire("Lo sentimos!", "No se pudo registrar la proforma de GMC", "error")
            }
        })

    /*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    vmDetalleProductoProforma = ProductosParaProformaB;
    //para busar creacion de vmproforma ver el video 09
    const ProformaIMS = {
        idTipoProforma: parseInt($("#cboTipoProforma").val()), /*$("#cboTipoProforma").val(),*/
        razonSocial: $("#txtRazonSocial").val(),
        rucRS: $("#txtRuc").val(),
        direccionRS: $("#txtDireccion").val(),
        cantonRS: $("#txtCanton").val(),
        codigoInfima: $("#cboCodigoInfima").text() + $("#txtCodigoInfima").val(),
        cvp: $("#txtCvpIMS").val(),
        fpago: $("#txtFpagoIMS").val(),
        gtecnica: $("#txtCtecnicaIMS").val(),
        obervacion: $("#txtObservacionIMS").val(),
        etiquetaIms: $("#txtCodigoInfima").val(),
        tiempoEntregaIms: $("#txtTentregaIMS").val(),
        subtotalIms: $("#txtSubTotalIMS").val(),
        ivaTotalIMS: $("#txtIVAIMS").val(),
        totalIms: $("#txtTotalIMS").val(),
        detalleTipoEmpresa: "IMSUMED",
        detalleProductoProformas: vmDetalleProductoProforma
    }
    //hice un cambio de D a d en detalleproductoproformas
    console.log(ProformaIMS);

    $("#btnTerminarProforma").LoadingOverlay("show");

    fetch("/Proformar/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(ProformaIMS)
    })
        .then(response => {
            $("#btnTerminarProforma").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);

        })
        .then(responseJson => {
            if (responseJson.estado) {
                ProductosParaProformaB = [];
                mostrarProducto_Precios();

                console.log(JSON.stringify(ProformaIMS));
                $("#txtRazonSocial").val("")
                $("#txtRuc").val("")
                $("#txtDireccion").val("")
                $("#txtCanton").val("")
                $("#txtCodigoInfima").val("")
                $("#cboCodigoInfima").text("")
                $("#cboTipoProforma").val($("#cboTipoProforma option:first").val())
                $("#txtObservacion").val("")
                swal.fire("Registrado!", `Numero de Proforma de las 3 EMPRESAS: ${responseJson.objeto.numeroProforma}`, "success")

                /**/
            } else {
                console.log(JSON.stringify(ProformaIMS));
                swal.fire("Lo sentimos!", "No se pudo registrar la proforma de IMS", "error")
            }
        })

    /*-----------------------------------------------------------------------------------------------------------------------------------*/

    vmDetalleProductoProforma = ProductosParaProformaC;
    //para busar creacion de vmproforma ver el video 09
    const ProformaGER = {
        idTipoProforma: parseInt($("#cboTipoProforma").val()), /*$("#cboTipoProforma").val(),*/
        razonSocial: $("#txtRazonSocial").val(),
        rucRS: $("#txtRuc").val(),
        direccionRS: $("#txtDireccion").val(),
        cantonRS: $("#txtCanton").val(),
        codigoInfima: $("#cboCodigoInfima").text() + $("#txtCodigoInfima").val(),
        cvp: $("#txtCvpGER").val(),
        fpago: $("#txtFpagoGER").val(),
        gtecnica: $("#txtCtecnicaGER").val(),
        obervacion: $("#txtObservacionGER").val(),
        etiquetaGer: $("#txtCodigoInfima").val(),
        tiempoEntregaGer: $("#txtTentregaGER").val(),
        subtotalGer: $("#txtSubTotalGER").val(),
        ivaTotalGER: $("#txtIVAGER").val(),
        totalGer: $("#txtTotalGER").val(),
        detalleTipoEmpresa: "GERMEDIC",
        detalleProductoProformas: vmDetalleProductoProforma
    }
    //hice un cambio de D a d en detalleproductoproformas
    console.log(ProformaGER);

    $("#btnTerminarProforma").LoadingOverlay("show");

    fetch("/Proformar/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(ProformaGER)
    })
        .then(response => {
            $("#btnTerminarProforma").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);

        })
        .then(responseJson => {
            if (responseJson.estado) {
                ProductosParaProformaC = [];
                mostrarProducto_Precios();

                console.log(JSON.stringify(ProformaGER));
                $("#txtRazonSocial").val("")
                $("#txtRuc").val("")
                $("#txtDireccion").val("")
                $("#txtCanton").val("")
                $("#txtCodigoInfima").val("")
                $("#cboCodigoInfima").text("")
                $("#cboTipoProforma").val($("#cboTipoProforma option:first").val())
                $("#txtObservacion").val("")
                swal.fire("Registrado!", `Numero de Proforma de las 3 EMPRESAS: ${responseJson.objeto.numeroProforma}`, "success")

                /**/
            } else {
                console.log(JSON.stringify(ProformaGER));
                swal.fire("Lo sentimos!", "No se pudo registrar la proforma de GER", "error")
            }
        })
})

$("#btnTerminarProformaGMC").click(function () {
    
    var inputrs = document.getElementById('txtRazonSocial')
    var inputci = document.getElementById('txtCodigoInfima')

    if (inputrs.value === "" || inputci.value === "") {
        toastr.warning("", "No se olvide de ingresar el hospital o el numero de infima. En caso de ser una proforma general poner 0 como numero de infima")
        return;
    }

    if (ProductosParaProformaGMC.length < 1) {
        toastr.warning("", "Debe Ingresar productos")
        return;
    }

    const vmDetalleProductoProforma = ProductosParaProformaGMC;

    console.log(vmDetalleProductoProforma)

    const ProformaGMC = {
        idTipoProforma: $("#cboTipoProforma").val(),
        razonSocial: $("#txtRazonSocial").val(),
        rucRS: $("#txtRuc").val(),
        direccionRS: $("#txtDireccion").val(),
        cantonRS: $("#txtCanton").val(),
        codigoInfima: $("#cboCodigoInfima").text() + $("#txtCodigoInfima").val(),
        cvp: $("#txtCvpGMC").val(),
        fpago: $("#txtFpagoGMC").val(),
        gtecnica: $("#txtCtecnicaGMC").val(),
        obervacion: $("#txtObservacionGMC").val(),
        etiquetaGmc: $("#txtCodigoInfima").val(),
        tiempoEntregaGmc: $("#txtTentregaGMC").val(),
        subtotalGmc: $("#txtSubTotalGMC").val(),
        ivaTotalGMC: $("#txtIVAGMC").val(),
        totalGmc: $("#txtTotalGMC").val(),
        detalleTipoEmpresa: "GMC",
        detalleProductoProformas: vmDetalleProductoProforma
    }
    //hice un cambio de D a d en detalleproductoproformas
    console.log(ProformaGMC);

    $("#btnTerminarProformaGMC").LoadingOverlay("show");
   
    fetch("/Proformar/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(ProformaGMC)
    })
        .then(response => {
            $("#btnTerminarProformaGMC").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
            
        })
        .then(responseJson => {
            if (responseJson.estado) {
                ProductosParaProformaGMC = [];
                mostrarProducto_Precios();

                console.log(JSON.stringify(ProformaGMC));
                $("#txtRazonSocial").val("")
                $("#txtRuc").val("")
                $("#txtDireccion").val("")
                $("#txtCanton").val("")
                $("#txtCodigoInfima").val("")
                $("#cboCodigoInfima").text("")
                $("#cboTipoProforma").val($("#cboTipoProforma option:first").val())
                $("#txtCvpGMC").val("90 Días")
                $("#txtCvpIMS").val("90 Días")
                $("#txtCvpGER").val("90 Días")
                $("#txtFpagoGMC").val("Contra-Entrega")
                $("#txtFpagoIMS").val("Contra-Entrega")
                $("#txtFpagoGER").val("CONTRA-ENTREGA")
                $("#txtCtecnicaGMC").val("1 Año")
                $("#txtCtecnicaIMS").val("12 MESES")
                $("#txtCtecnicaGER").val("1 AÑO")
                $("#txtTentregaGMC").val("5 días a la entrega de la orden de compra")
                $("#txtTentregaIMS").val("10 días calendario")
                $("#txtTentregaGER").val("5 días a la entrega de la orden de compra")
                $("#txtObservacionGMC").val("")
                $("#txtObservacionIMS").val("")
                $("#txtObservacionGER").val("")
                swal.fire("Registrado!", `Numero de Proforma de GMC: ${responseJson.objeto.numeroProforma }`, "success")
                
            } else {
                console.log(JSON.stringify(ProformaGMC));
                swal.fire("Lo sentimos!", "No se pudo registrar la proforma de GMC", "error")
            }
        })
})

$("#btnTerminarProformaIMS").click(function () {

    var inputrs = document.getElementById('txtRazonSocial')

    if (inputrs.value === "") {
        toastr.warning("", "Debe Ingresar el hospital")
        return;
    }

    if (ProductosParaProformaIMS.length < 1) {
        toastr.warning("", "Debe Ingresar productos")
        return;
    }

    const vmDetalleProductoProforma = ProductosParaProformaIMS;
    //para busar creacion de vmproforma ver el video 09
    const ProformaIMS = {
        idTipoProforma: parseInt($("#cboTipoProforma").val()), /*$("#cboTipoProforma").val(),*/
        razonSocial: $("#txtRazonSocial").val(),
        rucRS: $("#txtRuc").val(),
        direccionRS: $("#txtDireccion").val(),
        cantonRS: $("#txtCanton").val(),
        codigoInfima: $("#cboCodigoInfima").text() + $("#txtCodigoInfima").val(),
        cvp: $("#txtCvpIMS").val(),
        fpago: $("#txtFpagoIMS").val(),
        gtecnica: $("#txtCtecnicaIMS").val(),
        obervacion: $("#txtObservacionIMS").val(),
        etiquetaIms: $("#txtCodigoInfima").val(),
        tiempoEntregaIms: $("#txtTentregaIMS").val(),
        subtotalIms: $("#txtSubTotalIMS").val(),
        ivaTotalIMS: $("#txtIVAIMS").val(),
        totalIms: $("#txtTotalIMS").val(),
        detalleTipoEmpresa: "IMSUMED",
        detalleProductoProformas: vmDetalleProductoProforma
    }
    //hice un cambio de D a d en detalleproductoproformas
    console.log(ProformaIMS);

    $("#btnTerminarProformaIMS").LoadingOverlay("show");

    fetch("/Proformar/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(ProformaIMS)
    })
        .then(response => {
            $("#btnTerminarProformaIMS").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
            
        })
        .then(responseJson => {
            if (responseJson.estado) {
                ProductosParaProformaIMS = [];
                mostrarProducto_PreciosIMS();

                console.log(JSON.stringify(ProformaIMS));
                $("#txtRazonSocial").val("")
                $("#txtRuc").val("")
                $("#txtDireccion").val("")
                $("#txtCanton").val("")
                $("#txtCodigoInfima").val("")
                $("#cboCodigoInfima").text("")
                $("#cboTipoProforma").val($("#cboTipoProforma option:first").val())
                $("#txtCvpGMC").val("90 Días")
                $("#txtCvpIMS").val("90 Días")
                $("#txtCvpGER").val("90 Días")
                $("#txtFpagoGMC").val("Contra-Entrega")
                $("#txtFpagoIMS").val("Contra-Entrega")
                $("#txtFpagoGER").val("CONTRA-ENTREGA")
                $("#txtCtecnicaGMC").val("1 Año")
                $("#txtCtecnicaIMS").val("12 MESES")
                $("#txtCtecnicaGER").val("1 AÑO")
                $("#txtTentregaGMC").val("5 días a la entrega de la orden de compra")
                $("#txtTentregaIMS").val("10 días calendario")
                $("#txtTentregaGER").val("5 días a la entrega de la orden de compra")
                $("#txtObservacionGMC").val("")
                $("#txtObservacionIMS").val("")
                $("#txtObservacionGER").val("")
                swal.fire("Registrado!", `Numero de Proforma de IMS: ${responseJson.objeto.numeroProforma}`, "success")

                /**/
            } else {
                console.log(JSON.stringify(ProformaIMS));
                swal.fire("Lo sentimos!", "No se pudo registrar la proforma de IMS", "error")
            }
        })

})

$("#btnTerminarProformaGER").click(function () {

    var inputrs = document.getElementById('txtRazonSocial')

    if (inputrs.value === "") {
        toastr.warning("", "Debe Ingresar el hospital")
        return;
    }

    if (ProductosParaProformaGER.length < 1) {
        toastr.warning("", "Debe Ingresar productos")
        return;
    }

    const vmDetalleProductoProforma = ProductosParaProformaGER;
    //para busar creacion de vmproforma ver el video 09
    const ProformaGER = {
        idTipoProforma: parseInt($("#cboTipoProforma").val()), /*$("#cboTipoProforma").val(),*/
        razonSocial: $("#txtRazonSocial").val(),
        rucRS: $("#txtRuc").val(),
        direccionRS: $("#txtDireccion").val(),
        cantonRS: $("#txtCanton").val(),
        codigoInfima: $("#cboCodigoInfima").text() + $("#txtCodigoInfima").val(),
        cvp: $("#txtCvpGER").val(),
        fpago: $("#txtFpagoGER").val(),
        gtecnica: $("#txtCtecnicaGER").val(),
        obervacion: $("#txtObservacionGER").val(),
        etiquetaGer: $("#txtCodigoInfima").val(),
        tiempoEntregaGer: $("#txtTentregaGER").val(),
        subtotalGer: $("#txtSubTotalGER").val(),
        ivaTotalGER: $("#txtIVAGER").val(),
        totalGer: $("#txtTotalGER").val(),
        detalleTipoEmpresa: "GERMEDIC",
        detalleProductoProformas: vmDetalleProductoProforma
    }
    //hice un cambio de D a d en detalleproductoproformas
    console.log(ProformaGER);

    $("#btnTerminarProformaGER").LoadingOverlay("show");

    fetch("/Proformar/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(ProformaGER)
    })
        .then(response => {
            $("#btnTerminarProformaGER").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);

        })
        .then(responseJson => {
            if (responseJson.estado) {
                ProductosParaProformaGER = [];
                mostrarProducto_PreciosGER();

                console.log(JSON.stringify(ProformaGER));
                $("#txtRazonSocial").val("")
                $("#txtRuc").val("")
                $("#txtDireccion").val("")
                $("#txtCanton").val("")
                $("#txtCodigoInfima").val("")
                $("#cboCodigoInfima").text("")
                $("#cboTipoProforma").val($("#cboTipoProforma option:first").val())
                $("#txtCvpGMC").val("90 Días")
                $("#txtCvpIMS").val("90 Días")
                $("#txtCvpGER").val("90 Días")
                $("#txtFpagoGMC").val("Contra-Entrega")
                $("#txtFpagoIMS").val("Contra-Entrega")
                $("#txtFpagoGER").val("CONTRA-ENTREGA")
                $("#txtCtecnicaGMC").val("1 Año")
                $("#txtCtecnicaIMS").val("12 MESES")
                $("#txtCtecnicaGER").val("1 AÑO")
                $("#txtTentregaGMC").val("5 días a la entrega de la orden de compra")
                $("#txtTentregaIMS").val("10 días calendario")
                $("#txtTentregaGER").val("5 días a la entrega de la orden de compra")
                $("#txtObservacionGMC").val("")
                $("#txtObservacionIMS").val("")
                $("#txtObservacionGER").val("")
                swal.fire("Registrado!", `Numero de Proforma de GER: ${responseJson.objeto.numeroProforma}`, "success")

                /**/
            } else {
                console.log(JSON.stringify(ProformaGER));
                swal.fire("Lo sentimos!", "No se pudo registrar la proforma de GER", "error")
            }
        })

})



$("#btnprueba").click(function () {
    let numeroProforma = $("#prueba").val()

    fetch(`/Proformar/ObtenerProforma?numeroProforma=${numeroProforma}`)
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {
            console.log(responseJson);
            responseData = responseJson;

            ProductosParaProformaA = [];
            ProductosParaProformaB = [];
            ProductosParaProformaC = [];
            ProductosParaProformaGMC = [];
            ProductosParaProformaIMS = [];
            ProductosParaProformaGER = [];

            $("#tbProducto tbody").html("");
            $("#tbimsProducto tbody").html("");
            $("#tbgerProducto tbody").html("");


            $("#txtSubTotalGMC").val("")
            $("#txtIVAGMC").val("")
            $("#txtTotalGMC").val("")

            $("#txtSubTotalIMS").val("")
            $("#txtIVAIMS").val("")
            $("#txtTotalIMS").val("")

            $("#txtSubTotalGER").val("")
            $("#txtIVAGER").val("")
            $("#txtTotalGER").val("")


            $("#txtRuc").val("")
            $("#txtRazonSocial").val("")
            $("#txtCanton").val("")
            $("#txtDireccion").val("")
            $("#txtObservacion").val("")

            $("#txtCvpGMC").val("")
            $("#txtCvpIMS").val("")
            $("#txtCvpGER").val("")
            $("#txtFpagoGMC").val("")
            $("#txtFpagoIMS").val("")
            $("#txtFpagoGER").val("")
            $("#txtCtecnicaGMC").val("")
            $("#txtCtecnicaIMS").val("")
            $("#txtCtecnicaGER").val("")
            $("#txtTentregaGMC").val("")
            $("#txtTentregaIMS").val("")
            $("#txtTentregaGER").val("")
           /* -----Empieza seccion para rellenar la tabla-----*/

            if (responseData.length !== 3) {
                

                if (responseData[0].detalleTipoEmpresa === "GMC") {
                    populateTableGMC(responseData);
                    $("#txtRuc").val(responseData[0].rucRS)
                    $("#txtRazonSocial").val(responseData[0].razonSocial)
                    $("#txtCanton").val(responseData[0].cantonRS)
                    $("#txtDireccion").val(responseData[0].direccionRS)
                    $("#txtObservacionGMC").val(responseData[0].obervacion)
                    $("#txtCodigoInfima").val(responseData[0].etiquetaGmc)
                    $("#txtCvpGMC").val(responseData[0].cvp)
                    $("#txtFpagoGMC").val(responseData[0].fpago)
                    $("#txtCtecnicaGMC").val(responseData[0].gtecnica)
                    $("#txtTentregaGMC").val(responseData[0].tiempoEntregaGmc)
                    $("#txtSubTotalGMC").val(responseData[0].subtotalGmc)
                    $("#txtIVAGMC").val(responseData[0].ivaTotalGMC)
                    $("#txtTotalGMC").val(responseData[0].totalGmc)
                    if (responseData[0].idTipoProforma === 1) {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:first").val())
                    } else if (responseData[0].idTipoProforma === 2) {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:second").val())
                    } else if (responseData[0].idTipoProforma === 3) {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:third").val())
                    } else {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:fourth").val())
                    }
                   

                    $("#btnprueba").val("")
                    
                } else if (responseData[0].detalleTipoEmpresa === "IMSUMED") {
                    populateTableIMS(responseData);
                    $("#txtRuc").val(responseData[0].rucRS)
                    $("#txtRazonSocial").val(responseData[0].razonSocial)
                    $("#txtCanton").val(responseData[0].cantonRS)
                    $("#txtDireccion").val(responseData[0].direccionRS)
                    $("#txtObservacionIMS").val(responseData[0].obervacion)
                    $("#txtCodigoInfima").val(responseData[0].etiquetaIms)
                    $("#txtCvpIMS").val(responseData[0].cvp)
                    $("#txtFpagoIMS").val(responseData[0].fpago)
                    $("#txtCtecnicaIMS").val(responseData[0].gtecnica)
                    $("#txtTentregaIMS").val(responseData[0].tiempoEntregaIms)
                    $("#txtSubTotalIMS").val(responseData[0].subtotalIms)
                    $("#txtIVAIMS").val(responseData[0].ivaTotalIMS)
                    $("#txtTotalIMS").val(responseData[0].totalIms)
                    if (responseData[0].idTipoProforma === 1) {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:first").val())
                    } else if (responseData[0].idTipoProforma === 2) {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:second").val())
                    } else if (responseData[0].idTipoProforma === 3) {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:third").val())
                    } else {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:fourth").val())
                    }

                    $("#btnprueba").val("")
                    
                } else if (responseData[0].detalleTipoEmpresa === "GERMEDIC") {
                    populateTableGER(responseData);
                    $("#txtRuc").val(responseData[0].rucRS)
                    $("#txtRazonSocial").val(responseData[0].razonSocial)
                    $("#txtCanton").val(responseData[0].cantonRS)
                    $("#txtDireccion").val(responseData[0].direccionRS)
                    $("#txtObservacionGER").val(responseData[0].obervacion)
                    $("#txtCodigoInfima").val(responseData[0].etiquetaGer)
                    $("#txtCvpGER").val(responseData[0].cvp)
                    $("#txtFpagoGER").val(responseData[0].fpago)
                    $("#txtCtecnicaGER").val(responseData[0].gtecnica)
                    $("#txtTentregaGER").val(responseData[0].tiempoEntregaGer)
                    $("#txtSubTotalGER").val(responseData[0].subtotalGer)
                    $("#txtIVAGER").val(responseData[0].ivaTotalGER)
                    $("#txtTotalGER").val(responseData[0].totalGer)
                    if (responseData[0].idTipoProforma === 1) {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:first").val())
                    } else if (responseData[0].idTipoProforma === 2) {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:second").val())
                    } else if (responseData[0].idTipoProforma === 3) {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:third").val())
                    } else {
                        $("#cboTipoProforma").val($("#cboTipoProforma option:fourth").val())
                    }
                    $("#btnprueba").val("")
                } else {
                    swal.fire("lo siento!", "Ingrese un numero de proforma correcto", "error")
                }
            } else {

                populateTableAGMC(responseData);
                populateTableBIMS(responseData);
                populateTableCGER(responseData);
                $("#btnprueba").val("")
            }
            $("#btnprueba").val("")  
            /* -----termina seccion para rellenar la tabla-----*/
        })
        .catch(error => {
            console.error(error);
        });
})


function populateTableGMC(data) {
    $("#tbProducto tbody").html("");
    

 
    data.forEach(proforma => {
        const detalleProductos = proforma.detalleProductoProformas;

        const detalleProductosHTML = detalleProductos.map(producto => {

            ProductosParaProformaGMC.push({
                idProducto: producto.idProducto,
                cpc: producto.cpc,
                medicamento: producto.medicamento,
                ff: producto.ff,
                dc: producto.dc,
                fc: producto.fc,
                concentracion: producto.concentracion,
                presentacion: producto.presentacion,
                iva: producto.iva,
                cantidad: producto.cantidad,
                precioGmc: producto.precioGmc,
                precioIms: "0",
                precioGer: "0",
                totalUgmc: producto.totalUgmc,
                totalUims: "0",
                totalUger: "0",
                cum: producto.cum
            });

            return $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProducto", producto.idProducto)
                ),
                $("<td>").text(producto.cantidad),
                $("<td>").text(producto.medicamento),
                $("<td>").text(producto.ff),
                $("<td>").text(producto.concentracion),
                $("<td>").text(producto.presentacion),
                $("<td>").text(producto.iva),
                $("<td>").text(producto.precioGmc),
                $("<td>").text(producto.totalUgmc)
            );

            
        });

        $("#tbProducto tbody").append(detalleProductosHTML);
        
    });
}

function populateTableIMS(data) {
    $("#tbimsProducto tbody").html("");
   

    data.forEach(proforma => {
        const detalleProductos = proforma.detalleProductoProformas;

        const detalleProductosHTML = detalleProductos.map(producto => {

            ProductosParaProformaIMS.push({
                idProducto: producto.idProducto,
                cpc: producto.cpc,
                medicamento: producto.medicamento,
                ff: producto.ff,
                dc: producto.dc,
                fc: producto.fc,
                concentracion: producto.concentracion,
                presentacion: producto.presentacion,
                iva: producto.iva,
                cantidad: producto.cantidad,
                precioGmc: "0",
                precioIms: producto.precioIms,
                precioGer: "0",
                totalUgmc: "0",
                totalUims: producto.totalUims,
                totalUger: "0",
                cum: data.cum
            });

            return $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProducto", producto.idProducto)
                ),
                $("<td>").text(producto.medicamento),
                $("<td>").text(producto.fc),
                $("<td>").text(producto.presentacion),
                $("<td>").text(producto.iva),
                $("<td>").text(producto.precioIms),
                $("<td>").text(producto.cantidad),
                $("<td>").text(producto.totalUims)
            );
        });

        $("#tbimsProducto tbody").append(detalleProductosHTML);
    });
}

function populateTableGER(data) {
    $("#tbgerProducto tbody").html("");
  
    data.forEach(proforma => {
        const detalleProductos = proforma.detalleProductoProformas;

        const detalleProductosHTML = detalleProductos.map(producto => {

            ProductosParaProformaGER.push({
                idProducto: producto.idProducto,
                cpc: producto.cpc,
                medicamento: producto.medicamento,
                ff: producto.ff,
                dc: producto.dc,
                fc: producto.fc,
                concentracion: producto.concentracion,
                presentacion: producto.presentacion,
                iva: producto.iva,
                cantidad: producto.cantidad,
                precioGmc: "0",
                precioIms: "0",
                precioGer: producto.precioGer,
                totalUgmc: "0",
                totalUims: "0",
                totalUger: producto.totalUger,
                cum: data.cum
            });

            return $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                        $("<i>").addClass("fas fa-trash-alt")
                    ).data("idProducto", producto.idProducto)
                ),
                $("<td>").text(producto.dc),
                $("<td>").text(producto.cantidad),
                $("<td>").text(producto.precioGer),
                $("<td>").text(producto.iva),
                $("<td>").text(producto.totalUger)
            );
        });

        $("#tbgerProducto tbody").append(detalleProductosHTML);
    });
}


function populateTableAGMC(responseData) {
    $("#tbProducto tbody").html("");

    const gmcIndex = responseData.findIndex(data => data.detalleTipoEmpresa === "GMC");

    if (gmcIndex !== -1) {
        const data = responseData[gmcIndex];

        if (data && data.detalleProductoProformas && Array.isArray(data.detalleProductoProformas)) {
            const detalleProductos = data.detalleProductoProformas;

            const detalleProductosHTML = detalleProductos.map(producto => {
                ProductosParaProformaA.push({
                    idProducto: producto.idProducto,
                    cpc: producto.cpc,
                    medicamento: producto.medicamento,
                    ff: producto.ff,
                    dc: producto.dc,
                    fc: producto.fc,
                    concentracion: producto.concentracion,
                    presentacion: producto.presentacion,
                    iva: producto.iva,
                    cantidad: producto.cantidad,
                    precioGmc: producto.precioGmc,
                    precioIms: "0",
                    precioGer: "0",
                    totalUgmc: producto.totalUgmc,
                    totalUims: "0",
                    totalUger: "0",
                    cum: data.cum
                });

                return $("<tr>").append(
                    $("<td>").append(
                        $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                            $("<i>").addClass("fas fa-trash-alt")
                        ).data("idProducto", producto.idProducto)
                    ),
                    $("<td>").text(producto.cantidad),
                    $("<td>").text(producto.medicamento),
                    $("<td>").text(producto.ff),
                    $("<td>").text(producto.concentracion),
                    $("<td>").text(producto.presentacion),
                    $("<td>").text(producto.iva),
                    $("<td>").text(producto.precioGmc),
                    $("<td>").text(producto.totalUgmc)
                );
            });
            $("#txtRuc").val(data.rucRS)
            $("#txtRazonSocial").val(data.razonSocial)
            $("#txtCanton").val(data.cantonRS)
            $("#txtDireccion").val(data.direccionRS)
            $("#txtCodigoInfima").val(data.etiquetaGmc)
            $("#txtSubTotalGMC").val(data.subtotalGmc)
            $("#txtIVAGMC").val(data.ivaTotalGMC)
            $("#txtTotalGMC").val(data.totalGmc)
            $("#txtObservacionGMC").val(data.obervacion)
            $("#tbProducto tbody").append(detalleProductosHTML);
        } else {
            console.error("Invalid data format or missing detalleProductoProformas.");
        }
    } else {
        console.log("No GMC index found in responseData.");
    }
}


function populateTableBIMS(responseData) {
    $("#tbimsProducto tbody").html("");

    const imsIndex = responseData.findIndex(data => data.detalleTipoEmpresa === "IMSUMED");

    if (imsIndex !== -1) {
        const data = responseData[imsIndex];

        if (data && data.detalleProductoProformas && Array.isArray(data.detalleProductoProformas)) {
            const detalleProductos = data.detalleProductoProformas;

            const detalleProductosHTML = detalleProductos.map(producto => {
                ProductosParaProformaB.push({
                    idProducto: producto.idProducto,
                    cpc: producto.cpc,
                    medicamento: producto.medicamento,
                    ff: producto.ff,
                    dc: producto.dc,
                    fc: producto.fc,
                    concentracion: producto.concentracion,
                    presentacion: producto.presentacion,
                    iva: producto.iva,
                    cantidad: producto.cantidad,
                    precioGmc: "0",
                    precioIms: producto.precioIms,
                    precioGer: "0",
                    totalUgmc: "0",
                    totalUims: producto.totalUims,
                    totalUger: "0",
                    cum: data.cum
                });

                return $("<tr>").append(
                    $("<td>").append(
                        $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                            $("<i>").addClass("fas fa-trash-alt")
                        ).data("idProducto", producto.idProducto)
                    ),
                    $("<td>").text(producto.medicamento),
                    $("<td>").text(producto.fc),
                    $("<td>").text(producto.presentacion),
                    $("<td>").text(producto.iva),
                    $("<td>").text(producto.precioIms),
                    $("<td>").text(producto.cantidad),
                    $("<td>").text(producto.totalUims)
                );
            });

            $("#txtSubTotalIMS").val(data.subtotalIms)
            $("#txtIVAIMS").val(data.ivaTotalIMS)
            $("#txtTotalIMS").val(data.totalIms)
            $("#txtObservacionIMS").val(data.obervacion)
            $("#tbimsProducto tbody").append(detalleProductosHTML);
        } else {
            console.error("Invalid data format or missing detalleProductoProformas.");
        }
    } else {
        console.log("No IMSUMED index found in responseData.");
    }
}



function populateTableCGER(responseData) {
    $("#tbgerProducto tbody").html("");

    const gerIndex = responseData.findIndex(data => data.detalleTipoEmpresa === "GERMEDIC");

    if (gerIndex !== -1) {
        const data = responseData[gerIndex];

        if (data && data.detalleProductoProformas && Array.isArray(data.detalleProductoProformas)) {
            const detalleProductos = data.detalleProductoProformas;

            const detalleProductosHTML = detalleProductos.map(producto => {
                ProductosParaProformaC.push({
                    idProducto: producto.idProducto,
                    cpc: producto.cpc,
                    medicamento: producto.medicamento,
                    ff: producto.ff,
                    dc: producto.dc,
                    fc: producto.fc,
                    concentracion: producto.concentracion,
                    presentacion: producto.presentacion,
                    iva: producto.iva,
                    cantidad: producto.cantidad,
                    precioGmc: "0",
                    precioIms: "0",
                    precioGer: producto.precioGer,
                    totalUgmc: "0",
                    totalUims: "0",
                    totalUger: producto.totalUger,
                    cum: data.cum
                });

                return $("<tr>").append(
                    $("<td>").append(
                        $("<button>").addClass("btn btn-danger btn-eliminar btn-sm").append(
                            $("<i>").addClass("fas fa-trash-alt")
                        ).data("idProducto", producto.idProducto)
                    ),
                    $("<td>").text(producto.dc),
                    $("<td>").text(producto.cantidad),
                    $("<td>").text(producto.precioGer),
                    $("<td>").text(producto.iva),
                    $("<td>").text(producto.totalUger)
                );
            });

            $("#txtSubTotalGER").val(data.subtotalGer)
            $("#txtIVAGER").val(data.ivaTotalGER)
            $("#txtTotalGER").val(data.totalGer)
            $("#txtObservacionGER").val(data.obervacion)
            $("#tbgerProducto tbody").append(detalleProductosHTML);
        } else {
            console.error("Invalid data format or missing detalleProductoProformas.");
        }
    } else {
        console.log("No GERMEDIC index found in responseData.");
    }
}
