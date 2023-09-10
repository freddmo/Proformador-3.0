

using SistemaDeProforma.Entity;

namespace SistemaDeProforma.BLL.Interfaces
{
    public interface ITipoProformaService
    {
        Task<List<TipoProforma>> Lista();
    }
}
