

using SistemaDeProforma.Entity;

namespace SistemaDeProforma.BLL.Interfaces
{
    public interface INegocioService
    {
        Task<Negocio> Obtener();

        Task<Negocio> Conseguir();
        Task<Negocio> Adquirir();

        Task<Negocio> GuardarCambios(Negocio entidad, Stream Logo = null, string NombreLogo = "");

        Task<Negocio> GCIMS(Negocio alma, Stream Logo = null, string NombreLogo = "");
        Task<Negocio> GCGER(Negocio ente, Stream Logo = null, string NombreLogo = "");
    }
}
