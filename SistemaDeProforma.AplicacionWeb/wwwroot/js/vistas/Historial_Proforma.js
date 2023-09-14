//Parametros de busqueda de la Proforma
const VISTA_BUSQUEDA = {

    busquedaFecha: () => {
        $("#txtFechaInicio").val("")
        $("#txtFechaFin").val("")
        $("#txtNumero").val("")
        $("#txtNic").val("")
        $("#selempresa").val("")
        $("#txtHospi").val("")

        $(".busqueda-fecha").show()
        $(".busqueda-nic").hide()
        $(".busqueda-numero").hide()
        $(".busqueda-empresa").hide()
        $(".busqueda-hospi").hide()

    }, busquedaNumero: () => {
        $("#txtFechaInicio").val("")
        $("#txtFechaFin").val("")
        $("#txtNic").val("")
        $("#txtNumero").val("")
        $("#selempresa").val("")
        $("#txtHospi").val("")

        $(".busqueda-numero").show()
        $(".busqueda-nic").hide()
        $(".busqueda-fecha").hide()
        $(".busqueda-empresa").hide()
        $(".busqueda-hospi").hide()

    }, busquedaNic: () => {
        $("#txtFechaInicio").val("")
        $("#txtFechaFin").val("")
        $("#txtNic").val("")
        $("#txtNumero").val("")
        $("#selempresa").val("")
        $("#txtHospi").val("")

        $(".busqueda-nic").show()
        $(".busqueda-numero").hide()
        $(".busqueda-fecha").hide()
        $(".busqueda-empresa").hide()
        $(".busqueda-hospi").hide()

    }, busquedaEmpresa: () => {
        $("#txtFechaInicio").val("")
        $("#txtFechaFin").val("")
        $("#txtNic").val("")
        $("#txtNumero").val("")
        $("#selempresa").val("")
        $("#txtHospi").val("")

        $(".busqueda-empresa").show()
        $(".busqueda-numero").hide()
        $(".busqueda-fecha").hide()
        $(".busqueda-nic").hide()
        $(".busqueda-hospi").hide()

    }, busquedaHospi: () => {
        $("#txtFechaInicio").val("")
        $("#txtFechaFin").val("")
        $("#txtNic").val("")
        $("#txtNumero").val("")
        $("#selempresa").val("")
        $("#txtHospi").val("")

        $(".busqueda-hospi").show()
        $(".busqueda-empresa").hide()
        $(".busqueda-numero").hide()
        $(".busqueda-fecha").hide()
        $(".busqueda-nic").hide()
        
    }
}

let tablaData;

$(document).ready(function () {
    VISTA_BUSQUEDA["busquedaNumero"]()
    $.datepicker.setDefaults($.datepicker.regional["es"])
    const currentDate = new Date();
    const formattedDate = $.datepicker.formatDate("dd/mm/yy", currentDate);
    $("#txtFechaInicio").datepicker({ dateFormat: "dd/mm/yy" })
    $("#txtFechaFin").datepicker({ dateFormat: "dd/mm/yy" })

    tablaData = $('#tbproforma').DataTable({
        responsive: true,
        "ajax": {
            "url": `/Proformar/Historial?fechaInicio=${formattedDate}&fechaFin=${formattedDate}`,
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "idProforma", "visible": false, "searchable": false },
            {
                "defaultContent": '<button class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "80px"
            },
            { "data": "fechaRegistro" },
            { "data": "numeroProforma" },
            { "data": "codigoInfima" },
            { "data": "tipoProforma" },
            { "data": "razonSocial" },
            { "data": "detalleTipoEmpresa" },
            { "data": "totalGmc" },
            { "data": "totalIms" },
            { "data": "totalGer" }
        ],
        order: [[0, "desc"]],
        dom: "Bfrtip",
        buttons: [
            {
                text: 'Exportar Excel',
                extend: 'excelHtml5',
                title: '',
                filename: 'Reporte Historial',
                
            }, 'pageLength'
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        },
    });
})



$("#cboBuscarPor").change(function () { //Selector de Parametros para el boton Buscar

    if ($("#cboBuscarPor").val() == "fecha") {
        VISTA_BUSQUEDA["busquedaFecha"]()
    } else if ($("#cboBuscarPor").val() == "nic") {
        VISTA_BUSQUEDA["busquedaNic"]()
    } else if ($("#cboBuscarPor").val() == "empresa") {
        VISTA_BUSQUEDA["busquedaEmpresa"]()
    } else if ($("#cboBuscarPor").val() == "hospi") {
        VISTA_BUSQUEDA["busquedaHospi"]()
    } else {
        VISTA_BUSQUEDA["busquedaNumero"]()
    }
})

 

//let currentPage = 1;
//const rowsPerPage = 10;
//let totalRows = 0;
//let responseData = [];
$("#btnBuscar").click(function () { //Funcion del boton Buscar al hacerse click

    if ($("#cboBuscarPor").val() == "fecha") {

        if ($("#txtFechaInicio").val().trim() == "" || $("#txtFechaFin").val().trim() == "") {
            toastr.warning("", "Debe Ingresar fecha inicio y fin")
            return;
        }
    }
    else if ($("#cboBuscarPor").val() == "nic") {

        if ($("#txtNic").val().trim() == "") {
            toastr.warning("", "Debe Ingresar el numero de infima")
            return;
        }
    } else if ($("#cboBuscarPor").val() == "empresa") {

        if ($("#selempresa").val().trim() == "") {
            toastr.warning("", "Debe Ingresar la empresa")
            return;
        }
    } else if ($("#cboBuscarPor").val() == "hospi") {

        if ($("#txtHospi").val().trim() == "") {
            toastr.warning("", "El hospital debe ser igual a como esta guardado en el sistema")
            return;
        }
    } else {

        if ($("#txtNumero").val().trim() == "") {
            toastr.warning("", "Debe Ingresar el numero de proforma")
            return;
        }
    }

    let empresa = $("#selempresa").val()
    let hospi = $("#txtHospi").val()
    let nic = $("#txtNic").val()
    let numeroProforma = $("#txtNumero").val()
    let fechaInicio = $("#txtFechaInicio").val()
    let fechaFin = $("#txtFechaFin").val()

    let nueva_url = `/Proformar/Historial?numeroProforma=${numeroProforma}&nic=${nic}&hospi=${hospi}&empresa=${empresa}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;

    tablaData.ajax.url(nueva_url).load();

    //nota: generalmente los problemas 500 de fetch son porque no coinciden los data types entre la proforma que se creo, la clase, el viewmodel
    //$(".card-body").find("div.row").LoadingOverlay("show");

    //fetch(`/Proformar/Historial?numeroProforma=${numeroProforma}&nic=${nic}&hospi=${hospi}&empresa=${empresa}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
    //    .then(response => {
    //        return response.ok ? response.json() : Promise.reject(response);
    //    })
    //    .then(responseJson => {
    //        console.log(responseJson);

    //    });
});

//Funciones para cambiar paginas (10 registros por páginas) - TAMBIEN SE ENCUENTRA LA TABLA DE DATOS
//function showPage(pageNumber) {
//    const startIndex = (pageNumber - 1) * rowsPerPage;
//    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);

//    $("#tbproforma tbody").html("");
//    for (let i = startIndex; i < endIndex; i++) {
//        const proforma = responseData[i];

//                $("#tbproforma tbody").append(
//                    $("<tr>").append(
//                        $("<td>").append(
//                            $("<button>").addClass("btn btn-info btn-sm").append(
//                                $("<i>").addClass("fas fa-eye")
//                            ).data("proforma", proforma)
//                        ),
//                        $("<td>").text(proforma.fechaRegistro),
//                        $("<td>").text(proforma.numeroProforma),
//                        $("<td>").text(proforma.codigoInfima),
//                        $("<td>").text(proforma.tipoProforma),
//                        $("<td>").text(proforma.razonSocial),
//                        $("<td>").text(proforma.detalleTipoEmpresa),
//                        $("<td>").text(proforma.ivaTotalGMC),
//                        $("<td>").text(proforma.totalGmc),
//                        $("<td>").text(proforma.totalIms),
//                        $("<td>").text(proforma.totalGer)

//                    )
//                );


//    }

//    updatePaginationButtons();
//}

//function updatePaginationButtons() {
//    const totalPages = Math.ceil(totalRows / rowsPerPage);
//    $("#pagination").html("");

//    if (totalPages > 1) {
//        if (currentPage > 1) {
//            $("#pagination").append(
//                $("<button>").text("Previous").addClass("btn btn-secondary btn-sm").on("click", () => {
//                    currentPage--;
//                    showPage(currentPage);
//                })
//            );
//        }

//        if (currentPage < totalPages) {
//            $("#pagination").append(
//                $("<button>").text("Next").addClass("btn btn-secondary btn-sm").on("click", () => {
//                    currentPage++;
//                    showPage(currentPage);
//                })
//            );
//        }
//    }
//}

//Seccion para el boton "Info" muestre las ventanas de informacion y el boton para imprimir las proformas.


$("#tbproforma tbody").on("click", ".btn-info", function () { //Seccion para editar la fila de registros
    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const d = tablaData.row(filaSeleccionada).data();
    console.log(d)
    

    if (d.detalleTipoEmpresa === "GMC") {
        $("#txtFechaRegistro").val(d.fechaRegistro)
        $("#txtNumeroProforma").val(d.numeroProforma)
        $("#txtUsuarioRegistro").val(d.usuario)
        $("#txtTipoProforma").val(d.tipoProforma)
        $("#txtCodigoInfima").val(d.codigoInfima)
        $("#txtRazonSocial").val(d.razonSocial)
        $("#txtRuc").val(d.rucRS)
        $("#txtCanton").val(d.cantonRS)
        $("#txtDireccion").val(d.direccionRS)
        $("#txtGT").val(d.gtecnica)
        $("#txtValidez").val(d.cvp)
        $("#txtTentrega").val(d.tiempoEntregaGmc)
        $("#txtFpago").val(d.fpago)
        $("#txtObservacion").val(d.obervacion)
        $("#txtSubTotal").val(d.subtotalGmc)
        $("#txtIva").val(d.ivaTotalGMC)
        $("#txtTotal").val(d.totalGmc)


        if (d.tipoProforma === "Infima Cuantia") {

            $("#tbProductos tbody").html("");

            d.detalleProductoProformas.forEach((item) => {
                $("#tbProductos tbody").append(
                    $("<tr>").append(
                        $("<td>").text(item.cpc),
                        $("<td>").text(item.cantidad),
                        $("<td>").text(item.medicamento),
                        $("<td>").text(item.ff),
                        $("<td>").text(item.concentracion),
                        $("<td>").text(item.presentacion),
                        $("<td>").text(item.precioGmc),
                        $("<td>").text(item.totalUgmc)


                    )
                )
            })
        } else if (d.tipoProforma === "General") {

            $("#tbProductos tbody").html("");

            d.detalleProductoProformas.forEach((item) => {
                $("#tbProductos tbody").append(
                    $("<tr>").append(
                        $("<td>").text(item.cum),
                        $("<td>").text(item.cantidad),
                        $("<td>").text(item.medicamento),
                        $("<td>").text(item.ff),
                        $("<td>").text(item.concentracion),
                        $("<td>").text(item.presentacion),
                        $("<td>").text(item.precioGmc),
                        $("<td>").text(item.totalUgmc)


                    )
                )
            })
        } else {
            swal.fire("error de codigo!", "Contacte a Freddy", "error")
        }


        $("#linkImprimirGMC").attr("href", `/Proformar/MostrarPDFProforma?numeroProforma=${d.numeroProforma}`)

        $("#modalData").modal("show");
    } else if (d.detalleTipoEmpresa === "IMSUMED") {
        $("#txtFechaRegistroIMS").val(d.fechaRegistro)
        $("#txtNumeroProformaIMS").val(d.numeroProforma)
        $("#txtUsuarioRegistroIMS").val(d.usuario)
        $("#txtTipoProformaIMS").val(d.tipoProforma)
        $("#txtCodigoInfimaIMS").val(d.codigoInfima)
        $("#txtRazonSocialIMS").val(d.razonSocial)
        $("#txtRucIMS").val(d.rucRS)
        $("#txtCantonIMS").val(d.cantonRS)
        $("#txtDireccionIMS").val(d.direccionRS)
        $("#txtGTIMS").val(d.gtecnica)
        $("#txtValidezIMS").val(d.cvp)
        $("#txtTentregaIMS").val(d.tiempoEntregaIms)
        $("#txtFpagoIMS").val(d.fpago)
        $("#txtObservacionIMS").val(d.obervacion)
        $("#txtSubTotalIMS").val(d.subtotalIms)
        $("#txtIvaIMS").val(d.ivaTotalIMS)
        $("#txtTotalIMS").val(d.totalIms)

        if (d.tipoProforma === "Infima Cuantia") {

            $("#tbimsProductos tbody").html("");

            d.detalleProductoProformas.forEach((item) => {
                $("#tbimsProductos tbody").append(
                    $("<tr>").append(
                        $("<td>").text(item.cpc),
                        $("<td>").text(item.cantidad),
                        $("<td>").text(item.medicamento),
                        $("<td>").text(item.fc),
                        $("<td>").text(item.presentacion),
                        $("<td>").text(item.precioIms),
                        $("<td>").text(item.totalUims)


                    )
                )
            })

        } else if (d.tipoProforma === "General") {

            $("#tbimsProductos tbody").html("");

            d.detalleProductoProformas.forEach((item) => {
                $("#tbimsProductos tbody").append(
                    $("<tr>").append(
                        $("<td>").text(item.cum),
                        $("<td>").text(item.cantidad),
                        $("<td>").text(item.medicamento),
                        $("<td>").text(item.fc),
                        $("<td>").text(item.presentacion),
                        $("<td>").text(item.precioIms),
                        $("<td>").text(item.totalUims)


                    )
                )
            })

        } else {

            swal.fire("error de codigo!", "Contacte a Freddy", "error")
        }

        $("#linkImprimirIMS").attr("href", `/Proformar/MostrarPDFProformaIMS?numeroProforma=${d.numeroProforma}`)

        $("#modalDataIMS").modal("show");
    } else {
        $("#txtFechaRegistroGER").val(d.fechaRegistro)
        $("#txtNumeroProformaGER").val(d.numeroProforma)
        $("#txtUsuarioRegistroGER").val(d.usuario)
        $("#txtTipoProformaGER").val(d.tipoProforma)
        $("#txtCodigoInfimaGER").val(d.codigoInfima)
        $("#txtRazonSocialGER").val(d.razonSocial)
        $("#txtRucGER").val(d.rucRS)
        $("#txtCantonGER").val(d.cantonRS)
        $("#txtDireccionGER").val(d.direccionRS)
        $("#txtGTGER").val(d.gtecnica)
        $("#txtValidezGER").val(d.cvp)
        $("#txtTentregaGER").val(d.tiempoEntregaGer)
        $("#txtFpagoGER").val(d.fpago)
        $("#txtObservacionGER").val(d.obervacion)
        $("#txtSubTotalGER").val(d.subtotalGer)
        $("#txtIvaGER").val(d.ivaTotalGER)
        $("#txtTotalGER").val(d.totalGer)

        if (d.tipoProforma === "Infima Cuantia") {

            $("#tbgerProductos tbody").html("");

            d.detalleProductoProformas.forEach((item) => {
                $("#tbgerProductos tbody").append(
                    $("<tr>").append(
                        $("<td>").text(item.cpc),
                        $("<td>").text(item.dc),
                        $("<td>").text(item.cantidad),
                        $("<td>").text(item.precioGer),
                        $("<td>").text(item.totalUger)
                    )
                )
            })

        } else if (d.tipoProforma === "General") {

            $("#tbgerProductos tbody").html("");

            d.detalleProductoProformas.forEach((item) => {
                $("#tbgerProductos tbody").append(
                    $("<tr>").append(
                        $("<td>").text(item.cum),
                        $("<td>").text(item.dc),
                        $("<td>").text(item.cantidad),
                        $("<td>").text(item.precioGer),
                        $("<td>").text(item.totalUger)
                    )
                )
            })

        } else {

            swal.fire("error de codigo!", "Contacte a Freddy", "error")
        }

        $("#linkImprimirGER").attr("href", `/Proformar/MostrarPDFProformaGER?numeroProforma=${d.numeroProforma}`)
        $("#modalDataGERMEDIC").modal("show");
    }
})


//$("#tbproforma tbody").on("click", ".btn-info", function () {

//    let d = $(this).data("proforma")
//    console.log(d)

//    if (d.detalleTipoEmpresa === "GMC") {
//        $("#txtFechaRegistro").val(d.fechaRegistro)
//        $("#txtNumeroProforma").val(d.numeroProforma)
//        $("#txtUsuarioRegistro").val(d.usuario)
//        $("#txtTipoProforma").val(d.tipoProforma)
//        $("#txtCodigoInfima").val(d.codigoInfima)
//        $("#txtRazonSocial").val(d.razonSocial)
//        $("#txtRuc").val(d.rucRS)
//        $("#txtCanton").val(d.cantonRS)
//        $("#txtDireccion").val(d.direccionRS)
//        $("#txtGT").val(d.gtecnica)
//        $("#txtValidez").val(d.cvp)
//        $("#txtTentrega").val(d.tiempoEntregaGmc)
//        $("#txtFpago").val(d.fpago)
//        $("#txtObservacion").val(d.obervacion)
//        $("#txtSubTotal").val(d.subtotalGmc)
//        $("#txtIva").val(d.ivaTotalGMC)
//        $("#txtTotal").val(d.totalGmc)
        
        
//        if (d.tipoProforma === "Infima Cuantia") {

//            $("#tbProductos tbody").html("");

//            d.detalleProductoProformas.forEach((item) => {
//                $("#tbProductos tbody").append(
//                    $("<tr>").append(
//                        $("<td>").text(item.cpc),
//                        $("<td>").text(item.cantidad),
//                        $("<td>").text(item.medicamento),
//                        $("<td>").text(item.ff),
//                        $("<td>").text(item.concentracion),
//                        $("<td>").text(item.presentacion),
//                        $("<td>").text(item.precioGmc),
//                        $("<td>").text(item.totalUgmc)


//                    )
//                )
//            })
//        } else if (d.tipoProforma === "General") {

//            $("#tbProductos tbody").html("");

//            d.detalleProductoProformas.forEach((item) => {
//                $("#tbProductos tbody").append(
//                    $("<tr>").append(
//                        $("<td>").text(item.cum),
//                        $("<td>").text(item.cantidad),
//                        $("<td>").text(item.medicamento),
//                        $("<td>").text(item.ff),
//                        $("<td>").text(item.concentracion),
//                        $("<td>").text(item.presentacion),
//                        $("<td>").text(item.precioGmc),
//                        $("<td>").text(item.totalUgmc)


//                    )
//                )
//            })
//        } else {
//            swal.fire("error de codigo!", "Contacte a Freddy", "error")
//        }
        

//        $("#linkImprimirGMC").attr("href",`/Proformar/MostrarPDFProforma?numeroProforma=${d.numeroProforma}`)

//        $("#modalData").modal("show");
//    } else if (d.detalleTipoEmpresa === "IMSUMED") {
//        $("#txtFechaRegistroIMS").val(d.fechaRegistro)
//        $("#txtNumeroProformaIMS").val(d.numeroProforma)
//        $("#txtUsuarioRegistroIMS").val(d.usuario)
//        $("#txtTipoProformaIMS").val(d.tipoProforma)
//        $("#txtCodigoInfimaIMS").val(d.codigoInfima)
//        $("#txtRazonSocialIMS").val(d.razonSocial)
//        $("#txtRucIMS").val(d.rucRS)
//        $("#txtCantonIMS").val(d.cantonRS)
//        $("#txtDireccionIMS").val(d.direccionRS)
//        $("#txtGTIMS").val(d.gtecnica)
//        $("#txtValidezIMS").val(d.cvp)
//        $("#txtTentregaIMS").val(d.tiempoEntregaIms)
//        $("#txtFpagoIMS").val(d.fpago)
//        $("#txtObservacionIMS").val(d.obervacion)
//        $("#txtSubTotalIMS").val(d.subtotalIms)
//        $("#txtIvaIMS").val(d.ivaTotalIMS)
//        $("#txtTotalIMS").val(d.totalIms)
       
//        if (d.tipoProforma === "Infima Cuantia") {

//            $("#tbimsProductos tbody").html("");

//            d.detalleProductoProformas.forEach((item) => {
//                $("#tbimsProductos tbody").append(
//                    $("<tr>").append(
//                        $("<td>").text(item.cpc),
//                        $("<td>").text(item.cantidad),
//                        $("<td>").text(item.medicamento),
//                        $("<td>").text(item.fc),
//                        $("<td>").text(item.presentacion),
//                        $("<td>").text(item.precioIms),
//                        $("<td>").text(item.totalUims)


//                    )
//                )
//            })

//        } else if (d.tipoProforma === "General") {

//            $("#tbimsProductos tbody").html("");

//            d.detalleProductoProformas.forEach((item) => {
//                $("#tbimsProductos tbody").append(
//                    $("<tr>").append(
//                        $("<td>").text(item.cum),
//                        $("<td>").text(item.cantidad),
//                        $("<td>").text(item.medicamento),
//                        $("<td>").text(item.fc),
//                        $("<td>").text(item.presentacion),
//                        $("<td>").text(item.precioIms),
//                        $("<td>").text(item.totalUims)


//                    )
//                )
//            })

//        } else {

//            swal.fire("error de codigo!", "Contacte a Freddy", "error")
//        }

//        $("#linkImprimirIMS").attr("href", `/Proformar/MostrarPDFProformaIMS?numeroProforma=${d.numeroProforma}`)

//        $("#modalDataIMS").modal("show");
//    } else {
//        $("#txtFechaRegistroGER").val(d.fechaRegistro)
//        $("#txtNumeroProformaGER").val(d.numeroProforma)
//        $("#txtUsuarioRegistroGER").val(d.usuario)
//        $("#txtTipoProformaGER").val(d.tipoProforma)
//        $("#txtCodigoInfimaGER").val(d.codigoInfima)
//        $("#txtRazonSocialGER").val(d.razonSocial)
//        $("#txtRucGER").val(d.rucRS)
//        $("#txtCantonGER").val(d.cantonRS)
//        $("#txtDireccionGER").val(d.direccionRS)
//        $("#txtGTGER").val(d.gtecnica)
//        $("#txtValidezGER").val(d.cvp)
//        $("#txtTentregaGER").val(d.tiempoEntregaGer)
//        $("#txtFpagoGER").val(d.fpago)
//        $("#txtObservacionGER").val(d.obervacion)
//        $("#txtSubTotalGER").val(d.subtotalGer)
//        $("#txtIvaGER").val(d.ivaTotalGER)
//        $("#txtTotalGER").val(d.totalGer)
        
//        if (d.tipoProforma === "Infima Cuantia") {

//            $("#tbgerProductos tbody").html("");

//            d.detalleProductoProformas.forEach((item) => {
//                $("#tbgerProductos tbody").append(
//                    $("<tr>").append(
//                        $("<td>").text(item.cpc),
//                        $("<td>").text(item.dc),
//                        $("<td>").text(item.cantidad),
//                        $("<td>").text(item.precioGer),
//                        $("<td>").text(item.totalUger)
//                    )
//                )
//            })

//        } else if (d.tipoProforma === "General") {

//            $("#tbgerProductos tbody").html("");

//            d.detalleProductoProformas.forEach((item) => {
//                $("#tbgerProductos tbody").append(
//                    $("<tr>").append(
//                        $("<td>").text(item.cum),
//                        $("<td>").text(item.dc),
//                        $("<td>").text(item.cantidad),
//                        $("<td>").text(item.precioGer),
//                        $("<td>").text(item.totalUger)
//                    )
//                )
//            })

//        } else {

//            swal.fire("error de codigo!", "Contacte a Freddy", "error")
//        }

//        $("#linkImprimirGER").attr("href", `/Proformar/MostrarPDFProformaGER?numeroProforma=${d.numeroProforma}`)
//        $("#modalDataGERMEDIC").modal("show");
//    }
    
//})


