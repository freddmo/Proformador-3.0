
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

                $("#txtCanton2").val(ims.numeroDocumento)
                $("#txtRazonSocial2").val(ims.nombre)
                $("#txtCorreo2").val(ims.correo)
                $("#txtDireccion2").val(ims.direccion)
                $("#txTelefono2").val(ims.telefono)
                $("#txtRuc2").val(ims.ruc)
                $("#imgLogo2").attr("src", ims.urlLogo)
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

                $("#txtCanton3").val(ger.numeroDocumento)
                $("#txtRazonSocial3").val(ger.nombre)
                $("#txtCorreo3").val(ger.correo)
                $("#txtDireccion3").val(ger.direccion)
                $("#txTelefono3").val(ger.telefono)
                $("#txtRuc3").val(ger.ruc)
                $("#imgLogo3").attr("src", ger.urlLogo)
            } else {
                swal("Lo sentimos", responseJson.mensaje, "error")
            }
        })
})


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