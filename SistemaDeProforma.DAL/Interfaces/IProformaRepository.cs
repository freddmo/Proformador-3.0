

using SistemaDeProforma.Entity;

namespace SistemaDeProforma.DAL.Interfaces
{
    public interface IProformaRepository:IGenericRepository<Proforma>
    {
        Task<Proforma> Registrar(Proforma entidad);
        Task<List<DetalleProductoProforma>> Reporte(DateTime FechaInicio, DateTime FechaFin);
    }
}
