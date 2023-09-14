
$(document).ready(function () {

    $(".card-body").LoadingOverlay("show");

    fetch("/Empresas/Obtener") //Fecth para tener informacion de la empresa GMC
        .then(response => {
            $(".card-body").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {

            console.log(responseJson)

            if (responseJson.estado) {
                const d = responseJson.objeto

                $("#txtCanton").val(d.numeroDocumento)
                $("#txtRazonSocial").val(d.nombre)
                $("#txtCorreo").val(d.correo)
                $("#txtDireccion").val(d.direccion)
                $("#txTelefono").val(d.telefono)
                $("#txtRuc").val(d.ruc)
                $("#imgLogo").attr("src",d.urlLogo)
            } else {
                swal("Lo sentimos", responseJson.mensaje, "error")
            }
        })

    fetch("/Empresas/Conseguir")  //Fecth para tener informacion de la empresa IMSUMED
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {

            console.log(responseJson)

            if (responseJson.estado) {
                const ims = responseJson.objeto

                $("#txtCantonIMS").val(ims.numeroDocumento)
                $("#txtRazonSocialIMS").val(ims.nombre)
                $("#txtCorreoIMS").val(ims.correo)
                $("#txtDireccionIMS").val(ims.direccion)
                $("#txTelefonoIMS").val(ims.telefono)
                $("#txtRucIMS").val(ims.ruc)
                $("#imgLogoIMS").attr("src", ims.urlLogo)
            } else {
                swal("Lo sentimos", responseJson.mensaje, "error")
            }
        })

    fetch("/Empresas/Adquirir")  //Fecth para tener informacion de la empresa GERMEDIC
        .then(response => {

            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {

            console.log(responseJson)

            if (responseJson.estado) {
                const ger = responseJson.objeto

                $("#txtCantonGER").val(ger.numeroDocumento)
                $("#txtRazonSocialGER").val(ger.nombre)
                $("#txtCorreoGER").val(ger.correo)
                $("#txtDireccionGER").val(ger.direccion)
                $("#txTelefonoGER").val(ger.telefono)
                $("#txtRucGER").val(ger.ruc)
                $("#imgLogoGER").attr("src", ger.urlLogo)
            } else {
                swal("Lo sentimos", responseJson.mensaje, "error")
            }
        })

    limitInputLength('txtCantonIMS', 50);
    limitInputLength('txTelefonoIMS', 50);
    limitInputLength('txtDireccionIMS', 150);
    limitInputLength('txtCorreoIMS', 50);
    limitInputLength('txtRazonSocialIMS', 50);

    limitInputLength('txtCanton', 50);
    limitInputLength('txTelefono', 50);
    limitInputLength('txtDireccion', 150);
    limitInputLength('txtCorreo', 50);
    limitInputLength('txtRazonSocial', 50);

    limitInputLength('txtCantonGER', 50);
    limitInputLength('txTelefonoGER', 50);
    limitInputLength('txtDireccionGER', 150);
    limitInputLength('txtCorreoGER', 50);
    limitInputLength('txtRazonSocialGER', 50);
})

function limitInputLength(inputId, maxLength) {
    $('#' + inputId).on('input', function () {
        if ($(this).val().length > maxLength) {
            $(this).val($(this).val().substring(0, maxLength));
            toastr.warning("Pasaste el límite de caracteres", "");
        }
    });
}

$("#btnGuardarCambios").click(function () {

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }
   
    const modelo = {
        numeroDocumento: $("#txtCanton").val(),
        nombre: $("#txtRazonSocial").val(),
        correo: $("#txtCorreo").val(),
        direccion: $("#txtDireccion").val(),
        telefono: $("#txTelefono").val(),
        ruc: $("#txtRuc").val()
    }

    const inputLogo = document.getElementById("txtLogo")

    const formData = new FormData()

    formData.append("logo", inputLogo.files[0])
    formData.append("modelo", JSON.stringify(modelo))

    $("#gmccard").LoadingOverlay("show");

    fetch("/Empresas/GuardarCambios", {
        method: "POST",
        body:formData
    })
        .then(response => {
            $("#gmccard").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {

            if (responseJson.estado) {
                const d = responseJson.objeto

                $("#imgLogo").attr("src",d.urlLogo)
                swal("Listo!", "Empresa Modificada", "success")
            } else {
                swal("Lo sentimos", responseJson.mensaje, "error")
            }
        })
})

$("#btnGuardarCambiosIMS").click(function () {
    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    const pauta = {
        numeroDocumento: $("#txtCantonIMS").val(),
        nombre: $("#txtRazonSocialIMS").val(),
        correo: $("#txtCorreoIMS").val(),
        direccion: $("#txtDireccionIMS").val(),
        telefono: $("#txTelefonoIMS").val(),
        ruc: $("#txtRucIMS").val()
    }

    const inputLogo2 = document.getElementById("txtLogoIMS")

    const formData2 = new FormData()

    formData2.append("logo", inputLogo2.files[0])
    formData2.append("pauta", JSON.stringify(pauta))

    $("#imscard").LoadingOverlay("show");

    fetch("/Empresas/GCIMS", {
        method: "POST",
        body: formData2
    })
        .then(response => {
            $("#imscard").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {

            if (responseJson.estado) {
                const ims = responseJson.objeto

                $("#imgLogoIMS").attr("src", ims.urlLogo)
                swal("Listo!", "Empresa Modificada", "success")
            } else {
                swal("Lo sentimos", responseJson.mensaje, "error")
            }
        })
})

$("#btnGuardarCambiosGER").click(function () {
    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    const patron = {
        numeroDocumento: $("#txtCantonGER").val(),
        nombre: $("#txtRazonSocialGER").val(),
        correo: $("#txtCorreoGER").val(),
        direccion: $("#txtDireccionGER").val(),
        telefono: $("#txTelefonoGER").val(),
        ruc: $("#txtRucGER").val()
    }

    const inputLogo3 = document.getElementById("txtLogoGER")

    const formData3 = new FormData()

    formData3.append("logo", inputLogo3.files[0])
    formData3.append("patron", JSON.stringify(patron))

    $("#gercard").LoadingOverlay("show");

    fetch("/Empresas/GCGER", {
        method: "POST",
        body: formData3
    })
        .then(response => {
            $("#gercard").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {

            if (responseJson.estado) {
                const ger = responseJson.objeto

                $("#imgLogoGER").attr("src", ger.urlLogo)
                swal("Listo!", "Empresa Modificada", "success")
            } else {
                swal("Lo sentimos", responseJson.mensaje, "error")
            }
        })
})