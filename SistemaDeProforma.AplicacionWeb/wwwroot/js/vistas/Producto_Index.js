const MODELO_BASE = {
    idProducto: 0,
    medicamento: "",
    ff: "",
    concentracion: "",
    presentacion: "",
    dc: "",
    fc: "",
    iva: "",
    activo: 1,
    cpcvalor: "",
    cum: ""
}

let tablaData;

$(document).ready(function () {

    tablaData = $('#tbdata').DataTable({
        responsive: true,
        "ajax": {
            "url": '/Medicamentos/Lista',
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "idProducto", "visible": false, "searchable": false },
            { "data": "medicamento" },
            { "data": "ff" },
            { "data": "concentracion" },
            { "data": "presentacion" },
            { "data": "cpcvalor" },
            { "data": "cum" },
            { "data": "dc", "visible": false, "searchable": false },
            { "data": "fc", "visible": false, "searchable": false },
            { "data": "iva", "visible": false, "searchable": false },
            {
                "data": "activo", render: function (data) {
                    if (data == 1)
                        return '<span class="badge badge-info">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "80px"
            }
        ],
        order: [[0, "desc"]],
        dom: "Bfrtip",
        buttons: [
            {
                text: 'Exportar Excel',
                extend: 'excelHtml5',
                title: '',
                filename: 'Reporte Producto',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 9]
                }
            }, 'pageLength'
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        },
    });
})

function mostrarModal(modelo = MODELO_BASE) { //Funcion para rellenar la ventana para ingresar informacion
    $("#txtId").val(modelo.idProducto)
    $("#txtMedicamento").val(modelo.medicamento)
    $("#txtFF").val(modelo.ff)
    $("#txtConcentracion").val(modelo.concentracion)
    $("#txtPresentacion").val(modelo.presentacion)
    $("#txtDC").val(modelo.dc)
    $("#txtFC").val(modelo.fc)
    $("#txtIva").val(modelo.iva)
    $("#cboEstado").val(modelo.activo)
    $("#txtCpcvalor").val(modelo.cpcvalor)
    $("#txtCum").val(modelo.cum)


    $("#modalData").modal("show")
}

$("#btnNuevo").click(function () { //Boton para mostrar la ventana donde ingresar la informacion
    mostrarModal()
})

$("#btnGuardar").click(function () { //Boton para guardar la informacion del producto
    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    const modelo = structuredClone(MODELO_BASE);
    modelo["idProducto"] = parseInt($("#txtId").val())
    modelo["medicamento"] = $("#txtMedicamento").val()
    modelo["ff"] = $("#txtFF").val()
    modelo["concentracion"] = $("#txtConcentracion").val()
    modelo["presentacion"] = $("#txtPresentacion").val()
    modelo["dc"] = $("#txtMedicamento").val() + " " + $("#txtFF").val() + " " + $("#txtConcentracion").val() + " " + $("#txtPresentacion").val()
    modelo["fc"] = $("#txtFF").val() + " - " + $("#txtConcentracion").val()
    modelo["iva"] = $("#txtIva").val() 
    modelo["activo"] = $("#cboEstado").val()
    modelo["cpcvalor"] = $("#txtCpcvalor").val()
    modelo["cum"] = $("#txtCum").val()
    parseFloat()
    $("#modalData").find("div.modal-content").LoadingOverlay("show");

    if (modelo.idProducto == 0) {

        fetch("/Medicamentos/Crear", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(modelo)
        })
            .then(response => {
                $("#modalData").find("div.modal-content").LoadingOverlay("hide");
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then(responseJson => {

                if (responseJson.estado) {
                    tablaData.row.add(responseJson.objeto).draw(false)
                    $("#modalData").modal("hide")
                    swal("Listo!", "El producto fue creado", "success")
                } else {
                    swal("Lo sentimos", responseJson.mensaje, "error")
                }
            })
    }
    else {

        fetch("/Medicamentos/Editar", {
            method: "PUT",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(modelo)
        })
            .then(response => {
                $("#modalData").find("div.modal-content").LoadingOverlay("hide");
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then(responseJson => {

                if (responseJson.estado) {
                    tablaData.row(filaSeleccionada).data(responseJson.objeto).draw(false);
                    filaSeleccionada = null;
                    $("#modalData").modal("hide")
                    swal("Listo!", "El producto fue modificado", "success")
                } else {
                    swal("Lo sentimos", responseJson.mensaje, "error")
                }
            })

    }
})

let filaSeleccionada;
$("#tbdata tbody").on("click", ".btn-editar", function () { //Seccion para editar la fila de registros
    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const data = tablaData.row(filaSeleccionada).data();
    console.log(data)
    mostrarModal(data)
})

$("#tbdata tbody").on("click", ".btn-eliminar", function () { //Seccion para eliminar la fila de registros

    let fila;

    if ($(this).closest("tr").hasClass("child")) {
        fila = $(this).closest("tr").prev();
    } else {
        fila = $(this).closest("tr");
    }

    const data = tablaData.row(fila).data();

    swal({
        title: "Esta seguro?",
        text: `Eliminar el producto "${data.medicamento}"`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No, cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (respuesta) {

            if (respuesta) {
                $(".showSweetAlert").LoadingOverlay("show");

                fetch(`/Medicamentos/Eliminar?IdProducto=${data.idProducto}`, {
                    method: "DELETE"
                })
                    .then(response => {
                        $(".showSweetAlert").LoadingOverlay("hide");
                        return response.ok ? response.json() : Promise.reject(response);
                    })
                    .then(responseJson => {

                        if (responseJson.estado) {

                            tablaData.row(fila).remove().draw()

                            swal("Listo!", "El producto fue eliminado", "success")
                        } else {
                            swal("Lo sentimos", responseJson.mensaje, "error")
                        }
                    })

            }
        }

    )
})