using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.DAL.Interfaces;
using SistemaDeProforma.Entity;

namespace SistemaDeProforma.BLL.Implementacion
{
    public class RolService : IRolService
    {
        private readonly IGenericRepository<Rol> _repositorio;

        public RolService(IGenericRepository<Rol> repositorio)
        {
            _repositorio = repositorio;
        }
        public async Task<List<Rol>> Lista()
        {
            IQueryable<Rol> query = await _repositorio.Consultar();
            return query.ToList();
        }
    }
}
