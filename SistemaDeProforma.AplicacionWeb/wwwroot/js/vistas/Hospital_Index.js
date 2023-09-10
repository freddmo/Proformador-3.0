const MODELO_BASE = {
    idHospital:0,
    ruc: "",
    hospital1: "",
    direccion: "",
    canton: "",
    activo: 1
}

let tablaData;

$(document).ready(function () {

    

    tablaData = $('#tbdata').DataTable({
        responsive: true,
        "ajax": {
            "url": '/Hospitales/Lista',
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "idHospital", "visible": false, "searchable": false },
            { "data": "ruc" },
            { "data": "hospital1" },
            { "data": "direccion" },
            { "data": "canton" },
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
                filename: 'Reporte Hospitales',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5]
                }
            }, 'pageLength'
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        },
    });
})

function mostrarModal(modelo = MODELO_BASE) {
    $("#txtId").val(modelo.idHospital)
    $("#txtRuc").val(modelo.ruc)
    $("#txtHospital").val(modelo.hospital1)
    $("#txtDireccion").val(modelo.direccion)
    $("#txtCanton").val(modelo.canton)
    $("#cboEstado").val(modelo.activo)


    $("#modalData").modal("show")
}

$("#btnNuevo").click(function () {
    mostrarModal()
})

$("#btnGuardar").click(function () {


    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    const modelo = structuredClone(MODELO_BASE);
    modelo["idHospital"] = parseInt($("#txtId").val())
    modelo["ruc"] = $("#txtRuc").val()
    modelo["hospital1"] = $("#txtHospital").val()
    modelo["direccion"] = $("#txtDireccion").val()
    modelo["canton"] = $("#txtCanton").val()
    modelo["Activo"] = $("#cboEstado").val()


    $("#modalData").find("div.modal-content").LoadingOverlay("show");

    if (modelo.idHospital == 0) {

        fetch("/Hospitales/Crear", {
            method: "POST",
            headers: {"Content-Type":"application/json;charset=utf-8"},
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
                    swal("Listo!", "El hospital fue creado", "success")
                } else {
                    swal("Lo sentimos", responseJson.mensaje, "error")
                }
            })
    }
    else {

        fetch("/Hospitales/Editar", {
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
                    swal("Listo!", "El hospital fue modificado", "success")
                } else {
                    swal("Lo sentimos", responseJson.mensaje, "error")
                }
            })

    }
})

let filaSeleccionada;
$("#tbdata tbody").on("click", ".btn-editar", function () {
    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const data = tablaData.row(filaSeleccionada).data();
    console.log(data)
    mostrarModal(data)
})

$("#tbdata tbody").on("click", ".btn-eliminar", function () {

    let fila;

    if ($(this).closest("tr").hasClass("child")) {
        fila = $(this).closest("tr").prev();
    } else {
        fila = $(this).closest("tr");
    }

    const data = tablaData.row(fila).data();

    swal({
        title: "Esta seguro?",
        text: `Eliminar el hospital "${data.hospital1}"`,
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

                fetch(`/Hospitales/Eliminar?IdHospital=${data.idHospital}`, {
                    method: "DELETE"
                })
                    .then(response => {
                        $(".showSweetAlert").LoadingOverlay("hide");
                        return response.ok ? response.json() : Promise.reject(response);
                    })
                    .then(responseJson => {

                        if (responseJson.estado) {

                            tablaData.row(fila).remove().draw()

                            swal("Listo!", "El hospital fue eliminado", "success")
                        } else {
                            swal("Lo sentimos", responseJson.mensaje, "error")
                        }
                    })

            }
        }

    )
})