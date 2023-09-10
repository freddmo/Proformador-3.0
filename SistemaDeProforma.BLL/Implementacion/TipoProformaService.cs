using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.DAL.Interfaces;
using SistemaDeProforma.Entity;
namespace SistemaDeProforma.BLL.Implementacion
{
    public class TipoProformaService : ITipoProformaService
    {
        private readonly IGenericRepository<TipoProforma> _repositorio;

        public TipoProformaService(IGenericRepository<TipoProforma> repositorio)
        {
            _repositorio = repositorio;
        }
        public async Task<List<TipoProforma>> Lista()
        {
            IQueryable<TipoProforma> query = await _repositorio.Consultar();
            return query.ToList();
        }
    }
}
