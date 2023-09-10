

using SistemaDeProforma.Entity;
namespace SistemaDeProforma.BLL.Interfaces
{
    public interface IProformaService
    {
        Task<List<Producto>> ObtenerProductos(string busqueda);
        Task<List<Hospital>> ObtenerHospital(string pesquisa);
        Task<Proforma> Registrar(Proforma entidad);

        Task<List<Proforma>> Historial(string numeroProforma, string nic, string empresa, string fechaInicio, string fechaFin);
        Task<Proforma> DetalleGMC(string numeroProforma, string empresa);
        Task<Proforma> DetalleIMS(string numeroProforma, string empresa);
        Task<Proforma> DetalleGER(string numeroProforma, string empresa);
        Task<List<DetalleProductoProforma>> Reporte(string fechaInicio, string fechaFin);
    }
}
