﻿

namespace SistemaDeProforma.BLL.Interfaces
{
    public interface IUtilidadesService
    {
        string GenerarClave();

        string ConvertirSha256(string texto);

    }
}
